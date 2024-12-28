import React, { useState } from 'react';
import { useAdmin } from '../../Context/AdminContext';
import { userServices } from '../../services/userServices ';
import { toast } from 'react-toastify';

const ProfileManagement = () => {
    const { adminData, storeAdminData } = useAdmin();
    const [userData, setUserData] = useState(adminData?.user);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const updates = Object.fromEntries(formData.entries());
            updates.roles = updates.roles.split(',').map(role => role.trim());

            const respond = await userServices.updateUser(updates);
            storeAdminData(respond);
            setUserData(respond?.user);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords don't match!");
            return;
        }

        try {
            await userServices.updatePassword(passwordData.oldPassword, passwordData.newPassword);
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setIsChangingPassword(false);
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    if (!userData) return <div className="text-center p-4 text-white">Loading...</div>;

    const inputClasses = "w-full bg-white/5 border border-white/20 rounded-2xl p-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors";
    const buttonClasses = "group relative px-6 py-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-black hover:bg-white transition-colors duration-200";

    return (
        <div className="pt-10 px-4 md:px-8">
            <div className="mx-auto bg-black/40 backdrop-blur-md rounded-3xl p-6 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Admin Management Dashboard</h1>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={buttonClasses}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                        <button
                            onClick={() => setIsChangingPassword(!isChangingPassword)}
                            className={buttonClasses}
                        >
                            Change Password
                        </button>
                    </div>
                </div>

                {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={userData.name}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Username</label>
                                <input
                                    type="text"
                                    defaultValue={userData.username}
                                    className={`${inputClasses} opacity-50`}
                                    disabled
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Description 1</label>
                                <textarea
                                    name="description1"
                                    defaultValue={userData.description1}
                                    className={inputClasses}
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Description 2</label>
                                <textarea
                                    name="description2"
                                    defaultValue={userData.description2}
                                    className={inputClasses}
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">My Journey</label>
                                <textarea
                                    name="description3Myjourney"
                                    defaultValue={userData.description3Myjourney}
                                    className={inputClasses}
                                    rows="4"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Roles (comma-separated)</label>
                                <input
                                    type="text"
                                    name="roles"
                                    defaultValue={userData.roles.join(', ')}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">GitHub Link</label>
                                <input
                                    type="url"
                                    name="githubLink"
                                    defaultValue={userData.githubLink}
                                    className={inputClasses}
                                    pattern="https://github.com/.*"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">LinkedIn Link</label>
                                <input
                                    type="url"
                                    name="linkedinLink"
                                    defaultValue={userData.linkedinLink}
                                    className={inputClasses}
                                    pattern="https://www.linkedin.com/.*"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={userData.email}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumaber"
                                    defaultValue={userData.phoneNumaber}
                                    className={inputClasses}
                                    pattern="\d{10}"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Resume Link</label>
                                <input
                                    type="url"
                                    name="resume"
                                    defaultValue={userData.resume}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" className={`${buttonClasses} w-full sm:w-auto`}>
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-white/60">Name</h3>
                                <p className="text-lg">{userData.name}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-white/60">Username</h3>
                                <p className="text-lg">{userData.username}</p>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-semibold text-white/60">Description 1</h3>
                            <p className="text-lg">{userData.description1}</p>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-semibold text-white/60">Description 2</h3>
                            <p className="text-lg">{userData.description2}</p>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-semibold text-white/60">My Journey</h3>
                            <p className="text-lg">{userData.description3Myjourney}</p>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-semibold text-white/60">Roles</h3>
                            <p className="text-lg">{userData.roles.join(', ')}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-white/60">GitHub</h3>
                                <a href={userData.githubLink} target="_blank" rel="noopener noreferrer"
                                    className="text-lg text-blue-400 hover:underline break-all">{userData.githubLink}</a>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-white/60">LinkedIn</h3>
                                <a href={userData.linkedinLink} target="_blank" rel="noopener noreferrer"
                                    className="text-lg text-blue-400 hover:underline break-all">{userData.linkedinLink}</a>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-white/60">Email</h3>
                                <p className="text-lg">{userData.email}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-white/60">Phone</h3>
                                <p className="text-lg">{userData.phoneNumaber}</p>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-semibold text-white/60">Resume</h3>
                            <a href={userData.resume} target="_blank" rel="noopener noreferrer"
                                className="text-lg text-blue-400 hover:underline break-all">View Resume</a>
                        </div>
                    </div>
                )}

                {/* Password Change Modal */}
                {isChangingPassword && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-black/80 backdrop-blur-md rounded-3xl p-6 max-w-lg w-full border border-white/10">
                            <h2 className="text-xl font-bold mb-6">Change Password</h2>
                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.oldPassword}
                                        onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                                        className={inputClasses}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                        className={inputClasses}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        className={inputClasses}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsChangingPassword(false)}
                                        className={buttonClasses}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={buttonClasses}
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileManagement;