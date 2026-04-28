// // // // "use client";

// // // // import { use, useEffect, useState } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import Image from "next/image";

// // // // function Toast({ message, type }) {
// // // //   return (
// // // //     <div
// // // //       className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg z-50 ${
// // // //         type === "success"
// // // //           ? "bg-green-200 text-green-900"
// // // //           : "bg-red-200 text-red-900"
// // // //       }`}
// // // //     >
// // // //       {message}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function EditCarPage({ params }) {
// // // //   const router = useRouter();
// // // //   const { slug } = use(params);

// // // //   const [form, setForm] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [saving, setSaving] = useState(false);
// // // //   const [uploading, setUploading] = useState(false);
// // // //   const [deletingImg, setDeletingImg] = useState(null);
// // // //   const [toast, setToast] = useState(null);

// // // //   const showToast = (msg, type = "success") => {
// // // //     setToast({ message: msg, type });
// // // //     setTimeout(() => setToast(null), 3000);
// // // //   };

// // // //   /* ================= FETCH ================= */

// // // //   useEffect(() => {
// // // //     const fetchCar = async () => {
// // // //       try {
// // // //         const res = await fetch(`/api/admin/cars/${slug}`);
// // // //         const data = await res.json();
// // // //         setForm(data.data);
// // // //       } catch {
// // // //         showToast("Failed to load car", "error");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     if (slug) fetchCar();
// // // //   }, [slug]);

// // // //   /* ================= INPUT ================= */

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;

// // // //     setForm((prev) => ({
// // // //       ...prev,
// // // //       [name]: value,
// // // //     }));
// // // //   };

// // // //   /* ================= THUMBNAIL ================= */

// // // //   const setThumbnail = (img) => {
// // // //     setForm((prev) => {
// // // //       const rest = prev.images.filter((i) => i.public_id !== img.public_id);

// // // //       return {
// // // //         ...prev,
// // // //         images: [img, ...rest],
// // // //       };
// // // //     });
// // // //   };

// // // //   /* ================= DELETE IMAGE ================= */

// // // //   const handleDeleteImage = async (img) => {
// // // //     setDeletingImg(img.public_id);

// // // //     setForm((prev) => ({
// // // //       ...prev,
// // // //       images: prev.images.filter((i) => i.public_id !== img.public_id),
// // // //     }));

// // // //     try {
// // // //       await fetch("/admin/delete-image", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ public_id: img.public_id }),
// // // //       });

// // // //       showToast("Image deleted");
// // // //     } catch {
// // // //       showToast("Delete failed", "error");
// // // //     } finally {
// // // //       setDeletingImg(null);
// // // //     }
// // // //   };

// // // //   /* ================= UPLOAD ================= */

// // // //   const handleUpload = async (e) => {
// // // //     const files = Array.from(e.target.files);
// // // //     if (!files.length) return;

// // // //     setUploading(true);

// // // //     const formData = new FormData();
// // // //     files.forEach((f) => formData.append("files", f));

// // // //     try {
// // // //       const res = await fetch("/admin/upload", {
// // // //         method: "POST",
// // // //         body: formData,
// // // //       });

// // // //       const data = await res.json();

// // // //       setForm((prev) => ({
// // // //         ...prev,
// // // //         images: [...prev.images, ...data.urls],
// // // //       }));

// // // //       showToast("Images uploaded");
// // // //     } catch {
// // // //       showToast("Upload failed", "error");
// // // //     } finally {
// // // //       setUploading(false);
// // // //     }
// // // //   };

// // // //   /* ================= UPDATE ================= */

// // // //   const updateCar = async () => {
// // // //     setSaving(true);

// // // //     try {
// // // //       const res = await fetch(`/api/admin/cars/${slug}`, {
// // // //         method: "PUT",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify(form),
// // // //       });

// // // //       if (!res.ok) throw new Error();

// // // //       showToast("Car updated successfully");

// // // //       setTimeout(() => {
// // // //         router.push("/admin/cars");
// // // //       }, 1200);
// // // //     } catch {
// // // //       showToast("Update failed", "error");
// // // //     } finally {
// // // //       setSaving(false);
// // // //     }
// // // //   };

// // // //   if (loading || !form) {
// // // //     return (
// // // //       <div className="p-6 animate-pulse space-y-4">
// // // //         <div className="h-6 bg-gray-200 w-1/3 rounded" />
// // // //         <div className="h-40 bg-gray-200 rounded" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">
// // // //       <h1 className="text-3xl font-bold text-gray-800">Edit Car</h1>

