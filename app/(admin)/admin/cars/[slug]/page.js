"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";

function Toast({ message, type }) {
  return (
    <div
      className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg z-50 ${
        type === "success"
          ? "bg-green-200 text-green-900"
          : "bg-red-200 text-red-900"
      }`}
    >
      {message}
    </div>
  );
}

export default function EditCarPage({ params }) {
  const router = useRouter();
  const { slug } = use(params);

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // ── Image picker state ──
  const [availableImages, setAvailableImages] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ================= FETCH CAR ================= */
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/admin/cars/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch car");
        const data = await res.json();
        if (!data?.data) throw new Error("Car data not found");
        setForm(data.data);
      } catch (err) {
        console.error(err);
        showToast("Failed to load car", "error");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCar();
  }, [slug]);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= IMAGE PICKER ================= */
  const openPicker = async () => {
    setLoadingImages(true);
    setShowPicker(true);
    try {
      const res = await fetch("/api/upload");
      const data = await res.json();
      setAvailableImages(data.images || []);
    } catch (err) {
      showToast("Failed to load images", "error");
      setShowPicker(false);
    } finally {
      setLoadingImages(false);
    }
  };

  const toggleImageSelection = (imgPath) => {
    setForm((prev) => {
      const already = prev.images?.includes(imgPath);
      return {
        ...prev,
        images: already
          ? prev.images.filter((i) => i !== imgPath)
          : [...(prev.images || []), imgPath],
      };
    });
  };

  /* ================= THUMBNAIL ================= */
  const setThumbnail = (img) => {
    setForm((prev) => {
      if (!prev?.images) return prev;
      return {
        ...prev,
        images: [img, ...prev.images.filter((i) => i !== img)],
      };
    });
  };

  /* ================= REMOVE IMAGE ================= */
  // Removes the path from this car's record only.
  // To remove the file itself, delete it from the repo and push.
  const handleDeleteImage = (img) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((i) => i !== img),
    }));
    showToast("Image removed from car");
  };

  /* ================= UPDATE ================= */
  const updateCar = async () => {
    if (!form) return;

    if (!form.name?.trim()) return showToast("Car name is required", "error");
    if (!form.brand?.trim()) return showToast("Brand is required", "error");
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      return showToast("Enter a valid price", "error");
    if (!form.year || isNaN(Number(form.year)))
      return showToast("Enter a valid year", "error");
    if (
      form.mileage &&
      (isNaN(Number(form.mileage)) || Number(form.mileage) < 0)
    )
      return showToast("Enter a valid mileage", "error");
    if (!form.images || form.images.length === 0)
      return showToast("At least one image is required", "error");

    setSaving(true);

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        year: Number(form.year),
        mileage: Number(form.mileage),
      };

      const res = await fetch(`/api/admin/cars/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");

      showToast("Car updated successfully");
      setTimeout(() => router.push("/admin/cars"), 1200);
    } catch (err) {
      console.error(err);
      showToast(err.message || "Update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 w-1/3 rounded" />
        <div className="h-40 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Edit Car</h1>

      {/* NAME + BRAND */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          className="input"
          placeholder="Car Name"
        />
        <input
          name="brand"
          value={form.brand || ""}
          onChange={handleChange}
          className="input"
          placeholder="Brand"
        />
      </div>

      {/* PRICE YEAR MILEAGE */}
      <div className="grid md:grid-cols-3 gap-4">
        <input
          name="price"
          value={form.price || ""}
          onChange={handleChange}
          className="input"
          placeholder="Price"
        />
        <input
          name="year"
          value={form.year || ""}
          onChange={handleChange}
          className="input"
          placeholder="Year"
        />
        <input
          name="mileage"
          value={form.mileage || ""}
          onChange={handleChange}
          className="input"
          placeholder="Mileage"
        />
      </div>

      {/* SELECTS */}
      <div className="grid md:grid-cols-2 gap-4">
        <select
          name="fuelType"
          value={form.fuelType || "Petrol"}
          onChange={handleChange}
          className="input"
        >
          <option>Petrol</option>
          <option>Diesel</option>
          <option>Electric</option>
          <option>Hybrid</option>
        </select>
        <select
          name="transmission"
          value={form.transmission || "Manual"}
          onChange={handleChange}
          className="input"
        >
          <option>Manual</option>
          <option>Automatic</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <select
          name="category"
          value={form.category || "Sedan"}
          onChange={handleChange}
          className="input"
        >
          <option>Sedan</option>
          <option>SUV</option>
          <option>Pick-up</option>
          <option>Hatchback</option>
          <option>Van</option>
          <option>Crossover</option>
          <option>Off-roader</option>
          <option>Coupe</option>
        </select>
        <select
          name="status"
          value={form.status || "Available"}
          onChange={handleChange}
          className="input"
        >
          <option>Available</option>
          <option>Reserved</option>
          <option>Sold</option>
        </select>
      </div>

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={form.description || ""}
        onChange={handleChange}
        className="input min-h-[120px]"
        placeholder="Description"
      />

      {/* IMAGE PICKER TRIGGER */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
        <button
          type="button"
          onClick={openPicker}
          className="flex flex-col items-center gap-3 w-full cursor-pointer"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
            +
          </div>
          <div className="text-gray-700 font-medium">
            Click to pick images from assets
          </div>
          <div className="text-gray-400 text-sm">
            Images must be in{" "}
            <code className="bg-gray-100 px-1 rounded">
              public/assets/cars/
            </code>{" "}
            — push via Git first
          </div>
        </button>
      </div>

      {/* IMAGE PICKER MODAL */}
      {showPicker && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Pick Images from Assets
              </h2>
              <button
                type="button"
                onClick={() => setShowPicker(false)}
                className="text-gray-500 hover:text-gray-800 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto p-4 grid grid-cols-3 gap-3">
              {loadingImages ? (
                <div className="col-span-3 flex justify-center py-10">
                  <Loader2 className="animate-spin text-gray-400" size={32} />
                </div>
              ) : availableImages.length === 0 ? (
                <p className="col-span-3 text-center text-gray-500 py-8">
                  No images found in{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    /public/assets/cars/
                  </code>
                  .
                  <br />
                  Push images to GitHub first.
                </p>
              ) : (
                availableImages.map((imgPath) => {
                  const selected = form.images?.includes(imgPath);
                  return (
                    <div
                      key={imgPath}
                      onClick={() => toggleImageSelection(imgPath)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
                        selected
                          ? "border-blue-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={imgPath}
                        width={200}
                        height={120}
                        alt={imgPath}
                        className="object-cover w-full h-28"
                      />
                      {selected && (
                        <span className="absolute top-1 right-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                          ✓
                        </span>
                      )}
                      <p className="text-xs text-gray-500 truncate px-1 py-1">
                        {imgPath.split("/").pop()}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 border-t flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {form.images?.length || 0} image
                {form.images?.length !== 1 ? "s" : ""} selected
              </p>
              <button
                type="button"
                onClick={() => setShowPicker(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SELECTED IMAGES PREVIEW */}
      <div className="grid grid-cols-3 gap-3">
        {form.images?.map((img, index) => {
          const isThumbnail = index === 0;
          return (
            <div
              key={img}
              onClick={() => setThumbnail(img)}
              className={`relative cursor-pointer rounded-lg overflow-hidden ${
                isThumbnail
                  ? "ring-4 ring-blue-500"
                  : "hover:ring-2 hover:ring-gray-300"
              }`}
            >
              <Image
                src={img}
                width={200}
                height={120}
                alt="car"
                className="object-cover w-full h-32"
              />
              {isThumbnail && (
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Thumbnail
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(img);
                }}
                className="absolute top-2 right-2 bg-black text-white px-2 rounded"
              >
                X
              </button>
            </div>
          );
        })}
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={updateCar}
        disabled={saving}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
      >
        {saving ? "Updating..." : "Update Car"}
      </button>

      {toast && <Toast {...toast} />}

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: white;
          color: #111;
        }
        .input:focus {
          border-color: #ef4444;
          outline: none;
        }
      `}</style>
    </div>
  );
}
