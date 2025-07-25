import { Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true, // e.g., "Pipe Repair"
    },
    category: {
      type: String,
      required: true, // e.g., "Leak Detection", "Drain Cleaning"
    },
    description: {
      type: String,
    },
    service_area: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
    },
    estimated_duration_minutes: {
      type: Number, // e.g., 30, 60, 90 minutes
    },
    service_cost: {
      type: Number, // Flat fee or estimate
      required: true,
    },
    tools_required: [
      {
        type: String, // e.g., "Pipe Wrench", "Leak Detector"
      },
    ],
    technician_info: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    images: [
      {
        type: String, // Optional service photos
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Service = models.Service || model('Service', ServiceSchema);

export default Service;
