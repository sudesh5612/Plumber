import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    image: {
      type: String, // Profile image (optional)
    },
    role: {
      type: String,
      enum: ['customer', 'plumber', 'admin'],
      default: 'customer',
    },
    phone: {
      type: String, // Optional for bookings or contact
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service', // Changed from 'Property' to 'Service'
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;
