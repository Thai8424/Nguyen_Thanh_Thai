import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    defaultValue: new Date(),
  },
  avatar: {
    type: DataTypes.STRING(512),
    defaultValue: `${process.env.BACKEND_URL}/images/default.png`,
  },
});

export default User;