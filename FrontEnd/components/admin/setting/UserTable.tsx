"use client";

import { User } from "@/types/admin/setting/usermanage";
import { useState } from "react";
import { updateUserRole, toggleUserBlock } from "@/utils/Admin/setting/fetchuser";

export default function UserTable({ users }: { users: User[] }) {
    const [userList, setUserList] = useState<User[]>(users);

    const validRoles = ["admin", "customer"] as const;
    type Role = typeof validRoles[number];

    const handleRoleChange = async (id: string, role: string) => {
        const newRole: Role = validRoles.includes(role as Role) ? (role as Role) : "customer";
        await updateUserRole(id, newRole);

        setUserList((prev) =>
            prev.map((user) =>
                user._id === id ? { ...user, role: newRole } : user
            )
        );
    };

    const handleBlockToggle = async (id: string, isBlocked: boolean) => {
        await toggleUserBlock(id, !isBlocked);
        setUserList((prev) =>
            prev.map((user) =>
                user._id === id ? { ...user, isBlocked: !isBlocked } : user
            )
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Change Role</th>
                        <th>Block</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user) => (
                        <tr
                            key={user._id}
                            className={`border-t ${user.isBlocked ? "bg-red-50 text-red-500" : "bg-white"
                                }`}
                        >
                            <td className="px-4 py-2">{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                            <td>
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="customer">Customer</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleBlockToggle(user._id, user.isBlocked || false)
                                    }
                                    className={`px-3 py-1 rounded ${user.isBlocked
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                        }`}
                                >
                                    {user.isBlocked ? "Unblock" : "Block"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
