import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUser, FaShieldAlt } from 'react-icons/fa';

// Mock data and initial state
const INITIAL_ROLES = [
    {
        id: 'admin',
        name: 'Administrator',
        permissions: ['user:read', 'user:write', 'user:delete', 'role:read', 'role:write', 'role:delete']
    },
    {
        id: 'editor',
        name: 'Editor',
        permissions: ['user:read', 'user:write']
    },
    {
        id: 'viewer',
        name: 'Viewer',
        permissions: ['user:read']
    }
];

const INITIAL_USERS = [
    {
        id: '1',
        username: 'john_doe',
        email: 'john@example.com',
        role: 'admin',
        status: 'active'
    },
    {
        id: '2',
        username: 'jane_smith',
        email: 'jane@example.com',
        role: 'editor',
        status: 'active'
    }
];

const RBACDashboard2 = () => {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [roles, setRoles] = useState(INITIAL_ROLES);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);

    // User Management Methods
    const handleAddUser = (newUser) => {
        setUsers([...users, { ...newUser, id: String(users.length + 1) }]);
        setIsUserModalOpen(false);
    };

    const handleEditUser = (updatedUser) => {
        setUsers(users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        ));
        setIsUserModalOpen(false);
    };

    const handleDeleteUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    // Role Management Methods
    const handleAddRole = (newRole) => {
        setRoles([...roles, { ...newRole, id: newRole.name.toLowerCase() }]);
        setIsRoleModalOpen(false);
    };

    const handleEditRole = (updatedRole) => {
        setRoles(roles.map(role =>
            role.id === updatedRole.id ? updatedRole : role
        ));
        setIsRoleModalOpen(false);
    };

    const handleDeleteRole = (roleId) => {
        setRoles(roles.filter(role => role.id !== roleId));
    };

    // Modal Component
    const Modal = ({ isOpen, onClose, title, children }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        );
    };

    // User Management Card
    const UserManagementCard = () => (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                    <FaUser className="mr-2" /> User Management
                </h2>
                <button
                    onClick={() => setIsUserModalOpen(true)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
                >
                    <FaPlus className="mr-1" /> Add User
                </button>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border p-2">{user.username}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2">{user.status}</td>
                            <td className="border p-2">
                                <div className="flex space-x-2 justify-center">
                                    <button
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setIsUserModalOpen(true);
                                        }}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* User Modal */}
            <Modal
                isOpen={isUserModalOpen}
                onClose={() => {
                    setIsUserModalOpen(false);
                    setSelectedUser(null);
                }}
                title={selectedUser ? "Edit User" : "Add User"}
            >
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        defaultValue={selectedUser?.username || ''}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        defaultValue={selectedUser?.email || ''}
                        className="w-full border p-2 rounded"
                    />
                    <select
                        className="w-full border p-2 rounded"
                        defaultValue={selectedUser?.role || ''}
                    >
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsUserModalOpen(false)}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            {selectedUser ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );

    // Role Management Card
    const RoleManagementCard = () => (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                    <FaShieldAlt className="mr-2" /> Role Management
                </h2>
                <button
                    onClick={() => setIsRoleModalOpen(true)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
                >
                    <FaPlus className="mr-1" /> Add Role
                </button>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Role Name</th>
                        <th className="border p-2">Permissions</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role.id} className="hover:bg-gray-50">
                            <td className="border p-2">{role.name}</td>
                            <td className="border p-2">{role.permissions.join(', ')}</td>
                            <td className="border p-2">
                                <div className="flex space-x-2 justify-center">
                                    <button
                                        onClick={() => {
                                            setSelectedRole(role);
                                            setIsRoleModalOpen(true);
                                        }}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteRole(role.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Role Modal */}
            <Modal
                isOpen={isRoleModalOpen}
                onClose={() => {
                    setIsRoleModalOpen(false);
                    setSelectedRole(null);
                }}
                title={selectedRole ? "Edit Role" : "Add Role"}
            >
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Role Name"
                        defaultValue={selectedRole?.name || ''}
                        className="w-full border p-2 rounded"
                    />
                    <div>
                        <label className="block mb-2">Permissions:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['user:read', 'user:write', 'user:delete', 'role:read', 'role:write', 'role:delete'].map(perm => (
                                <label key={perm} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked={selectedRole?.permissions.includes(perm)}
                                    />
                                    <span className="ml-2">{perm}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsRoleModalOpen(false)}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            {selectedRole ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );

    return (
        <div className="container mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Role-Based Access Control Dashboard</h1>
            <div className="grid grid-cols-1 gap-4">
                <UserManagementCard />
                <RoleManagementCard />
            </div>
        </div>
    );
};

export default RBACDashboard2;