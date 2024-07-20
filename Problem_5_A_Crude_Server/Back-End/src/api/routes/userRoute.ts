import { Router } from 'express';
import UserServices from '../../services/user';
import { uploadImage, deleteImage } from '../../services/image';
import fileUpload from 'express-fileupload';
import path from 'path';

const userRouter = Router();

userRouter.get('/', async (_req, res) => {
  try {
    const user = await UserServices.getUsers();
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

userRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await UserServices.getUserById(id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

userRouter.delete('/:id/delete', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const currentUser = await UserServices.getUserById(id);

    const user = await UserServices.deleteUser(id);

    const oldFileName = path.basename(currentUser.avatar);
    deleteImage(oldFileName);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

userRouter.put('/:id/update', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const { email, firstName, lastName, phone, birthDate } = req.body;
    const file = req.files?.avatar as fileUpload.UploadedFile | undefined;
    const currentUser = await UserServices.getUserById(id);

    let avatarUrl: string | undefined;
    if (file) {
      // Upload the new avatar
      avatarUrl = await uploadImage(file, id);

      // Delete the old avatar if it exists
      if (currentUser?.avatar) {
        const oldFileName = path.basename(currentUser.avatar);
        deleteImage(oldFileName);
      }
    }

    const updatedUser = await UserServices.updateUserById(id, {
      email,
      firstName,
      lastName,
      phone,
      birthDate,
      avatar: avatarUrl,
    });

    if (updatedUser) {
      return res.json(updatedUser);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating user:', error.message);
      return res.status(500).json({ error: 'Internal server error', message: error.message });
    } else {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
});

userRouter.post('/create', async (req, res) => {
  try {
    const { email, firstName, lastName, phone, birthDate } = req.body;
    const file = req.files?.avatar as fileUpload.UploadedFile | undefined;

    // Set the default avatar URL initially
    let avatarUrl = 'http://localhost:8080/images/default.png';

    // Create the new user with the default avatar URL
    const newUser = await UserServices.createUser({
      email,
      firstName,
      lastName,
      phone,
      birthDate,
      avatar: avatarUrl,
    });

    // If a file is uploaded, handle the image upload and update the user record
    if (file) {
      console.log('Uploading new avatar for user ID:', newUser.id);
      avatarUrl = await uploadImage(file, newUser.id);

      // Update the user record with the new avatar URL
      await UserServices.updateUserById(newUser.id, { avatar: avatarUrl });
    }

    if (newUser) {
      return res.json(newUser);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating user:', error.message);
      return res.status(500).json({ error: 'Internal server error', message: error.message });
    } else {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default userRouter;