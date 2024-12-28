import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../Context/AdminContext';
import { contactServices } from '../../services/contactusServices';

const ContactUs = () => {
    const { adminData, storeAdminData } = useAdmin();
    const [contacts, setContacts] = useState(adminData?.contactUs);
    const [showResponded, setShowResponded] = useState('all');
    const [selectedContact, setSelectedContact] = useState(null);
    const [response, setResponse] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    const handleSubmitResponse = async () => {
        if (!selectedContact || !response.trim()) return;

        try {
            const res = await contactServices.updateResponse(selectedContact._id, response);
            console.log(res)
            storeAdminData(res)
            setContacts(res?.contactUs);
            setSelectedContact(null);
            setResponse('');
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await contactServices.deleteContact(id);
            console.log(res)
            storeAdminData(res)
            setContacts(res?.contactUs);
            setDeleteConfirmation(null);
        } catch (error) {
            console.log(error)
        }
    };

    const filteredContacts = contacts?.filter(c => {
        if (showResponded === 'all') return true;
        return showResponded === 'responded' ? c.response : !c.response;
    });

    const selectClasses = "bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const buttonClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200";

    return (
        <div className="py-8 px-4 md:px-8">
            <div className="mx-auto bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-xl p-6 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-700 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Contact Messages
                        </h2>
                        <p className="text-gray-400 mt-1">Manage and respond to incoming messages</p>
                    </div>
                    <select
                        className={selectClasses}
                        value={showResponded}
                        onChange={(e) => setShowResponded(e.target.value)}
                    >
                        <option value="all">All Messages</option>
                        <option value="responded">Responded</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>

                <div className="grid gap-4">
                    {filteredContacts?.map((contact) => (
                        <div
                            key={contact._id}
                            className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all hover:bg-gray-800/60"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                            {contact.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{contact.name}</h3>
                                            <p className="text-sm text-gray-400">{contact.email}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
                                        <p className="text-gray-200">{contact.message}</p>
                                    </div>
                                    {contact.response && (
                                        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                                            <p className="text-blue-300">
                                                <span className="font-semibold">Response:</span> {contact.response}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col h-full">
                                    <button
                                        onClick={() => setDeleteConfirmation(contact)}
                                        className={`${buttonClasses} h-12 my-2 bg-red-600 hover:bg-red-700 text-white`}
                                    >
                                        Delete
                                    </button>
                                    {!contact.response && (
                                        <button
                                            onClick={() => setSelectedContact(contact)}
                                            className={`${buttonClasses} h-12 my-2 bg-blue-600 hover:bg-blue-700 text-white`}
                                        >
                                            Respond
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Response Modal */}
            {selectedContact && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full border border-gray-700 shadow-2xl">
                        <h3 className="text-xl font-bold mb-2 text-white">Respond to {selectedContact.name}</h3>
                        <p className="text-gray-400 mb-4 text-sm">{selectedContact.email}</p>

                        <div className="mb-4 p-4 bg-gray-900/50 rounded-lg">
                            <p className="text-gray-300">{selectedContact.message}</p>
                        </div>

                        <textarea
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 mb-4 h-32 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            placeholder="Type your response..."
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setSelectedContact(null);
                                    setResponse('');
                                }}
                                className={`${buttonClasses} border border-gray-600 text-gray-300 hover:bg-gray-700`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitResponse}
                                className={`${buttonClasses} bg-blue-600 hover:bg-blue-700 text-white`}
                            >
                                Send Response
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmation && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-white">Confirm Delete</h3>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete the message from {deleteConfirmation.name}? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setDeleteConfirmation(null)}
                                className={`${buttonClasses} border border-gray-600 text-gray-300 hover:bg-gray-700`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirmation._id)}
                                className={`${buttonClasses} bg-red-600 hover:bg-red-700 text-white`}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUs;