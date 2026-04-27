"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadCloud, Loader2, X } from "lucide-react";

export default function CreateCarPage() {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ================= TOAST =================
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "Sedan",
    price: "",
    year: "",
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "",
    status: "Available",
    description: "",
    images: [],
  });

  /* ================= INPUT ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      const raw = value.replace(/,/g, "");
      if (!raw) return setForm({ ...form, price: "" });

      setForm({
        ...form,
        price: Number(raw).toLocaleString(),
      });

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const isFormValid =
    form.name &&
    form.brand &&
    form.price &&
    form.year &&
    form.images.length > 0;

  /* ================= IMAGE UPLOAD ================= */

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...data.urls],
      }));

      showToast("Images uploaded successfully");
    } catch (err) {
      console.error(err);
      showToast("Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  /* ================= THUMBNAIL ================= */

  const setThumbnail = (img) => {
    setForm((prev) => {
      const rest = prev.images.filter((i) => i.public_id !== img.public_id);

      return {
        ...prev,
        images: [img, ...rest],
      };
    });
  };

  /* ================= DELETE IMAGE ================= */

  const deleteImage = (img) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((i) => i.public_id !== img.public_id),
    }));

    showToast("Image removed");
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      showToast("Please fill all required fields", "error");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/admin/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price.replace(/,/g, "")),
          year: Number(form.year),
          mileage: Number(form.mileage || 0),
        }),
      });

      if (!res.ok) throw new Error("Failed");

      showToast("🚗 Car created successfully!");

      setTimeout(() => {
        router.push("/admin/cars");
      }, 1200);
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to create car", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 relative">
      {/* ================= TOAST UI ================= */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Add New Car</h1>

        <form onSubmit={handleSubmit} className="space-y-8 text-slate-600">
          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              placeholder="Car Name *"
              value={form.name}
              onChange={handleChange}
              className="input"
            />

            <input
              name="brand"
              placeholder="Brand *"
              value={form.brand}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* DETAILS */}
          <div className="grid md:grid-cols-3 gap-6">
            <input
              name="price"
              placeholder="Price *"
              value={form.price}
              onChange={handleChange}
              className="input"
            />

            <input
              name="year"
              placeholder="Year *"
              value={form.year}
              onChange={handleChange}
              className="input"
            />

            <input
              name="mileage"
              placeholder="Mileage"
              value={form.mileage}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* SELECT FIELDS */}
          <div className="grid md:grid-cols-3 gap-6">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input"
            >
              <option>Sedan</option>
              <option>SUV</option>
              <option>Pickup</option>
              <option>Hatchback</option>
              <option>Van</option>
            </select>

            <select
              name="fuelType"
              value={form.fuelType}
              onChange={handleChange}
              className="input"
            >
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>Electric</option>
            </select>

            <select
              name="transmission"
              value={form.transmission}
              onChange={handleChange}
              className="input"
            >
              <option>Automatic</option>
              <option>Manual</option>
            </select>
          </div>

          {/* STATUS */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input"
          >
            <option>Available</option>
            <option>Sold</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Car description..."
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="input"
          />

          {/* IMAGE UPLOAD */}
          <div className="border-2 border-dashed rounded-xl p-8 text-center">
            <label className="cursor-pointer flex flex-col items-center gap-2">
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloud size={40} />
                  Upload Images
                </>
              )}

              <input
                type="file"
                multiple
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* IMAGE PREVIEW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {form.images.map((img, index) => {
              const isThumbnail = index === 0;

              return (
                <div
                  key={img.public_id}
                  onClick={() => setThumbnail(img)}
                  className={`relative cursor-pointer rounded-xl overflow-hidden ${
                    isThumbnail ? "ring-4 ring-blue-500" : "hover:ring-2"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt="car"
                    width={300}
                    height={200}
                    className="object-cover w-full h-32"
                  />

                  {isThumbnail && (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Thumbnail
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteImage(img);
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!isFormValid || saving}
            className={`w-full py-3 rounded-xl font-semibold ${
              !isFormValid
                ? "bg-gray-300"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {saving ? "Creating..." : "Create Car"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }

        .input:focus {
          outline: none;
          border-color: #ef4444;
        }
      `}</style>
    </main>
  );
}
