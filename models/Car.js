import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    // SEO slug generated in API route
    slug: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    category: {
      type: String,
      enum: ["Sedan", "SUV", "Hatchback", "Truck", "Van"],
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
      index: true,
    },

    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true,
    },

    mileage: {
      type: Number,
    },

    images: {
      type: [imageSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: "At least one image is required",
      },
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Available", "Sold", "Reserved"],
      default: "Available",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// 🔎 TEXT SEARCH
CarSchema.index({ name: "text", brand: "text" });

// 🚀 SORTING INDEXES
CarSchema.index({ price: 1 });
CarSchema.index({ year: -1 });
CarSchema.index({ createdAt: -1 });

export default mongoose.models.Car || mongoose.model("Car", CarSchema);