// // // //       {/* BASIC INFO */}

// // // //       <div className="grid md:grid-cols-2 gap-4">
// // // //         <input
// // // //           name="name"
// // // //           value={form.name || ""}
// // // //           onChange={handleChange}
// // // //           className="input"
// // // //           placeholder="Car Name"
// // // //         />

// // // //         <input
// // // //           name="brand"
// // // //           value={form.brand || ""}
// // // //           onChange={handleChange}
// // // //           className="input"
// // // //           placeholder="Brand"
// // // //         />
// // // //       </div>

// // // //       {/* DETAILS */}

// // // //       <div className="grid md:grid-cols-3 gap-4">
// // // //         <input
// // // //           name="price"
// // // //           value={form.price || ""}
// // // //           onChange={handleChange}
// // // //           className="input"
// // // //           placeholder="Price"
// // // //         />

// // // //         <input
// // // //           name="year"
// // // //           value={form.year || ""}
// // // //           onChange={handleChange}
// // // //           className="input"
// // // //           placeholder="Year"
// // // //         />

// // // //         <input
// // // //           name="mileage"
// // // //           value={form.mileage || ""}
// // // //           onChange={handleChange}
// // // //           className="input"
// // // //           placeholder="Mileage"
// // // //         />
// // // //       </div>

// // // //       {/* OPTIONS */}

// // // //       <div className="grid md:grid-cols-2 gap-4">
// // // //         <select
// // // //           name="fuelType"
// // // //           value={form.fuelType || "Petrol"}
// // // //           onChange={handleChange}
// // // //           className="input"
// // // //         >
// // // //           <option>Petrol</option>
// // // //           <option>Diesel</option>
// // // //           <option>Electric</option>
// // // //         </select>

// // // //         <select
// // // //           name="transmission"
// // // //           value={form.transmission || "Manual"}
// // // //           onChange={handleChange}
// // // //           className="input"
// // // //         >
// // // //           <option>Manual</option>
// // // //           <option>Automatic</option>
// // // //         </select>
// // // //       </div>

// // // //       <div className="grid md:grid-cols-2 gap-4">
// // // //         <select
// // // //           name="category"
// // // //           value={form.category || "Sedan"}
// // // //           onChange={handleChange}
// // // //           className="input"
// // // //         >
// // // //           <option>Sedan</option>
// // // //           <option>SUV</option>
// // // //           <option>Truck</option>
// // // //         </select>

// // // //         <select
// // // //           name="status"
// // // //           value={form.status || "Available"}
// // // //           onChange={handleChange}
// // // //           className="input"
// // // //         >
// // // //           <option>Available</option>
// // // //           <option>Reserved</option>
// // // //           <option>Sold</option>
// // // //         </select>
// // // //       </div>

// // // //       {/* DESCRIPTION */}

// // // //       <textarea
// // // //         name="description"
// // // //         value={form.description || ""}
// // // //         onChange={handleChange}
// // // //         className="input min-h-30"
// // // //         placeholder="Description"
// // // //       />

// // // //       {/* UPLOAD */}

// // // //       <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
// // // //         <label className="cursor-pointer flex flex-col items-center gap-3">
// // // //           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
// // // //             +
// // // //           </div>

// // // //           <div className="text-gray-700 font-medium">
// // // //             Click to upload images
// // // //           </div>

// // // //           <input
// // // //             type="file"
// // // //             multiple
// // // //             onChange={handleUpload}
// // // //             className="hidden"
// // // //           />
// // // //         </label>
// // // //       </div>

// // // //       {uploading && (
// // // //         <p className="text-red-600 text-sm font-medium">Uploading images...</p>
// // // //       )}

// // // //       {/* IMAGES */}

// // // //       <div className="grid grid-cols-3 gap-3">
// // // //         {form.images?.map((img, index) => {
// // // //           const isThumbnail = index === 0;

// // // //           return (
// // // //             <div
// // // //               key={img.public_id}
// // // //               onClick={() => setThumbnail(img)}
// // // //               className={`relative cursor-pointer rounded-lg overflow-hidden ${
// // // //                 isThumbnail
// // // //                   ? "ring-4 ring-blue-500"
// // // //                   : "hover:ring-2 hover:ring-gray-300"
// // // //               }`}
// // // //             >
// // // //               <Image
// // // //                 src={img.url}
// // // //                 width={200}
// // // //                 height={120}
// // // //                 alt="car"
// // // //                 className="object-cover w-full h-32"
// // // //               />

