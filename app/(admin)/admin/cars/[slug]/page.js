// "use client";

// import { use, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// // ================= TOAST =================
// function Toast({ message, type }) {
//   return (
//     <div
//       className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg text-white z-50 ${
//         type === "success" ? "bg-green-500" : "bg-red-500"
//       }`}
//     >
//       {message}
//     </div>
//   );
// }

// export default function EditCarPage({ params }) {
//   const router = useRouter();

//   // ✅ NEXT.JS 15 FIX
//   const { slug } = use(params);

//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [deletingImg, setDeletingImg] = useState(null);
//   const [toast, setToast] = useState(null);

//   const showToast = (msg, type = "success") => {
//     setToast({ message: msg, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   // ================= FETCH CAR =================
//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         console.log("about to fetch cars");
//         const res = await fetch(`/api/admin/cars/${slug}`);
//         console.log("fetch cars");
//         const data = await res.json();

//         setForm(data.data);
//       } catch (err) {
//         showToast("Failed to load car", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) fetchCar();
//   }, [slug]);

//   // ================= HANDLE INPUT =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ================= DELETE IMAGE =================
//   const handleDeleteImage = async (img) => {
//     setDeletingImg(img.public_id);

//     // optimistic update
//     setForm((prev) => ({
//       ...prev,
//       images: prev.images.filter((i) => i.public_id !== img.public_id),
//     }));

//     try {
//       await fetch("/admin/delete-image", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ public_id: img.public_id }),
//       });

//       showToast("Image deleted");
//     } catch {
//       showToast("Delete failed", "error");
//     } finally {
//       setDeletingImg(null);
//     }
//   };

//   // ================= UPLOAD =================
//   const handleUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (!files.length) return;

//     setUploading(true);

//     const formData = new FormData();
//     files.forEach((f) => formData.append("files", f));

//     try {
//       const res = await fetch("/admin/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error();

//       setForm((prev) => ({
//         ...prev,
//         images: [...prev.images, ...data.urls],
//       }));

//       showToast("Images uploaded");
//     } catch {
//       showToast("Upload failed", "error");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ================= UPDATE =================
//   const updateCar = async () => {
//     setSaving(true);

//     try {
//       const res = await fetch(`/api/admin/cars/${slug}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) throw new Error();

//       showToast("Car updated successfully 🚀");

//       setTimeout(() => {
//         router.push("/admin/cars");
//       }, 1200);
//     } catch {
//       showToast("Update failed", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ================= LOADING =================
//   if (loading || !form) {
//     return (
//       <div className="p-6 animate-pulse space-y-4">
//         <div className="h-6 bg-gray-200 w-1/3 rounded" />
//         <div className="h-40 bg-gray-200 rounded" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">
//       <h1 className="text-3xl font-bold">Edit Car</h1>

//       {/* ================= BASIC INFO ================= */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <input
//           name="name"
//           value={form.name || ""}
//           onChange={handleChange}
//           className="input"
//           placeholder="Car Name"
//         />

//         <input
//           name="brand"
//           value={form.brand || ""}
//           onChange={handleChange}
//           className="input"
//           placeholder="Brand"
//         />
//       </div>

//       {/* ================= DETAILS ================= */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <input
//           name="price"
//           value={form.price || ""}
//           onChange={handleChange}
//           className="input"
//           placeholder="Price"
//         />

//         <input
//           name="year"
//           value={form.year || ""}
//           onChange={handleChange}
//           className="input"
//           placeholder="Year"
//         />

//         <input
//           name="mileage"
//           value={form.mileage || ""}
//           onChange={handleChange}
//           className="input"
//           placeholder="Mileage"
//         />
//       </div>

//       {/* ================= OPTIONS ================= */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <select
//           name="fuelType"
//           value={form.fuelType || "Petrol"}
//           onChange={handleChange}
//           className="input"
//         >
//           <option>Petrol</option>
//           <option>Diesel</option>
//           <option>Electric</option>
//         </select>

//         <select
//           name="transmission"
//           value={form.transmission || "Manual"}
//           onChange={handleChange}
//           className="input"
//         >
//           <option>Manual</option>
//           <option>Automatic</option>
//         </select>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <select
//           name="category"
//           value={form.category || "Sedan"}
//           onChange={handleChange}
//           className="input"
//         >
//           <option>Sedan</option>
//           <option>SUV</option>
//           <option>Truck</option>
//         </select>

