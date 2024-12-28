const { uploadOnCloudinary, deleteOnCloudinary } = require("../../utils/cloudinary");
const Project = require("../models/project")
const Experience = require("../models/experience")
const Skill = require("../models/skills");
const emptyTempFolder = require("../../utils/emptyTempFolder");

exports.addData = async (req, res) => {
    try {
        const { type } = req.params; // type can be 'project', 'experience', or 'skill'
        console.log(type)

        if (type === "project") {
            const { title, description, liveLink, gitLink } = req.body;
            const file = req.file;
            if (!file) return res.status(400).json({nessage: "No image provided."});

            const uploadResponse = await uploadOnCloudinary(file.path);
            if (!uploadResponse) return res.status(500).json({message: "Image upload failed."});

            const newProject = new Project({
                title,
                description,
                image: {
                    url: uploadResponse.url,
                    public_id: uploadResponse.public_id,
                },
                liveLink,
                gitLink,
            });

            await newProject.save();
            return res.status(201).json({newProject});
        } else if (type === "experience") {
            const { time, role, company, description } = req.body;

            const newExperience = new Experience({
                time,
                role,
                company,
                description,
            });

            await newExperience.save();
            return res.status(201).json({newExperience});
        } else if (type === "skill") {
            const { name } = req.body;
            const file = req.file;
            if (!file) return res.status(400).json({message: "No icon provided."});

            const uploadResponse = await uploadOnCloudinary(file.path);
            if (!uploadResponse) return res.status(500).json({message: "Icon upload failed."});

            const newSkill = new Skill({
                name,
                icon: {
                    url: uploadResponse.url,
                    public_id: uploadResponse.public_id,
                },
            });

            await newSkill.save();
            return res.status(201).json({newSkill});
        } else {
            return res.status(400).json({message: "Invalid type."});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error."});
    } finally{
        emptyTempFolder()
    }
};

exports.updateData = async (req, res) => {
    try {
        const { type, id } = req.params;

        if (type === "project") {
            const { title, description, liveLink, gitLink } = req.body;
            const file = req.file;
            const project = await Project.findById(id);

            if (!project) return res.status(404).json({message: "Project not found."});

            if (file) {
                await deleteOnCloudinary(project.image.public_id);
                const uploadResponse = await uploadOnCloudinary(file.path);
                if (!uploadResponse) return res.status(500).json({message: "Image upload failed."});
                project.image = {
                    url: uploadResponse.url,
                    public_id: uploadResponse.public_id,
                };
            }

            project.title = title || project.title;
            project.description = description || project.description;
            project.liveLink = liveLink || project.liveLink;
            project.gitLink = gitLink || project.gitLink;

            await project.save();
            return res.status(200).json({project});
        } else if (type === "experience") {
            const { time, role, company, description } = req.body;
            const experience = await Experience.findByIdAndUpdate(id, {
                time,
                role,
                company,
                description,
            }, { new: true });

            if (!experience) return res.status(404).json({message: "Experience not found."});

            return res.status(200).json({experience});
        } else if (type === "skill") {
            const { name } = req.body;
            const file = req.file;
            const skill = await Skill.findById(id);

            if (!skill) return res.status(404).json({message: "Skill not found."});

            if (file) {
                await deleteOnCloudinary(skill.icon.public_id);
                const uploadResponse = await uploadOnCloudinary(file.path);
                if (!uploadResponse) return res.status(500).json({message: "Icon upload failed."});
                skill.icon = {
                    url: uploadResponse.url,
                    public_id: uploadResponse.public_id,
                };
            }

            skill.name = name || skill.name;

            await skill.save();
            return res.status(200).json({skill});
        } else {
            return res.status(400).json({message: "Invalid type."});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({json: "Server error."});
    }finally{
        emptyTempFolder()
    }
};

exports.deleteData = async (req, res) => {
    try {
        const { type, id } = req.params;

        if (type === "project") {
            const project = await Project.findByIdAndDelete(id);
            if (!project) return res.status(404).json({message: "Project not found."});

            await deleteOnCloudinary(project.image.public_id);
            return res.status(200).json({message: "Project deleted successfully."});
        } else if (type === "experience") {
            const experience = await Experience.findByIdAndDelete(id);
            if (!experience) return res.status(404).json({message: "Experience not found."});

            return res.status(200).json({message: "Experience deleted successfully."});
        } else if (type === "skill") {
            const skill = await Skill.findByIdAndDelete(id);
            if (!skill) return res.status(404).json({message: "Skill not found."});

            await deleteOnCloudinary(skill.icon.public_id);
            return res.status(200).json({message: "Skill deleted successfully."});
        } else {
            return res.status(400).json({message: "Invalid type."});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error."});
    }finally{
        emptyTempFolder()
    }
};