// // // //               {isThumbnail && (
// // // //                 <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
// // // //                   Thumbnail
// // // //                 </span>
// // // //               )}

// // // //               <button
// // // //                 onClick={(e) => {
// // // //                   e.stopPropagation();
// // // //                   handleDeleteImage(img);
// // // //                 }}
// // // //                 className="absolute top-2 right-2 bg-black text-white px-2 rounded"
// // // //               >
// // // //                 {deletingImg === img.public_id ? "..." : "X"}
// // // //               </button>
// // // //             </div>
// // // //           );
// // // //         })}
// // // //       </div>

// // // //       {/* UPDATE BUTTON */}

// // // //       <button
// // // //         onClick={updateCar}
// // // //         disabled={saving}
// // // //         className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold"
// // // //       >
// // // //         {saving ? "Updating..." : "Update Car"}
// // // //       </button>

// // // //       {toast && <Toast {...toast} />}

// // // //       <style jsx>{`
// // // //         .input {
// // // //           width: 100%;
// // // //           padding: 12px;
// // // //           border: 1px solid #ddd;
// // // //           border-radius: 10px;
// // // //           background: white;
// // // //           color: #111;
// // // //         }

// // // //         .input:focus {
// // // //           border-color: #ef4444;
// // // //           outline: none;
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import { use, useEffect, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import Image from "next/image";

// // // function Toast({ message, type }) {
// // //   return (
// // //     <div
// // //       className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg z-50 ${
// // //         type === "success"
// // //           ? "bg-green-200 text-green-900"
// // //           : "bg-red-200 text-red-900"
// // //       }`}
// // //     >
// // //       {message}
// // //     </div>
// // //   );
// // // }

// // // export default function EditCarPage({ params }) {
// // //   const router = useRouter();
// // //   const { slug } = use(params);

// // //   const [form, setForm] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [saving, setSaving] = useState(false);
// // //   const [uploading, setUploading] = useState(false);
// // //   const [deletingImg, setDeletingImg] = useState(null);
// // //   const [toast, setToast] = useState(null);

// // //   const showToast = (msg, type = "success") => {
// // //     setToast({ message: msg, type });
// // //     setTimeout(() => setToast(null), 3000);
// // //   };

// // //   // ================= FETCH =================
// // //   useEffect(() => {
// // //     const fetchCar = async () => {
// // //       try {
// // //         const res = await fetch(`/api/admin/cars/${slug}`);

// // //         if (!res.ok) {
// // //           throw new Error("Failed to fetch car");
// // //         }

// // //         let data;
// // //         try {
// // //           data = await res.json();
// // //         } catch {
// // //           throw new Error("Invalid server response");
// // //         }

// // //         if (!data?.data) {
// // //           throw new Error("Car not found");
// // //         }

// // //         setForm(data.data);
// // //       } catch (err) {
// // //         console.error("Fetch error:", err);
// // //         showToast(err.message || "Failed to load car", "error");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     if (slug) fetchCar();
// // //   }, [slug]);

// // //   // ================= INPUT =================
// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;

// // //     setForm((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   // ================= THUMBNAIL =================
// // //   const setThumbnail = (img) => {
// // //     setForm((prev) => {
// // //       const rest = prev.images.filter((i) => i.public_id !== img.public_id);

// // //       return {
// // //         ...prev,
// // //         images: [img, ...rest],
// // //       };
// // //     });
// // //   };

// // //   // ================= DELETE IMAGE =================
// // //   const handleDeleteImage = async (img) => {
// // //     const backupImages = [...form.images]; // rollback

// // //     setDeletingImg(img.public_id);

// // //     setForm((prev) => ({
// // //       ...prev,
// // //       images: prev.images.filter((i) => i.public_id !== img.public_id),
// // //     }));

// // //     try {
// // //       const res = await fetch("/admin/delete-image", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ public_id: img.public_id }),
// // //       });

// // //       if (!res.ok) {
// // //         throw new Error("Delete failed");
// // //       }

// // //       showToast("Image deleted");
// // //     } catch (err) {
// // //       console.error("Delete image error:", err);

// // //       // rollback UI if failed
// // //       setForm((prev) => ({
// // //         ...prev,
// // //         images: backupImages,
// // //       }));

// // //       showToast("Delete failed", "error");
// // //     } finally {
// // //       setDeletingImg(null);
// // //     }
// // //   };

// // //   // ================= UPLOAD =================
// // //   const handleUpload = async (e) => {
// // //     const files = Array.from(e.target.files || []);
// // //     if (!files.length) return;

// // //     setUploading(true);

// // //     try {
// // //       const formData = new FormData();
// // //       files.forEach((f) => formData.append("files", f));

// // //       const res = await fetch("/admin/upload", {
// // //         method: "POST",
// // //         body: formData,
// // //       });

// // //       if (!res.ok) {
// // //         throw new Error("Upload failed");
// // //       }

// // //       let data;
// // //       try {
// // //         data = await res.json();
// // //       } catch {
// // //         throw new Error("Invalid upload response");
// // //       }

// // //       if (!data?.urls) {
// // //         throw new Error("No images returned");
// // //       }

// // //       setForm((prev) => ({
// // //         ...prev,
// // //         images: [...prev.images, ...data.urls],
// // //       }));

// // //       showToast("Images uploaded");
// // //     } catch (err) {
// // //       console.error("Upload error:", err);
// // //       showToast(err.message || "Upload failed", "error");
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // //   // ================= UPDATE =================
// // //   const updateCar = async () => {
// // //     setSaving(true);

// // //     try {
// // //       const res = await fetch(`/api/admin/cars/${slug}`, {
// // //         method: "PUT",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(form),
// // //       });

// // //       if (!res.ok) {
// // //         throw new Error("Update request failed");
// // //       }

// // //       let data;
// // //       try {
// // //         data = await res.json();
// // //       } catch {
// // //         throw new Error("Invalid response from server");
// // //       }

// // //       if (!data?.success) {
// // //         throw new Error(data?.message || "Update failed");
// // //       }

// // //       showToast("Car updated successfully");

// // //       setTimeout(() => {
// // //         router.push("/admin/cars");
// // //       }, 1200);
// // //     } catch (err) {
// // //       console.error("Update error:", err);
// // //       showToast(err.message || "Update failed", "error");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   if (loading || !form) {
// // //     return (
// // //       <div className="p-6 animate-pulse space-y-4">
// // //         <div className="h-6 bg-gray-200 w-1/3 rounded" />
// // //         <div className="h-40 bg-gray-200 rounded" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">
// // //       <h1 className="text-3xl font-bold text-gray-800">Edit Car</h1>

// // //       {/* (UI unchanged below) */}
// // //       {/* ... your full UI stays exactly the same ... */}

// // //       <button
// // //         onClick={updateCar}
// // //         disabled={saving}
// // //         className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold"
// // //       >
// // //         {saving ? "Updating..." : "Update Car"}
// // //       </button>

// // //       {toast && <Toast {...toast} />}
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { use, useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";

// // function Toast({ message, type }) {
// //   return (
// //     <div
// //       className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg z-50 ${
// //         type === "success"
// //           ? "bg-green-200 text-green-900"
// //           : "bg-red-200 text-red-900"
// //       }`}
// //     >
// //       {message}
// //     </div>
// //   );
// // }

// // export default function EditCarPage({ params }) {
// //   const router = useRouter();
// //   const { slug } = use(params);

// //   const [form, setForm] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [uploading, setUploading] = useState(false);
// //   const [deletingImg, setDeletingImg] = useState(null);
// //   const [toast, setToast] = useState(null);

// //   const showToast = (msg, type = "success") => {
// //     setToast({ message: msg, type });
// //     setTimeout(() => setToast(null), 3000);
// //   };

// //   /* ================= FETCH ================= */

// //   useEffect(() => {
// //     const fetchCar = async () => {
// //       try {
// //         const res = await fetch(`/api/admin/cars/${slug}`);
// //         const data = await res.json();
// //         setForm(data.data);
// //       } catch {
// //         showToast("Failed to load car", "error");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (slug) fetchCar();
// //   }, [slug]);

// //   /* ================= INPUT ================= */

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     setForm((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   /* ================= THUMBNAIL ================= */

// //   const setThumbnail = (img) => {
// //     setForm((prev) => {
// //       const rest = prev.images.filter((i) => i.public_id !== img.public_id);

// //       return {
// //         ...prev,
// //         images: [img, ...rest],
// //       };
// //     });
// //   };

// //   /* ================= DELETE IMAGE ================= */

// //   const handleDeleteImage = async (img) => {
// //     setDeletingImg(img.public_id);

// //     setForm((prev) => ({
// //       ...prev,
// //       images: prev.images.filter((i) => i.public_id !== img.public_id),
// //     }));

// //     try {
// //       await fetch("/admin/delete-image", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ public_id: img.public_id }),
// //       });

// //       showToast("Image deleted");
// //     } catch {
// //       showToast("Delete failed", "error");
// //     } finally {
// //       setDeletingImg(null);
// //     }
// //   };

// //   /* ================= UPLOAD ================= */

// //   const handleUpload = async (e) => {
// //     const files = Array.from(e.target.files);
// //     if (!files.length) return;

// //     setUploading(true);

// //     const formData = new FormData();
// //     files.forEach((f) => formData.append("files", f));

// //     try {
// //       const res = await fetch("/admin/upload", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       const data = await res.json();

// //       setForm((prev) => ({
// //         ...prev,
// //         images: [...prev.images, ...data.urls],
// //       }));

// //       showToast("Images uploaded");
// //     } catch {
// //       showToast("Upload failed", "error");
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   /* ================= UPDATE ================= */

// //   const updateCar = async () => {
// //     setSaving(true);

// //     try {
// //       const res = await fetch(`/api/admin/cars/${slug}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(form),
// //       });

// //       if (!res.ok) throw new Error();

// //       showToast("Car updated successfully");

// //       setTimeout(() => {
// //         router.push("/admin/cars");
// //       }, 1200);
// //     } catch {
// //       showToast("Update failed", "error");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   if (loading || !form) {
// //     return (
// //       <div className="p-6 animate-pulse space-y-4">
// //         <div className="h-6 bg-gray-200 w-1/3 rounded" />
// //         <div className="h-40 bg-gray-200 rounded" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">
// //       <h1 className="text-3xl font-bold text-gray-800">Edit Car</h1>

// //       {/* BASIC INFO */}

// //       <div className="grid md:grid-cols-2 gap-4">
// //         <input
// //           name="name"
// //           value={form.name || ""}
// //           onChange={handleChange}
// //           className="input"
// //           placeholder="Car Name"
// //         />

// //         <input
// //           name="brand"
// //           value={form.brand || ""}
// //           onChange={handleChange}
// //           className="input"
// //           placeholder="Brand"
// //         />
// //       </div>

// //       {/* DETAILS */}

// //       <div className="grid md:grid-cols-3 gap-4">
// //         <input
// //           name="price"
// //           value={form.price || ""}
// //           onChange={handleChange}
// //           className="input"
// //           placeholder="Price"
// //         />

// //         <input
// //           name="year"
// //           value={form.year || ""}
// //           onChange={handleChange}
// //           className="input"
// //           placeholder="Year"
// //         />

// //         <input
// //           name="mileage"
// //           value={form.mileage || ""}
// //           onChange={handleChange}
// //           className="input"
// //           placeholder="Mileage"
// //         />
// //       </div>

// //       {/* OPTIONS */}

// //       <div className="grid md:grid-cols-2 gap-4">
// //         <select
// //           name="fuelType"
// //           value={form.fuelType || "Petrol"}
// //           onChange={handleChange}
// //           className="input"
// //         >
// //           <option>Petrol</option>
// //           <option>Diesel</option>
// //           <option>Electric</option>
// //         </select>

// //         <select
// //           name="transmission"
// //           value={form.transmission || "Manual"}
// //           onChange={handleChange}
// //           className="input"
// //         >
// //           <option>Manual</option>
// //           <option>Automatic</option>
// //         </select>
// //       </div>

// //       <div className="grid md:grid-cols-2 gap-4">
// //         <select
// //           name="category"
// //           value={form.category || "Sedan"}
// //           onChange={handleChange}
// //           className="input"
// //         >
// //           <option>Sedan</option>
// //           <option>SUV</option>
// //           <option>Truck</option>
// //         </select>

// //         <select
// //           name="status"
// //           value={form.status || "Available"}
// //           onChange={handleChange}
// //           className="input"
// //         >
// //           <option>Available</option>
// //           <option>Reserved</option>
// //           <option>Sold</option>
// //         </select>
// //       </div>

// //       {/* DESCRIPTION */}

// //       <textarea
// //         name="description"
// //         value={form.description || ""}
// //         onChange={handleChange}
// //         className="input min-h-30"
// //         placeholder="Description"
// //       />

// //       {/* UPLOAD */}

// //       <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
// //         <label className="cursor-pointer flex flex-col items-center gap-3">
// //           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
// //             +
// //           </div>

// //           <div className="text-gray-700 font-medium">
// //             Click to upload images
// //           </div>

// //           <input
// //             type="file"
// //             multiple
// //             onChange={handleUpload}
// //             className="hidden"
// //           />
// //         </label>
// //       </div>

// //       {uploading && (
// //         <p className="text-red-600 text-sm font-medium">Uploading images...</p>
// //       )}

// //       {/* IMAGES */}

// //       <div className="grid grid-cols-3 gap-3">
// //         {form.images?.map((img, index) => {
// //           const isThumbnail = index === 0;

// //           return (
// //             <div
// //               key={img.public_id}
// //               onClick={() => setThumbnail(img)}
// //               className={`relative cursor-pointer rounded-lg overflow-hidden ${
// //                 isThumbnail
// //                   ? "ring-4 ring-blue-500"
// //                   : "hover:ring-2 hover:ring-gray-300"
// //               }`}
// //             >
// //               <Image
// //                 src={img.url}
// //                 width={200}
// //                 height={120}
// //                 alt="car"
// //                 className="object-cover w-full h-32"
// //               />

// //               {isThumbnail && (
// //                 <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
// //                   Thumbnail
// //                 </span>
// //               )}

// //               <button
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   handleDeleteImage(img);
// //                 }}
// //                 className="absolute top-2 right-2 bg-black text-white px-2 rounded"
// //               >
// //                 {deletingImg === img.public_id ? "..." : "X"}
// //               </button>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* UPDATE BUTTON */}

// //       <button
// //         onClick={updateCar}
// //         disabled={saving}
// //         className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold"
// //       >
// //         {saving ? "Updating..." : "Update Car"}
// //       </button>

// //       {toast && <Toast {...toast} />}

// //       <style jsx>{`
// //         .input {
// //           width: 100%;
// //           padding: 12px;
// //           border: 1px solid #ddd;
// //           border-radius: 10px;
// //           background: white;
// //           color: #111;
// //         }

// //         .input:focus {
// //           border-color: #ef4444;
// //           outline: none;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }
// "use client";

// import { use, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// function Toast({ message, type }) {
//   return (
//     <div
//       className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg z-50 ${
//         type === "success"
//           ? "bg-green-200 text-green-900"
//           : "bg-red-200 text-red-900"
//       }`}
//     >
//       {message}
//     </div>
//   );
// }

// export default function EditCarPage({ params }) {
//   const router = useRouter();
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

//   /* ================= FETCH (ENHANCED ERROR HANDLING) ================= */

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(`/api/admin/cars/${slug}`);

//         if (!res.ok) {
//           throw new Error(`Failed to fetch car (${res.status})`);
//         }

//         let data;
//         try {
//           data = await res.json();
//         } catch {
//           throw new Error("Invalid server response");
//         }

//         if (!data?.data) {
//           throw new Error("Car not found");
//         }

//         setForm(data.data);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         showToast(err.message || "Failed to load car", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) fetchCar();
//   }, [slug]);

//   /* ================= INPUT ================= */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* ================= THUMBNAIL ================= */

//   const setThumbnail = (img) => {
//     setForm((prev) => {
//       if (!prev?.images) return prev;

//       const rest = prev.images.filter((i) => i.public_id !== img.public_id);

//       return {
//         ...prev,
//         images: [img, ...rest],
//       };
//     });
//   };

//   /* ================= DELETE IMAGE (SAFE + ROLLBACK) ================= */

//   const handleDeleteImage = async (img) => {
//     const backup = form?.images || [];

//     try {
//       setDeletingImg(img.public_id);

//       // optimistic UI update
//       setForm((prev) => ({
//         ...prev,
//         images: prev.images.filter((i) => i.public_id !== img.public_id),
//       }));

//       const res = await fetch("/admin/delete-image", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ public_id: img.public_id }),
//       });

//       if (!res.ok) {
//         throw new Error("Delete request failed");
//       }

//       showToast("Image deleted");
//     } catch (err) {
//       console.error("Delete error:", err);

//       // rollback if failed
//       setForm((prev) => ({
//         ...prev,
//         images: backup,
//       }));

//       showToast(err.message || "Delete failed", "error");
//     } finally {
//       setDeletingImg(null);
//     }
//   };

//   /* ================= UPLOAD (ENHANCED SAFETY) ================= */

//   const handleUpload = async (e) => {
//     const files = Array.from(e.target.files || []);
//     if (!files.length) {
//       showToast("No files selected", "error");
//       return;
//     }

//     setUploading(true);

//     try {
//       const formData = new FormData();
//       files.forEach((f) => formData.append("files", f));

//       const res = await fetch("/admin/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error(`Upload failed (${res.status})`);
//       }

//       let data;
//       try {
//         data = await res.json();
//       } catch {
//         throw new Error("Invalid upload response");
//       }

//       if (!data?.urls || !Array.isArray(data.urls)) {
//         throw new Error("No images returned from server");
//       }

//       setForm((prev) => ({
//         ...prev,
//         images: [...(prev.images || []), ...data.urls],
//       }));

//       showToast("Images uploaded");
//     } catch (err) {
//       console.error("Upload error:", err);
//       showToast(err.message || "Upload failed", "error");
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ================= UPDATE (ENHANCED ERROR HANDLING) ================= */

//   const updateCar = async () => {
//     if (!form) return;

//     setSaving(true);

//     try {
//       const res = await fetch(`/api/admin/cars/${slug}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         let msg = "Update failed";
//         try {
//           const errData = await res.json();
//           msg = errData?.message || msg;
//         } catch {}

//         throw new Error(msg);
//       }

//       showToast("Car updated successfully");

//       setTimeout(() => {
//         router.push("/admin/cars");
//       }, 1200);
//     } catch (err) {
//       console.error("Update error:", err);
//       showToast(err.message || "Update failed", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

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
//       <h1 className="text-3xl font-bold text-gray-800">Edit Car</h1>

//       {/* UI unchanged */}

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

//       <div className="grid md:grid-cols-3 gap-4">
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

//         <select
//           name="status"
//           value={form.status || "Available"}
//           onChange={handleChange}
//           className="input"
//         >
//           <option>Available</option>
//           <option>Sold</option>
//         </select>
//       </div>

//       <textarea
//         name="description"
//         value={form.description || ""}
//         onChange={handleChange}
//         className="input min-h-30"
//         placeholder="Description"
//       />

//       <button
//         onClick={updateCar}
//         disabled={saving}
//         className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold"
//       >
//         {saving ? "Updating..." : "Update Car"}
//       </button>

//       {toast && <Toast {...toast} />}

//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 12px;
//           border: 1px solid #ddd;
//           border-radius: 10px;
//           background: white;
//           color: #111;
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

        if (!res.ok) {
          throw new Error("Failed to fetch car");
        }

        const data = await res.json();

        if (!data?.data) {
          throw new Error("Car data not found");
        }

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

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= THUMBNAIL ================= */

  const setThumbnail = (img) => {
    setForm((prev) => {
      if (!prev?.images) return prev;

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

    const backup = form?.images || [];

    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((i) => i.public_id !== img.public_id),
    }));

    try {
      const res = await fetch("/admin/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: img.public_id }),
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      showToast("Image deleted");
    } catch (err) {
      console.error(err);

      // rollback
      setForm((prev) => ({
        ...prev,
        images: backup,
      }));

      showToast("Delete failed", "error");
    } finally {
      setDeletingImg(null);
    }
  };

  /* ================= UPLOAD ================= */

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));

      const res = await fetch("/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();

      if (!data?.urls || !Array.isArray(data.urls)) {
        throw new Error("Invalid upload response");
      }

      setForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...data.urls],
      }));

      showToast("Images uploaded");
    } catch (err) {
      console.error(err);
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

      if (!res.ok) {
        throw new Error("Update failed");
      }

      showToast("Car updated successfully");

      setTimeout(() => {
        router.push("/admin/cars");
      }, 1200);
    } catch (err) {
      console.error(err);
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

      <textarea
        name="description"
        value={form.description || ""}
        onChange={handleChange}
        className="input min-h-30"
        placeholder="Description"
      />

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
