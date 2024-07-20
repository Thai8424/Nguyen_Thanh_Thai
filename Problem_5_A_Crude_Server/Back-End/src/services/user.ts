import User from '../models/user';

// // Function to create a user
const createUser = async ( data: any): Promise<any | null> => {
  // Update the user information in the database
  const newUser = await User.create(data);

  return newUser;
};

// Function to get all users
const getUsers = async (): Promise<any[]> => {
  return await User.findAll();
};

// Function to get a user by ID
const getUserById = async (id: number): Promise<any | null> => {
  try {
    const user = await User.findByPk(id);
    return user ? user.toJSON() : null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// Function to update a user by ID
const updateUserById = async (id: number, data: any): Promise<any | null> => {
  // Update the user information in the database
  await User.update(data, {
    where: { id },
  });

  // Fetch and return the updated user
  const updatedUser = await getUserById(id);

  return updatedUser;
};

// Function to delete a user by ID
const deleteUser = async (id: number): Promise<any> => {
  await User.destroy({
    where: { id },
  });

  const listUsers = await getUsers();
  return listUsers;
};

const UserServices = {
  getUsers,
  getUserById,
  updateUserById,
  deleteUser,
  createUser,
};

export default UserServices;