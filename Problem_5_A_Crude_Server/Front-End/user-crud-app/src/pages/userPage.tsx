import { useState } from 'react';
import UserList from '../components/userList';
import UserForm from '../components/userForm';
import Modal from '../components/userModal';

import bgImg from '../assets/bg.jpg';

const UserPage = () => {
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleEdit = (userId: number | null) => {
    setEditingUserId(userId);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setEditingUserId(null);
    setIsModalVisible(true);
  };

  const handleSuccess = () => {
    setEditingUserId(null);
    setIsModalVisible(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="container mx-auto p-4 flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">User Management</h1>
        <button onClick={handleCreate} className="bg-green-600 hover:bg-green-800 duration-300 text-white px-4 py-2 rounded">
          Create
        </button>
      </div>
      <UserList key={refreshKey} onEdit={handleEdit} />
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <UserForm userId={editingUserId} onSuccess={handleSuccess} />
      </Modal>
    </div>
  );
};

export default UserPage;