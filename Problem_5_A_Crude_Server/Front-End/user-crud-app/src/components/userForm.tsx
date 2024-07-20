import React, { useState, useEffect, useRef } from 'react';
import userAPI from '../api/userAPI';

type UserFormProps = {
  userId: number | null;
  onSuccess: () => void;
};

const UserForm = ({ userId, onSuccess }: UserFormProps) => {
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    birthDate: '',
    avatar: '',
  });

  const defaultImgUrl = 'http://localhost:8080/images/default.png';
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userId !== null) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (id: number) => {
    try {
      const data = await userAPI.getUserById(id);
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setUser({ ...user, avatar: url });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('phone', user.phone);
    formData.append('birthDate', user.birthDate);

    if (file) {
      formData.append('avatar', file);
    } else {
      const defaultImageResponse = await fetch(defaultImgUrl);
      const blob = await defaultImageResponse.blob();
      const defaultImageFile = new File([blob], 'default.png', { type: blob.type });
      formData.append('avatar', defaultImageFile);
    }

    try {
      if (userId !== null) {
        await userAPI.updateUser(userId, formData);
      } else {
        await userAPI.createUser(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{userId !== null ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          {/* Avatar image */}
          <div className="basis-1/4" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
            <img
              src={user.avatar || defaultImgUrl}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
          {/* User details */}
          <div className="basis-3/4">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="date"
          name="birthDate"
          value={user.birthDate}
          onChange={handleChange}
          placeholder="Birth Date"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          {userId !== null ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;