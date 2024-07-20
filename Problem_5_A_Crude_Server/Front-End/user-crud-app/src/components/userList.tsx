import { useEffect, useState } from 'react';
import userAPI from '../api/userAPI';

type UserListProps = {
  onEdit: (userId: number | null) => void;
};

const UserList = ({ onEdit }: UserListProps) => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const users = await userAPI.getUsers();
    setUsers(users);
  };

  const handleDelete = async (id: number) => {
    await userAPI.deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="container mx-auto p-4 w-2/5 shadow-xl overflow-y-auto custom-scrollbar">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <ul className="space-y-2 item-center max-h-80">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center border-b py-2">
            <span className="flex items-center">
              <img
                src={user.avatar}
                alt={`${user.firstName}'s avatar`}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="flex-1">
                {user.firstName} {user.lastName} - {user.email}
              </span>
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(user.id)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-800 duration-300 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-800 duration-300 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;