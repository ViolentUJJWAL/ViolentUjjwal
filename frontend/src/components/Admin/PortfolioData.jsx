import React, { useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Github, X } from 'lucide-react';
import { useAdmin } from '../../Context/AdminContext';
import { dataService } from '../../services/dataServices';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <p className="text-white/80 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const PortfolioData = () => {
  const { adminData, storeAdminData } = useAdmin();
  const [data, setData] = useState({
    project: adminData?.project,
    experience: adminData?.experience,
    skill: adminData?.skill
  });
  const [editItem, setEditItem] = useState(null);
  const [editType, setEditType] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addType, setAddType] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    type: null,
    id: null,
    title: '',
    message: ''
  });

  const handleDelete = async () => {
    try {
      const response = await dataService.delete(deleteConfirm.type, deleteConfirm.id);
      storeAdminData(response)
      setData({
        project: response?.project,
        experience: response?.experience,
        skill: response?.skill
      })
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setDeleteConfirm({ show: false, type: null, id: null, title: '', message: '' });
    }
  };

  const handleSubmit = async (e, isNew = false) => {
    e.preventDefault();
    const formData = new FormData();
    const type = isNew ? addType : editType;

    // Get all form fields
    const formElements = e.target.elements;
    
    // Add non-file fields to FormData
    for (let element of formElements) {
      if (element.type !== 'file' && element.name) {
        formData.append(element.name, element.value);
      }
    }

    // Handle file upload
    const fileInput = e.target.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0]) {
      formData.append('file', fileInput.files[0]); // Always use 'file' as the field name
    }

    try {
      let response;
      if (isNew) {
        response = await dataService.add(type, formData);
      } else {
        response = await dataService.update(type, editItem._id, formData);
      }
      
      storeAdminData(response);
      setData({
        project: response?.project,
        experience: response?.experience,
        skill: response?.skill
      });
      setEditItem(null);
      setEditType(null);
      setIsAdding(false);
      setAddType(null);
    } catch (error) {
      console.error('Error saving item:', error);
    }
};

  const showDeleteConfirm = (type, id, itemName) => {
    setDeleteConfirm({
      show: true,
      type,
      id,
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete ${itemName}? This action cannot be undone.`
    });
  };

  const FormFields = ({ type, item = null }) => {
    const baseInputClass = "w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30";

    const fields = {
      project: (
        <>
          <input type="text" name="title" defaultValue={item?.title}
            className={baseInputClass} placeholder="Title" required />
          <textarea name="description" defaultValue={item?.description}
            className={`${baseInputClass} mt-4 h-32`} placeholder="Description" required />
          <input type="text" name="liveLink" defaultValue={item?.liveLink}
            className={`${baseInputClass} mt-4`} placeholder="Live Link" />
          <input type="text" name="gitLink" defaultValue={item?.gitLink}
            className={`${baseInputClass} mt-4`} placeholder="Git Link" />
          <input type="file" name="file" accept="image/*" className="mt-4 text-white" required={!item} />
        </>
      ),
      skill: (
        <>
          <input type="text" name="name" defaultValue={item?.name}
            className={baseInputClass} placeholder="Skill Name" required />
          <input type="file" name="file" accept="image/*" className="mt-4 text-white" required={!item} />
        </>
      ),
      experience: (
        <>
          <input type="text" name="time" defaultValue={item?.time}
            className={baseInputClass} placeholder="Time Period" required />
          <input type="text" name="role" defaultValue={item?.role}
            className={`${baseInputClass} mt-4`} placeholder="Role" required />
          <input type="text" name="company" defaultValue={item?.company}
            className={`${baseInputClass} mt-4`} placeholder="Company" required />
          <textarea name="description" defaultValue={item?.description}
            className={`${baseInputClass} mt-4 h-32`} placeholder="Description" required />
        </>
      )
    };

    return fields[type];
  };

  const Modal = ({ isAdd = false }) => {
    const type = isAdd ? addType : editType;
    const item = isAdd ? null : editItem;

    if (!type) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 max-w-lg w-full border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              {isAdd ? `Add New ${type.slice(0, -1)}` : `Edit ${type.slice(0, -1)}`}
            </h3>
            <button
              onClick={() => {
                if (isAdd) {
                  setIsAdding(false);
                  setAddType(null);
                } else {
                  setEditItem(null);
                  setEditType(null);
                }
              }}
              className="text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={(e) => handleSubmit(e, isAdd)}>
            <FormFields type={type} item={item} />
            <div className="flex justify-end gap-4 mt-6">
              <button type="button" onClick={() => {
                if (isAdd) {
                  setIsAdding(false);
                  setAddType(null);
                } else {
                  setEditItem(null);
                  setEditType(null);
                }
              }} className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200">
                Cancel
              </button>
              <button type="submit"
                className="px-6 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition-colors duration-200">
                {isAdd ? 'Create' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const AddButton = ({ type }) => (
    <button
      onClick={() => {
        setIsAdding(true);
        setAddType(type);
      }}
      className="group relative px-6 py-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-black transition-colors duration-200"
    >
      <span className="relative z-10 flex items-center">
        <Plus size={20} className="mr-2" />
        Add {type?.slice(0, -1)}
      </span>
      <div className="absolute inset-0 scale-0 rounded-full transition-transform duration-200 bg-gradient-to-b from-gray-200 to-gray-300 group-hover:scale-100 -z-10" />
    </button>
  );

  const SectionWrapper = ({ title, children, type }) => (
    <section className="mb-12 bg-black/20 backdrop-blur-md rounded-3xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{title}</h2>
        <AddButton type={type} />
      </div>
      {children}
    </section>
  );

  return (
    <div className="pt-8 px-4">
      <div className="container mx-auto">
        <SectionWrapper title="project" type="project">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.project?.map(project => (
              <div key={project._id} className="group relative bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                <img src={project.image.url} alt={project.title} className="w-full h-48 object-cover rounded-2xl mb-4" />
                <h3 className="font-bold text-lg text-white mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <div className="space-x-4">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center text-white hover:text-gray-200">
                      <ExternalLink size={16} className="mr-1" />
                      Live
                    </a>
                    <a href={project.gitLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center text-white hover:text-gray-200">
                      <Github size={16} className="mr-1" />
                      Code
                    </a>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => {
                      setEditItem(project);
                      setEditType('project');
                    }} className="p-2 text-white hover:text-gray-200">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => showDeleteConfirm('project', project._id, project.title)}
                      className="p-2 text-white hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper title="Experience" type="experience">
          <div className="space-y-4">
            {data?.experience?.map(experience => (
              <div key={experience._id} className="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">{experience.role}</h3>
                    <p className="text-white/70">{experience.company}</p>
                    <p className="text-sm text-white/50">{experience.time}</p>
                    <p className="mt-2 text-white/80">{experience.description}</p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => {
                      setEditItem(experience);
                      setEditType('experience');
                    }} className="p-2 text-white hover:text-gray-200">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => showDeleteConfirm('experience', experience._id, experience.role)}
                      className="p-2 text-white hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper title="skill" type="skill">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data?.skill?.map(skill => (
              <div key={skill._id} className="bg-black/40 backdrop-blur-md rounded-3xl p-4 border border-white/10 flex flex-col items-center">
                <img src={skill.icon.url} alt={skill.name} className="w-12 h-12 object-contain mb-2" />
                <p className="font-medium text-center text-white">{skill.name}</p>
                <div className="mt-2 space-x-2">
                  <button onClick={() => {
                    setEditItem(skill);
                    setEditType('skill');
                  }} className="p-2 text-white hover:text-gray-200">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => showDeleteConfirm('skill', skill._id, skill.name)}
                    className="p-2 text-white hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Custom Confirm Dialog */}
        <ConfirmDialog
          isOpen={deleteConfirm.show}
          onClose={() => setDeleteConfirm({ show: false, type: null, id: null, title: '', message: '' })}
          onConfirm={handleDelete}
          title={deleteConfirm.title}
          message={deleteConfirm.message}
        />

        {/* Add/Edit Modals */}
        {isAdding && <Modal isAdd={true} />}
        {editItem && <Modal isAdd={false} />}
      </div>
    </div>
  );
};

export default PortfolioData