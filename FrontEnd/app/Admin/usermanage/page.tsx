import { fetchUsers } from "@/utils/Admin/setting/fetchuser";
import UserTable from "@/components/admin/setting/UserTable";

export default async function UserManagementPage() {
  const users = await fetchUsers();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Management & Roles</h1>
      <UserTable users={users} />
    </div>
  );
}
