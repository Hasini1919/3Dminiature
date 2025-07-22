import {User} from "@/types/admin/setting/usermanage"

export async function fetchUsers(): Promise<User[]> {
    const res = await fetch("http://localhost:5500/api/users", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  }
  
  export async function updateUserRole(id: string, role: string) {
    const res = await fetch(`http://localhost:5500/api/users/${id}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    return res.json();
  }
  
  export async function toggleUserBlock(id: string, block: boolean) {
    const res = await fetch(`http://localhost:5500/api/users/${id}/block`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ block }),
    });
    return res.json();
  }
  