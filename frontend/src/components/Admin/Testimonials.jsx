import React, { useState } from 'react';
import { useAdmin } from '../../Context/AdminContext';
import { deleteTestimonial, verifyTestimonial } from '../../services/testimonialsServices';

const Testimonials = () => {
    const { adminData, storeAdminData } = useAdmin();
    const [testimonials, setTestimonials] = useState(adminData?.testimonials);
    const [showVerified, setShowVerified] = useState('all');
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    const handleVerify = async (id) => {
        try {
            const res = await verifyTestimonial(id);
            console.log(res)
            storeAdminData(res)
            setTestimonials(res?.testimonials);
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteTestimonial(id);
            console.log(res)
            storeAdminData(res)
            setTestimonials(res?.testimonials);
            setDeleteConfirmation(null);
        } catch (error) {
            console.log(error)
        }
    };

    const filteredTestimonials = testimonials?.filter(t => {
        if (showVerified === 'all') return true;
        return showVerified === 'verified' ? t.verify : !t.verify;
    });

    const selectClasses = "bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const buttonClasses = "h-12 my-2 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200";

    return (
        <div className="pt-8 px-4 md:px-8 bg-gray-900">
            <div className="mx-auto bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-xl p-6 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-700 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Testimonials
                        </h2>
                        <p className="text-gray-400 mt-1">Manage client reviews and feedback</p>
                    </div>
                    <select
                        className={selectClasses}
                        value={showVerified}
                        onChange={(e) => setShowVerified(e.target.value)}
                    >
                        <option value="all">All Testimonials</option>
                        <option value="verified">Verified</option>
                        <option value="unverified">Unverified</option>
                    </select>
                </div>

                <div className="grid gap-4">
                    {filteredTestimonials?.map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className={`bg-gray-800/40 backdrop-blur-sm border rounded-xl p-6 transition-all hover:bg-gray-800/60 ${
                                testimonial.verify ? 'border-green-700/30' : 'border-gray-700'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-lg font-semibold">
                                            {testimonial.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <span className="font-medium">{testimonial.roles}</span>
                                                <span>•</span>
                                                <span>{testimonial.company}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-4 top-0 text-4xl text-gray-600 opacity-50">&quot;</div>
                                        <p className="pl-4 text-gray-300 italic leading-relaxed">
                                            {testimonial.review}
                                        </p>
                                        <div className="absolute -bottom-4 right-0 text-4xl text-gray-600 opacity-50">&quot;</div>
                                    </div>
                                    {testimonial.verify && (
                                        <div className="mt-4 flex items-center gap-2 text-green-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm font-medium">Verified Review</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col h-full">
                                    <button
                                        onClick={() => setDeleteConfirmation(testimonial)}
                                        className={`${buttonClasses} bg-red-600 hover:bg-red-700 text-white`}
                                    >
                                        Delete
                                    </button>
                                    {!testimonial.verify && (
                                        <button
                                            onClick={() => handleVerify(testimonial._id)}
                                            className={`${buttonClasses} bg-blue-600 hover:bg-blue-700`}
                                        >
                                            Verify Testimonial
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTestimonials?.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No testimonials found</p>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirmation && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-white">Confirm Delete</h3>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete the testimonial from {deleteConfirmation.name}? This action cannot be undone.
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

export default Testimonials;