//         <select
//           name="status"
//           value={form.status || "Available"}
//           onChange={handleChange}
//           className="input"
//         >
//           <option>Available</option>
//           <option>Reserved</option>
//           <option>Sold</option>
//         </select>
//       </div>

//       {/* ================= DESCRIPTION ================= */}
//       <textarea
//         name="description"
//         value={form.description || ""}
//         onChange={handleChange}
//         className="input min-h-[120px]"
//         placeholder="Description"
//       />

//       {/* ================= UPLOAD ================= */}
//       {/* <input type="file" multiple onChange={handleUpload} />
//       {uploading && <p className="text-blue-500">Uploading...</p>} */}
//       {/* ================= UPLOAD ================= */}
//       <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-red-400 transition bg-gray-50">
//         <label className="cursor-pointer flex flex-col items-center gap-3">
//           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-500 text-2xl">
//             +
//           </div>

//           <div className="text-sm text-gray-600">
//             <span className="font-semibold text-red-500">Click to upload</span>{" "}
//             or drag images
//           </div>

//           <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>

//           <input
//             type="file"
//             multiple
//             onChange={handleUpload}
//             className="hidden"
//           />
//         </label>
//       </div>

//       {uploading && (
//         <p className="text-red-500 text-sm font-medium">Uploading images...</p>
//       )}
//       {/* ================= IMAGES ================= */}
//       <div className="grid grid-cols-3 gap-3">
//         {form.images?.map((img) => (
//           <div key={img.public_id} className="relative">
//             <Image
//               src={img.url}
//               width={200}
//               height={120}
//               className="rounded-lg object-cover"
//               alt="car"
//             />

//             <button
//               onClick={() => handleDeleteImage(img)}
//               className="absolute top-1 right-1 bg-black text-white px-2 rounded"
//             >
//               {deletingImg === img.public_id ? "..." : "X"}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ================= UPDATE ================= */}
//       <button
//         onClick={updateCar}
//         disabled={saving}
//         className="w-full bg-red-500 text-white py-3 rounded-xl"
//       >
//         {saving ? "Updating..." : "Update Car"}
//       </button>

//       {/* ================= TOAST ================= */}
//       {toast && <Toast {...toast} />}

//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 12px;
//           border: 1px solid #ddd;
//           border-radius: 10px;
//         }
//         .input:focus {
//           border-color: #ef4444;
//           outline: none;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [uploading, setUploading] = useState(false);
  const [deletingImg, setDeletingImg] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/admin/cars/${slug}`);
        const data = await res.json();
        setForm(data.data);
      } catch {
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

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleDeleteImage = async (img) => {
    setDeletingImg(img.public_id);

    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((i) => i.public_id !== img.public_id),
    }));

    try {
      await fetch("/admin/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: img.public_id }),
      });

      showToast("Image deleted");
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeletingImg(null);
    }
  };

  /* ================= UPLOAD ================= */

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

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

      showToast("Images uploaded");
    } catch {
      showToast("Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  /* ================= UPDATE ================= */

  const updateCar = async () => {
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/cars/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      showToast("Car updated successfully");

      setTimeout(() => {
        router.push("/admin/cars");
      }, 1200);
    } catch {
      showToast("Update failed", "error");
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

      {/* BASIC INFO */}

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

      {/* DETAILS */}

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

      {/* OPTIONS */}

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
          <option>Truck</option>
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

      {/* UPLOAD */}

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
        <label className="cursor-pointer flex flex-col items-center gap-3">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
            +
          </div>

          <div className="text-gray-700 font-medium">
            Click to upload images
          </div>

          <input
            type="file"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {uploading && (
        <p className="text-red-600 text-sm font-medium">Uploading images...</p>
      )}

      {/* IMAGES */}

      <div className="grid grid-cols-3 gap-3">
        {form.images?.map((img, index) => {
          const isThumbnail = index === 0;

          return (
            <div
              key={img.public_id}
              onClick={() => setThumbnail(img)}
              className={`relative cursor-pointer rounded-lg overflow-hidden ${
                isThumbnail
                  ? "ring-4 ring-blue-500"
                  : "hover:ring-2 hover:ring-gray-300"
              }`}
            >
              <Image
                src={img.url}
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
                {deletingImg === img.public_id ? "..." : "X"}
              </button>
            </div>
          );
        })}
      </div>

      {/* UPDATE BUTTON */}

      <button
        onClick={updateCar}
        disabled={saving}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold"
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
