import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import fileUpload from 'express-fileupload';

import userRouter from './api/routes/userRoute';
import { sendFile } from './services/image';

const app = express();

// Enable CORS
app.use(cors());

// Use express-fileupload middleware to handle file uploads
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use('/api/users', userRouter);

app.get('/images/:filename(*)', sendFile);

app.use('/', (req, res) => {
  res.send('UserApp API');
});

const PORT = process.env.DB_PORT || 8080;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });