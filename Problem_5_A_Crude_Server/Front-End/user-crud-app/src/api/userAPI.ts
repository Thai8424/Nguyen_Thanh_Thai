import instance from '../api/axios';

const getUsers = async () => {
  const response = await instance.get(`users`);
  return response.data;
};

const getUserById = async (id: any) => {
  const response = await instance.get(`/users/${id}`);
  return response.data;
};

const createUser = async (data: FormData) => {
  data.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  const response = await instance.post(`/users/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const updateUser = async (id: number, data: FormData) => {
  const response = await instance.put(`/users/${id}/update`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const deleteUser = async (id: any) => {
  const response = await instance.delete(`/users/${id}/delete`);
  return response.data;
};

const userAPI = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userAPI;