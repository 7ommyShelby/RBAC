import React, { useRef, useState } from "react";
import {
    FaUsers,
    FaShieldAlt,
    FaUserPlus,
    FaLock,
    FaUnlock,
    FaEdit,
    FaTrashAlt,
    FaSave,
    FaTimes,
} from "react-icons/fa";

const initialRoles = [
    {
        id: 1,
        name: "Admin",
        permissions: ["read:users", "write:users", "delete:users", "manage:roles"],
    },
    { id: 2, name: "Manager", permissions: ["read:users", "write:users"] },
    { id: 3, name: "Viewer", permissions: ["read:users"] },
];

const initialUsers = [
    { id: 1, username: "tommyShelby", email: "tom@ggmail.com", roleId: 1, active: true },
    { id: 2, username: "arthurShelby", email: "arthur@gmail.com", roleId: 2, active: true },
];

const permissionsList = [
    "read:users",
    "write:users",
    "delete:users",
    "manage:roles",
    "create:projects",
    "edit:projects",
    "delete:projects",
];


const RBACDashboard = () => {

    const [roles, setRoles] = useState(initialRoles);
    const [users, setUsers] = useState(initialUsers);
    const [activeTab, setActiveTab] = useState("roles");
    const [editingRole, setEditingRole] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState(null);

    // console.log(editingRole, "Editrole", editingUser);
    // console.log(roles);

    // const userInputRefs = useRef({ username: "", email: "", roleId: "" });

    const userInputRefs = useRef(null);

    const handleUserEdit = (user) => {
        setEditingUser({ ...user });
        userInputRefs.current = { ...user };
    };

    console.log(users);
    console.log(editingUser, "edituser");

    const handleRoleEdit = (role) => setEditingRole({ ...role });

    const saveRole = () => {
        if (editingRole) {
            setRoles(roles.map((e) => (e.id === editingRole.id ? editingRole : e)));
            setEditingRole(null);
        }
    };

    // const handleUserEdit = (user) => setEditingUser({ ...user });

    const saveUser = () => {
        if (editingUser) {
            // setUsers(users.map((e) => (e.id === editingUser.id ? editingUser : e)));
            setUsers((prev) => {
                return (
                    prev.map((e) => {
                        return e.id === editingUser.id ? { ...editingUser, ...userInputRefs.current } : e
                    })
                )
            })
            setEditingUser(null);
        }
    };

    const handleAddNewUser = () => {
        setNewUser({ username: "", email: "", roleId: "", active: true });
    };
    console.log(newUser);

    const saveNewUser = () => {
        if (newUser) {
            setUsers([
                ...users,
                { ...newUser, id: users.length + 1, roleId: parseInt(newUser.roleId) },
            ]);
            setNewUser(null);
        }
    };

    const togglePermission = (permission) => {

        // console.log(permission);

        if (editingRole) {
            const updatedPermissions = editingRole.permissions.includes(permission)
                ? editingRole.permissions.filter((e) => e !== permission)
                : [...editingRole.permissions, permission];

            console.log(updatedPermissions, "updatedPer");

            setEditingRole({ ...editingRole, permissions: updatedPermissions });
        }
    };

    const RoleManagement = () => (
        <div className="space-y-4">
            {roles.map((role) => (
                <div
                    key={role.id}
                    className="bg-white p-4 shadow rounded border border-gray-200"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{role.name}</h3>
                        <button
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
                            onClick={() => handleRoleEdit(role)}
                        >
                            <FaEdit className="text-gray-600" />
                        </button>
                    </div>

                    <div className="mt-2 grid grid-cols-3 gap-2">
                        {role.permissions.map((perm, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                            >
                                {perm}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const UserManagement = () => (
        <div className="space-y-4">
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
                    onClick={handleAddNewUser}
                >
                    <FaUserPlus className="mr-2" /> Add New User
                </button>
            </div>
            {users.map((user) => (
                <div
                    key={user.id}
                    className="bg-white p-4 shadow rounded border border-gray-200"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{user.username}</h3>
                        <button
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
                            onClick={() => handleUserEdit(user)}
                        >
                            <FaEdit className="text-gray-600" />
                        </button>
                    </div>
                    <div className="mt-2">
                        <p>Email: {user.email}</p>
                        <p>Role: {roles.find((e) => e.id === user.roleId)?.name}</p>
                        <div className="flex items-center space-x-2 mt-2">
                            <FaLock className="text-gray-500" />
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={user.active}
                                    readOnly
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600"></div>
                            </label>
                            <FaUnlock className="text-gray-500" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const AddUserModal = () => (
        newUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                    <h3 className="text-lg font-bold mb-4">Add New User</h3>
                    <input
                        className="w-full mb-4 p-2 border rounded"
                        placeholder="Username"
                        defaultValue={newUser.username}
                        onChange={(e) => (newUser.username = e.target.value)}
                    />
                    <input
                        className="w-full mb-4 p-2 border rounded"
                        placeholder="Email"
                        defaultValue={newUser.email}
                        onChange={(e) => (newUser.email = e.target.value)}
                    />
                    <select
                        className="w-full mb-4 p-2 border rounded"
                        defaultValue={newUser.roleId}
                        onChange={(e) => (newUser.roleId = e.target.value)}
                    >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setNewUser(null)}
                        >
                            <FaTimes /> Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={saveNewUser}
                        >
                            <FaSave /> Save
                        </button>
                    </div>
                </div>
            </div>
        )
    );

    const EditUserModal = () => {


        return (
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${editingUser ? '' : 'hidden'
                    }`}
            >
                <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
                    <h2 className="text-xl font-bold mb-4">
                        Edit User: {editingUser?.username}
                    </h2>
                    <input
                        type="text"
                        defaultValue={editingUser?.username}
                        // onChange={(e) =>
                        //     setEditingUser((prev) => ({
                        //         ...prev,
                        //         username: e.target.value,
                        //     }))
                        // }
                        onChange={(e) => (userInputRefs.current.username = e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        defaultValue={editingUser?.email || ''}
                        // onChange={(e) =>
                        //     // setEditingUser({ ...editingUser, email: e.target.value });
                        //     setEditingUser((prev) => ({
                        //         ...prev,
                        //         email: e.target.value,
                        //     }))
                        // }
                        onChange={(e) => (userInputRefs.current.email = e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Email"
                    />
                    <select
                        defaultValue={editingUser?.roleId || ''}
                        // onChange={(e) =>
                        //     // setEditingUser({ ...editingUser, roleId: parseInt(e.target.value) })
                        //     setEditingUser((prev) => ({
                        //         ...prev,
                        //         roleId: parseInt(e.target.value),
                        //     }))
                        // }
                        onChange={(e) => (userInputRefs.current.roleId = parseInt(e.target.value))}
                        className="w-full p-2 border rounded mb-4"
                    >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="text-slate-100 border px-2 py-1 rounded-md bg-amber-600 hover:text-red-700"
                            onClick={() => setEditingUser(null)}
                        >
                            <FaTimes /> Cancel
                        </button>
                        <button className="text-green-500 border px-2 py-1 rounded-md bg-yellow-500 hover:text-green-700" onClick={saveUser}>
                            <FaSave /> Save
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const EditRoleModal = () => (
        editingRole && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                    <h3 className="text-lg font-bold mb-4">Edit Role: {editingRole.name}</h3>
                    {/* <input
                        className="w-full mb-4 p-2 border rounded"
                        value={editingRole.name}
                        onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                    /> */}
                    <div className="grid grid-cols-2 gap-2">
                        {permissionsList.map((permission) => (
                            <label key={permission} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={editingRole.permissions.includes(permission)}
                                    onChange={() => togglePermission(permission)}
                                />
                                <span>{permission}</span>
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setEditingRole(null)}
                        >
                            <FaTimes /> Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={saveRole}
                        >
                            <FaSave /> Save
                        </button>
                    </div>
                </div>
            </div>
        )
    );

    return (

        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold flex items-center mb-6">
                <FaShieldAlt className="mr-3" /> Role-Based Access Control
            </h1>
            <div className="flex space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded ${activeTab === "roles" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setActiveTab("roles")}
                >
                    <FaUsers className="inline mr-2" /> Roles
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setActiveTab("users")}
                >
                    <FaUserPlus className="inline mr-2" /> Users
                </button>
            </div>

            {activeTab === "roles" ? <RoleManagement /> : <UserManagement />}
            <EditRoleModal />
            <EditUserModal />
            <AddUserModal />
        </div>

    );
};

export default RBACDashboard;
