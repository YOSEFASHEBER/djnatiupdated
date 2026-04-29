// // // "use client";

// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import Image from "next/image";
// // // import { UploadCloud, Loader2, X } from "lucide-react";

// // // export default function CreateCarPage() {
// // //   const router = useRouter();

// // //   const [uploading, setUploading] = useState(false);
// // //   const [saving, setSaving] = useState(false);

// // //   const [toast, setToast] = useState({
// // //     show: false,
// // //     message: "",
// // //     type: "success",
// // //   });

// // //   const showToast = (message, type = "success") => {
// // //     setToast({ show: true, message, type });

// // //     setTimeout(() => {
// // //       setToast({ show: false, message: "", type: "success" });
// // //     }, 3000);
// // //   };

// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     brand: "",
// // //     category: "Sedan",
// // //     price: "",
// // //     year: "",
// // //     fuelType: "Petrol",
// // //     transmission: "Automatic",
// // //     mileage: "",
// // //     status: "Available",
// // //     description: "",
// // //     images: [],
// // //   });

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;

// // //     if (name === "price") {
// // //       const raw = value.replace(/,/g, "");
// // //       if (!raw) return setForm({ ...form, price: "" });

// // //       setForm({
// // //         ...form,
// // //         price: Number(raw).toLocaleString(),
// // //       });

// // //       return;
// // //     }

// // //     setForm({
// // //       ...form,
// // //       [name]: value,
// // //     });
// // //   };

// // //   const isFormValid =
// // //     form.name &&
// // //     form.brand &&
// // //     form.price &&
// // //     form.year &&
// // //     form.images.length > 0;

// // //   /* ================= IMAGE UPLOAD (ENHANCED ERROR HANDLING) ================= */

// // //   const handleUpload = async (e) => {
// // //     try {
// // //       const files = Array.from(e.target.files || []);

// // //       if (!files.length) {
// // //         showToast("No files selected", "error");
// // //         return;
// // //       }

// // //       setUploading(true);

// // //       const formData = new FormData();
// // //       files.forEach((file) => formData.append("files", file));

// // //       const res = await fetch("/admin/upload", {
// // //         method: "POST",
// // //         body: formData,
// // //       });

// // //       if (!res.ok) {
// // //         throw new Error(`Upload failed (${res.status})`);
// // //       }

// // //       let data;
// // //       try {
// // //         data = await res.json();
// // //       } catch {
// // //         throw new Error("Invalid server response");
// // //       }

// // //       if (!data?.urls || !Array.isArray(data.urls)) {
// // //         throw new Error("No images returned from server");
// // //       }

// // //       setForm((prev) => ({
// // //         ...prev,
// // //         images: [...prev.images, ...data.urls],
// // //       }));

// // //       showToast("Images uploaded successfully");
// // //     } catch (err) {
// // //       console.error("Upload error:", err);
// // //       showToast(err.message || "Image upload failed", "error");
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // //   const setThumbnail = (img) => {
// // //     setForm((prev) => {
// // //       const rest = prev.images.filter((i) => i.public_id !== img.public_id);
// // //       return {
// // //         ...prev,
// // //         images: [img, ...rest],
// // //       };
// // //     });
// // //   };

// // //   const deleteImage = (img) => {
// // //     setForm((prev) => ({
// // //       ...prev,
// // //       images: prev.images.filter((i) => i.public_id !== img.public_id),
// // //     }));

// // //     showToast("Image removed");
// // //   };

// // //   /* ================= SUBMIT (ENHANCED ERROR HANDLING) ================= */

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     if (!isFormValid) {
// // //       showToast("Please fill all required fields", "error");
// // //       return;
// // //     }

// // //     setSaving(true);

// // //     try {
// // //       const res = await fetch("/api/admin/cars", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           ...form,
// // //           price: Number(form.price.replace(/,/g, "")),
// // //           year: Number(form.year),
// // //           mileage: Number(form.mileage || 0),
// // //         }),
// // //       });

// // //       if (!res.ok) {
// // //         let msg = "Failed to create car";

// // //         try {
// // //           const errData = await res.json();
// // //           msg = errData?.message || msg;
// // //         } catch {}

// // //         throw new Error(msg);
// // //       }

// // //       showToast("🚗 Car created successfully!");

// // //       setTimeout(() => {
// // //         router.push("/admin/cars");
// // //       }, 1200);
// // //     } catch (err) {
// // //       console.error("Submit error:", err);
// // //       showToast(err.message || "❌ Failed to create car", "error");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   return (
// // //     <main className="min-h-screen bg-gray-100 p-6 relative">
// // //       {toast.show && (
// // //         <div
// // //           className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${
// // //             toast.type === "success" ? "bg-green-600" : "bg-red-600"
// // //           }`}
// // //         >
// // //           {toast.message}
// // //         </div>
// // //       )}

// // //       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-8">
// // //         <h1 className="text-3xl font-bold text-gray-800">Add New Car</h1>

// // //         <form onSubmit={handleSubmit} className="space-y-8 text-slate-600">
// // //           <div className="grid md:grid-cols-2 gap-6">
// // //             <input
// // //               name="name"
// // //               placeholder="Car Name *"
// // //               value={form.name}
// // //               onChange={handleChange}
// // //               className="input"
// // //             />

// // //             <input
// // //               name="brand"
// // //               placeholder="Brand *"
// // //               value={form.brand}
// // //               onChange={handleChange}
// // //               className="input"
// // //             />
// // //           </div>

// // //           <div className="grid md:grid-cols-3 gap-6">
// // //             <input
// // //               name="price"
// // //               placeholder="Price *"
// // //               value={form.price}
// // //               onChange={handleChange}
// // //               className="input"
// // //             />

// // //             <input
// // //               name="year"
// // //               placeholder="Year *"
// // //               value={form.year}
// // //               onChange={handleChange}
// // //               className="input"
// // //             />

// // //             <input
// // //               name="mileage"
// // //               placeholder="Mileage"
// // //               value={form.mileage}
// // //               onChange={handleChange}
// // //               className="input"
// // //             />
// // //           </div>

// // //           <div className="grid md:grid-cols-3 gap-6">
// // //             <select
// // //               name="category"
// // //               value={form.category}
// // //               onChange={handleChange}
// // //               className="input"
// // //             >
// // //               <option>Sedan</option>
// // //               <option>SUV</option>
// // //               <option>Pickup</option>
// // //               <option>Hatchback</option>
// // //               <option>Van</option>
// // //             </select>

// // //             <select
// // //               name="fuelType"
// // //               value={form.fuelType}
// // //               onChange={handleChange}
// // //               className="input"
// // //             >
// // //               <option>Petrol</option>
// // //               <option>Diesel</option>
// // //               <option>Hybrid</option>
// // //               <option>Electric</option>
// // //             </select>

// // //             <select
// // //               name="transmission"
// // //               value={form.transmission}
// // //               onChange={handleChange}
// // //               className="input"
// // //             >
// // //               <option>Automatic</option>
// // //               <option>Manual</option>
// // //             </select>
// // //           </div>

// // //           <select
// // //             name="status"
// // //             value={form.status}
// // //             onChange={handleChange}
// // //             className="input"
// // //           >
// // //             <option>Available</option>
// // //             <option>Sold</option>
// // //           </select>

// // //           <textarea
// // //             name="description"
// // //             placeholder="Car description..."
// // //             value={form.description}
// // //             onChange={handleChange}
// // //             rows={4}
// // //             className="input"
// // //           />

// // //           <div className="border-2 border-dashed rounded-xl p-8 text-center">
// // //             <label className="cursor-pointer flex flex-col items-center gap-2">
// // //               {uploading ? (
// // //                 <>
// // //                   <Loader2 className="animate-spin" />
// // //                   Uploading...
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <UploadCloud size={40} />
// // //                   Upload Images
// // //                 </>
// // //               )}

// // //               <input
// // //                 type="file"
// // //                 multiple
// // //                 onChange={handleUpload}
// // //                 className="hidden"
// // //               />
// // //             </label>
// // //           </div>

// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //             {form.images.map((img, index) => {
// // //               const isThumbnail = index === 0;

// // //               return (
// // //                 <div
// // //                   key={img.public_id}
// // //                   onClick={() => setThumbnail(img)}
// // //                   className={`relative cursor-pointer rounded-xl overflow-hidden ${
// // //                     isThumbnail ? "ring-4 ring-blue-500" : "hover:ring-2"
// // //                   }`}
// // //                 >
// // //                   <Image
// // //                     src={img.url}
// // //                     alt="car"
// // //                     width={300}
// // //                     height={200}
// // //                     className="object-cover w-full h-32"
// // //                   />

// // //                   {isThumbnail && (
// // //                     <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
// // //                       Thumbnail
// // //                     </span>
// // //                   )}

// // //                   <button
// // //                     type="button"
// // //                     onClick={(e) => {
// // //                       e.stopPropagation();
// // //                       deleteImage(img);
// // //                     }}
// // //                     className="absolute top-2 right-2 bg-white p-1 rounded-full"
// // //                   >
// // //                     <X size={16} />
// // //                   </button>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             disabled={!isFormValid || saving}
// // //             className={`w-full py-3 rounded-xl font-semibold ${
// // //               !isFormValid
// // //                 ? "bg-gray-300"
// // //                 : "bg-red-500 text-white hover:bg-red-600"
// // //             }`}
// // //           >
// // //             {saving ? "Creating..." : "Create Car"}
// // //           </button>
// // //         </form>
// // //       </div>

// // //       <style jsx>{`
// // //         .input {
// // //           width: 100%;
// // //           padding: 12px;
// // //           border-radius: 10px;
// // //           border: 1px solid #e5e7eb;
// // //         }

// // //         .input:focus {
// // //           outline: none;
// // //           border-color: #ef4444;
// // //         }
// // //       `}</style>
// // //     </main>
// // //   );
// // // }

// // // "use client";

// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import Image from "next/image";
// // // import { UploadCloud, Loader2, X } from "lucide-react";

// // // export default function CreateCarPage() {
// // //   const router = useRouter();

// // //   const [uploading, setUploading] = useState(false);
// // //   const [saving, setSaving] = useState(false);

// // //   const [toast, setToast] = useState({
// // //     show: false,
// // //     message: "",
// // //     type: "success",
// // //   });

// // //   const showToast = (message, type = "success") => {
// // //     setToast({ show: true, message, type });

// // //     setTimeout(() => {
// // //       setToast({ show: false, message: "", type: "success" });
// // //     }, 4000);
// // //   };

// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     brand: "",
// // //     category: "Sedan",
// // //     price: "",
// // //     year: "",
// // //     fuelType: "Petrol",
// // //     transmission: "Automatic",
// // //     mileage: "",
// // //     status: "Available",
// // //     description: "",
// // //     images: [],
// // //   });

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;

// // //     if (name === "price") {
// // //       const raw = value.replace(/,/g, "");
// // //       if (!raw) return setForm({ ...form, price: "" });

// // //       setForm({
// // //         ...form,
// // //         price: Number(raw).toLocaleString(),
// // //       });

// // //       return;
// // //     }

// // //     setForm({
// // //       ...form,
// // //       [name]: value,
// // //     });
// // //   };

// // //   const isFormValid =
// // //     form.name &&
// // //     form.brand &&
// // //     form.price &&
// // //     form.year &&
// // //     form.images.length > 0;

// // //   /* ================= IMAGE UPLOAD ================= */

// // //   const handleUpload = async (e) => {
// // //     try {
// // //       const files = Array.from(e.target.files || []);

// // //       if (!files.length) {
// // //         showToast("No files selected", "error");
// // //         return;
// // //       }

// // //       setUploading(true);

// // //       const formData = new FormData();
// // //       files.forEach((file) => formData.append("files", file));

// // //       const res = await fetch("/admin/upload", {
// // //         method: "POST",
// // //         body: formData,
// // //       });

// // //       if (!res.ok) {
// // //         throw new Error(`Upload failed (${res.status})`);
// // //       }

// // //       const data = await res.json();

// // //       if (!data?.urls) {
// // //         throw new Error("No images returned from server");
// // //       }

// // //       setForm((prev) => ({
// // //         ...prev,
// // //         images: [...prev.images, ...data.urls],
// // //       }));

// // //       showToast("Images uploaded successfully");
// // //     } catch (err) {
// // //       showToast(err.message || "Image upload failed", "error");
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // //   const setThumbnail = (img) => {
// // //     setForm((prev) => {
// // //       const rest = prev.images.filter((i) => i.public_id !== img.public_id);
// // //       return {
// // //         ...prev,
// // //         images: [img, ...rest],
// // //       };
// // //     });
// // //   };

// // //   const deleteImage = (img) => {
// // //     setForm((prev) => ({
// // //       ...prev,
// // //       images: prev.images.filter((i) => i.public_id !== img.public_id),
// // //     }));

// // //     showToast("Image removed");
// // //   };

// // //   /* ================= SUBMIT (FIXED ERROR HANDLING) ================= */

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     if (!isFormValid) {
// // //       showToast("Please fill all required fields", "error");
// // //       return;
// // //     }

// // //     setSaving(true);

// // //     try {
// // //       const res = await fetch("/api/admin/cars", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           ...form,
// // //           price: Number(form.price.replace(/,/g, "")),
// // //           year: Number(form.year),
// // //           mileage: Number(form.mileage || 0),
// // //         }),
// // //       });

// // //       const data = await res.json();

// // //       if (!res.ok || !data?.success) {
// // //         // ================= HANDLE BACKEND ERRORS =================

// // //         if (data?.errors && typeof data.errors === "object") {
// // //           const errorMessage = Object.values(data.errors).join("\n");
// // //           throw new Error(errorMessage);
// // //         }

// // //         throw new Error(data?.error || "Failed to create car");
// // //       }

// // //       showToast("🚗 Car created successfully!");

// // //       setTimeout(() => {
// // //         router.push("/admin/cars");
// // //       }, 1200);
// // //     } catch (err) {
// // //       showToast(err.message || "Something went wrong", "error");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   return (
// // //     <main className="min-h-screen bg-gray-100 p-6 relative">
// // //       {/* TOAST */}
// // //       {toast.show && (
// // //         <div
// // //           className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white whitespace-pre-line ${
// // //             toast.type === "success" ? "bg-green-600" : "bg-red-600"
// // //           }`}
// // //         >
// // //           {toast.message}
// // //         </div>
// // //       )}

// // //       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-8">
// // //         <h1 className="text-3xl font-bold text-gray-800">Add New Car</h1>

// // //         <form onSubmit={handleSubmit} className="space-y-8 text-slate-600">
// // //           <div className="grid md:grid-cols-2 gap-6">
// // //             <input
// // //               name="name"
// // //               placeholder="Car Name *"
// // //               value={form.name}
// // //               onChange={handleChange}
// // //               className="input"
// // //             />

// // //             <input
// // //               name="brand"
// // //               placeholder="Brand *"
// // //               value={form.brand}
// // //               onChange={handleChange}
// // //               className="input"
// // //             />
// // //           </div>

// // //           <div className="grid md:grid-cols-3 gap-6">
// // //             <input
// // //               name="price"
// // //               placeholder="Price *"
// // //               value={form.price}
// // //               onChange={handleChange}
// // //               className="input"
// // //             />

// // //             <input
// // //               name="year"
// // //               placeholder="Year *"
// // //               value={form.year}
// // //               onChange={handleChange}
// // //               className="input"
// // //             />

// // //             <input
// // //               name="mileage"
// // //               placeholder="Mileage"
// // //               value={form.mileage}
// // //               onChange={handleChange}
// // //               className="input"
// // //             />
// // //           </div>

// // //           <select
// // //             name="category"
// // //             value={form.category}
// // //             onChange={handleChange}
// // //             className="input"
// // //           >
// // //             <option>Sedan</option>
// // //             <option>SUV</option>
// // //             <option>Pickup</option>
// // //             <option>Hatchback</option>
// // //             <option>Van</option>
// // //           </select>

// // //           <select
// // //             name="fuelType"
// // //             value={form.fuelType}
// // //             onChange={handleChange}
// // //             className="input"
// // //           >
// // //             <option>Petrol</option>
// // //             <option>Diesel</option>
// // //             <option>Hybrid</option>
// // //             <option>Electric</option>
// // //           </select>

// // //           <select
// // //             name="transmission"
// // //             value={form.transmission}
// // //             onChange={handleChange}
// // //             className="input"
// // //           >
// // //             <option>Automatic</option>
// // //             <option>Manual</option>
// // //           </select>

// // //           <select
// // //             name="status"
// // //             value={form.status}
// // //             onChange={handleChange}
// // //             className="input"
// // //           >
// // //             <option>Available</option>
// // //             <option>Sold</option>
// // //           </select>

// // //           <textarea
// // //             name="description"
// // //             placeholder="Car description..."
// // //             value={form.description}
// // //             onChange={handleChange}
// // //             rows={4}
// // //             className="input"
// // //           />

// // //           {/* UPLOAD */}
// // //           <div className="border-2 border-dashed rounded-xl p-8 text-center">
// // //             <label className="cursor-pointer flex flex-col items-center gap-2">
// // //               {uploading ? (
// // //                 <>
// // //                   <Loader2 className="animate-spin" />
// // //                   Uploading...
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <UploadCloud size={40} />
// // //                   Upload Images
// // //                 </>
// // //               )}

// // //               <input
// // //                 type="file"
// // //                 multiple
// // //                 onChange={handleUpload}
// // //                 className="hidden"
// // //               />
// // //             </label>
// // //           </div>

// // //           {/* IMAGES */}
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //             {form.images.map((img, index) => {
// // //               const isThumbnail = index === 0;

// // //               return (
// // //                 <div
// // //                   key={img.public_id}
// // //                   onClick={() => setThumbnail(img)}
// // //                   className={`relative cursor-pointer rounded-xl overflow-hidden ${
// // //                     isThumbnail ? "ring-4 ring-blue-500" : "hover:ring-2"
// // //                   }`}
// // //                 >
// // //                   <Image
// // //                     src={img.url}
// // //                     alt="car"
// // //                     width={300}
// // //                     height={200}
// // //                     className="object-cover w-full h-32"
// // //                   />

// // //                   <button
// // //                     type="button"
// // //                     onClick={(e) => {
// // //                       e.stopPropagation();
// // //                       deleteImage(img);
// // //                     }}
// // //                     className="absolute top-2 right-2 bg-white p-1 rounded-full"
// // //                   >
// // //                     <X size={16} />
// // //                   </button>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             disabled={!isFormValid || saving}
// // //             className={`w-full py-3 rounded-xl font-semibold ${
// // //               !isFormValid
// // //                 ? "bg-gray-300"
// // //                 : "bg-red-500 text-white hover:bg-red-600"
// // //             }`}
// // //           >
// // //             {saving ? "Creating..." : "Create Car"}
// // //           </button>
// // //         </form>
// // //       </div>

// // //       <style jsx>{`
// // //         .input {
// // //           width: 100%;
// // //           padding: 12px;
// // //           border-radius: 10px;
// // //           border: 1px solid #e5e7eb;
// // //         }

// // //         .input:focus {
// // //           outline: none;
// // //           border-color: #ef4444;
// // //         }
// // //       `}</style>
// // //     </main>
// // //   );
// // // }

// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import { UploadCloud, Loader2, X } from "lucide-react";

// // export default function CreateCarPage() {
// //   const router = useRouter();

// //   const [uploading, setUploading] = useState(false);
// //   const [saving, setSaving] = useState(false);

// //   const [toast, setToast] = useState({
// //     show: false,
// //     message: "",
// //     type: "success",
// //   });

// //   const [errors, setErrors] = useState({});

// //   const showToast = (message, type = "success") => {
// //     setToast({ show: true, message, type });

// //     setTimeout(() => {
// //       setToast({ show: false, message: "", type: "success" });
// //     }, 3000);
// //   };

// //   const [form, setForm] = useState({
// //     name: "",
// //     brand: "",
// //     category: "Sedan",
// //     price: "",
// //     year: "",
// //     fuelType: "Petrol",
// //     transmission: "Automatic",
// //     mileage: "",
// //     status: "Available",
// //     description: "",
// //     images: [],
// //   });

// //   // ================= INLINE ERROR HELPERS =================
// //   const setFieldError = (field, message) => {
// //     setErrors((prev) => ({ ...prev, [field]: message }));
// //   };

// //   const clearFieldError = (field) => {
// //     setErrors((prev) => {
// //       const copy = { ...prev };
// //       delete copy[field];
// //       return copy;
// //     });
// //   };

// //   // ================= SMART INPUT HANDLER =================
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     let newValue = value;

// //     // ===== PRICE FORMAT =====
// //     if (name === "price") {
// //       const raw = value.replace(/,/g, "");

// //       if (raw && isNaN(raw)) return;

// //       newValue = raw ? Number(raw).toLocaleString() : "";
// //     }

// //     // ===== MILEAGE FORMAT =====
// //     if (name === "mileage") {
// //       const raw = value.replace(/,/g, "");

// //       if (raw && isNaN(raw)) return;

// //       newValue = raw ? Number(raw).toLocaleString() : "";
// //     }

// //     setForm((prev) => ({
// //       ...prev,
// //       [name]: newValue,
// //     }));

// //     clearFieldError(name);
// //   };

// //   const isFormValid =
// //     form.name &&
// //     form.brand &&
// //     form.price &&
// //     form.year &&
// //     form.images.length > 0;

// //   // ================= VALIDATION =================
// //   const validateForm = () => {
// //     const newErrors = {};

// //     if (!form.name.trim()) newErrors.name = "Car name is required";
// //     if (!form.brand.trim()) newErrors.brand = "Brand is required";
// //     if (!form.price) newErrors.price = "Price is required";
// //     if (!form.year) newErrors.year = "Year is required";
// //     if (form.images.length === 0)
// //       newErrors.images = "At least one image required";

// //     setErrors(newErrors);

// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // ================= IMAGE UPLOAD =================
// //   const handleUpload = async (e) => {
// //     try {
// //       const files = Array.from(e.target.files || []);

// //       if (!files.length) {
// //         showToast("No files selected", "error");
// //         return;
// //       }

// //       setUploading(true);

// //       const formData = new FormData();
// //       files.forEach((file) => formData.append("files", file));

// //       const res = await fetch("/admin/upload", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       if (!res.ok) throw new Error("Upload failed");

// //       const data = await res.json();

// //       setForm((prev) => ({
// //         ...prev,
// //         images: [...prev.images, ...data.urls],
// //       }));

// //       showToast("Images uploaded");
// //     } catch (err) {
// //       showToast(err.message, "error");
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   const deleteImage = (img) => {
// //     setForm((prev) => ({
// //       ...prev,
// //       images: prev.images.filter((i) => i.public_id !== img.public_id),
// //     }));
// //   };

// //   // ================= SUBMIT =================
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!validateForm()) {
// //       showToast("Please fix form errors", "error");
// //       return;
// //     }

// //     setSaving(true);

// //     try {
// //       const res = await fetch("/api/admin/cars", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           ...form,
// //           price: Number(form.price.replace(/,/g, "")),
// //           year: Number(form.year),
// //           mileage: Number(form.mileage?.replace(/,/g, "") || 0),
// //         }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) throw new Error(data?.error || "Failed");

// //       showToast("Car created successfully");

// //       setTimeout(() => router.push("/admin/cars"), 1200);
// //     } catch (err) {
// //       showToast(err.message, "error");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   // ================= INPUT CLASS =================
// //   const inputClass = (field) =>
// //     `input ${errors[field] ? "border-red-500" : "border-gray-300"}`;

// //   return (
// //     <main className="min-h-screen bg-gray-100 p-6 relative">
// //       {/* TOAST */}
// //       {toast.show && (
// //         <div
// //           className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg text-white ${
// //             toast.type === "success" ? "bg-green-600" : "bg-red-600"
// //           }`}
// //         >
// //           {toast.message}
// //         </div>
// //       )}

// //       <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl space-y-6">
// //         <h1 className="text-3xl font-bold">Add New Car</h1>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* NAME + BRAND */}
// //           <div className="grid md:grid-cols-2 gap-4">
// //             <div>
// //               <input
// //                 name="name"
// //                 value={form.name}
// //                 onChange={handleChange}
// //                 placeholder="Car Name"
// //                 className={inputClass("name")}
// //               />
// //               {errors.name && (
// //                 <p className="text-red-500 text-sm">{errors.name}</p>
// //               )}
// //             </div>

// //             <div>
// //               <input
// //                 name="brand"
// //                 value={form.brand}
// //                 onChange={handleChange}
// //                 placeholder="Brand"
// //                 className={inputClass("brand")}
// //               />
// //               {errors.brand && (
// //                 <p className="text-red-500 text-sm">{errors.brand}</p>
// //               )}
// //             </div>
// //           </div>

// //           {/* PRICE + YEAR + MILEAGE */}
// //           <div className="grid md:grid-cols-3 gap-4">
// //             <div>
// //               <input
// //                 name="price"
// //                 value={form.price}
// //                 onChange={handleChange}
// //                 placeholder="Price"
// //                 className={inputClass("price")}
// //               />
// //               {errors.price && (
// //                 <p className="text-red-500 text-sm">{errors.price}</p>
// //               )}
// //             </div>

// //             <div>
// //               <input
// //                 name="year"
// //                 value={form.year}
// //                 onChange={handleChange}
// //                 placeholder="Year"
// //                 className={inputClass("year")}
// //               />
// //               {errors.year && (
// //                 <p className="text-red-500 text-sm">{errors.year}</p>
// //               )}
// //             </div>

// //             <input
// //               name="mileage"
// //               value={form.mileage}
// //               onChange={handleChange}
// //               placeholder="Mileage"
// //               className="input"
// //             />
// //           </div>

// //           {/* IMAGE ERROR */}
// //           {errors.images && (
// //             <p className="text-red-500 text-sm">{errors.images}</p>
// //           )}

// //           {/* SUBMIT */}
// //           <button
// //             type="submit"
// //             disabled={saving}
// //             className="w-full bg-red-500 text-white py-3 rounded-xl"
// //           >
// //             {saving ? "Creating..." : "Create Car"}
// //           </button>
// //         </form>
// //       </div>

// //       <style jsx>{`
// //         .input {
// //           width: 100%;
// //           padding: 12px;
// //           border-radius: 10px;
// //           border: 1px solid #ddd;
// //         }

// //         .input:focus {
// //           outline: none;
// //           border-color: #ef4444;
// //         }
// //       `}</style>
// //     </main>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { UploadCloud, Loader2, X } from "lucide-react";

// export default function CreateCarPage() {
//   const router = useRouter();

//   const [uploading, setUploading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const [toast, setToast] = useState({
//     show: false,
//     message: "",
//     type: "success",
//   });

//   const [errors, setErrors] = useState({});

//   const showToast = (message, type = "success") => {
//     setToast({ show: true, message, type });
//     setTimeout(() => {
//       setToast({ show: false, message: "", type: "success" });
//     }, 3000);
//   };

//   const [form, setForm] = useState({
//     name: "",
//     brand: "",
//     category: "Sedan",
//     price: "",
//     year: "",
//     fuelType: "Petrol",
//     transmission: "Automatic",
//     mileage: "",
//     status: "Available",
//     description: "",
//     images: [],
//   });

//   // ================= FORMAT HELPERS =================
//   const formatNumber = (value) => {
//     const raw = value.replace(/,/g, "");
//     if (!raw || isNaN(raw)) return "";
//     return Number(raw).toLocaleString();
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     let newValue = value;

//     if (name === "price" || name === "mileage" || name === "year") {
//       const raw = value.replace(/,/g, "");
//       if (raw && isNaN(raw)) return;
//       newValue = raw ? Number(raw).toLocaleString() : "";
//     }

//     setForm((prev) => ({
//       ...prev,
//       [name]: newValue,
//     }));

//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const validateForm = () => {
//     const err = {};

//     if (!form.name) err.name = "Car name required";
//     if (!form.brand) err.brand = "Brand required";
//     if (!form.price) err.price = "Price required";
//     if (!form.year) err.year = "Year required";
//     if (!form.images.length) err.images = "Add at least one image";

//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const inputClass = (field) =>
//     `input ${
//       errors[field]
//         ? "border-red-500 focus:border-red-500"
//         : "border-gray-200 focus:border-red-400"
//     }`;

//   // ================= IMAGE UPLOAD =================
//   const handleUpload = async (e) => {
//     const files = Array.from(e.target.files || []);
//     if (!files.length) return;

//     setUploading(true);

//     try {
//       const formData = new FormData();
//       files.forEach((f) => formData.append("files", f));

//       const res = await fetch("/admin/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data?.error || "Upload failed");

//       setForm((prev) => ({
//         ...prev,
//         images: [...prev.images, ...data.urls],
//       }));
//     } catch (err) {
//       showToast(err.message, "error");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const deleteImage = (img) => {
//     setForm((prev) => ({
//       ...prev,
//       images: prev.images.filter((i) => i.public_id !== img.public_id),
//     }));
//   };

//   const setThumbnail = (img) => {
//     setForm((prev) => {
//       const rest = prev.images.filter((i) => i.public_id !== img.public_id);
//       return { ...prev, images: [img, ...rest] };
//     });
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       showToast("Fix form errors", "error");
//       return;
//     }

//     setSaving(true);

//     try {
//       const res = await fetch("/api/admin/cars", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...form,
//           price: Number(form.price.replace(/,/g, "")),
//           year: Number(form.year.replace(/,/g, "")),
//           mileage: Number(form.mileage.replace(/,/g, "") || 0),
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data?.error || "Failed");

//       showToast("Car created successfully 🚗");

//       setTimeout(() => router.push("/admin/cars"), 1200);
//     } catch (err) {
//       showToast(err.message, "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ================= INPUT =================
//   const Input = ({ name, placeholder }) => (
//     <div>
//       <input
//         name={name}
//         value={form[name]}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className={inputClass(name)}
//       />
//       {errors[name] && (
//         <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
//       )}
//     </div>
//   );

//   return (
//     <main className="min-h-screen bg-gray-100 p-6">
//       {/* TOAST */}
//       {toast.show && (
//         <div
//           className={`fixed top-5 right-5 z-50 px-4 py-3 text-white rounded-lg ${
//             toast.type === "success" ? "bg-green-600" : "bg-red-600"
//           }`}
//         >
//           {toast.message}
//         </div>
//       )}

//       <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl space-y-6">
//         <h1 className="text-3xl font-bold">Add New Car</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* SAME UI INPUTS */}
//           <div className="grid md:grid-cols-2 gap-4">
//             <Input name="name" placeholder="Car Name" />
//             <Input name="brand" placeholder="Brand" />
//           </div>

//           <div className="grid md:grid-cols-3 gap-4">
//             <Input name="price" placeholder="Price" />
//             <Input name="year" placeholder="Year" />
//             <Input name="mileage" placeholder="Mileage" />
//           </div>

//           {/* SELECTS SAME STYLE */}
//           <div className="grid md:grid-cols-3 gap-4">
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="input"
//             >
//               <option>Sedan</option>
//               <option>SUV</option>
//               <option>Pickup</option>
//               <option>Hatchback</option>
//               <option>Van</option>
//             </select>

//             <select
//               name="fuelType"
//               value={form.fuelType}
//               onChange={handleChange}
//               className="input"
//             >
//               <option>Petrol</option>
//               <option>Diesel</option>
//               <option>Hybrid</option>
//               <option>Electric</option>
//             </select>

//             <select
//               name="transmission"
//               value={form.transmission}
//               onChange={handleChange}
//               className="input"
//             >
//               <option>Automatic</option>
//               <option>Manual</option>
//             </select>
//           </div>

//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="input h-28"
//           />

//           {errors.images && <p className="text-red-500">{errors.images}</p>}

//           {/* UPLOAD */}
//           <div className="border-2 border-dashed p-6 rounded-xl text-center">
//             <label className="cursor-pointer flex flex-col items-center gap-2">
//               {uploading ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 <UploadCloud />
//               )}
//               Upload Images
//               <input type="file" multiple hidden onChange={handleUpload} />
//             </label>
//           </div>

//           {/* IMAGES */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             {form.images.map((img, i) => (
//               <div
//                 key={img.public_id}
//                 className="relative cursor-pointer"
//                 onClick={() => setThumbnail(img)}
//               >
//                 <Image
//                   src={img.url}
//                   width={200}
//                   height={120}
//                   className="rounded-lg object-cover"
//                   alt="car"
//                 />

//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     deleteImage(img);
//                   }}
//                   className="absolute top-2 right-2 bg-white p-1 rounded"
//                 >
//                   <X size={14} />
//                 </button>

//                 {i === 0 && (
//                   <span className="absolute bottom-1 left-1 text-xs bg-blue-500 text-white px-2 rounded">
//                     Thumb
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>

//           <button
//             disabled={saving}
//             className="w-full bg-red-500 text-white py-3 rounded-xl"
//           >
//             {saving ? "Saving..." : "Create Car"}
//           </button>
//         </form>
//       </div>

//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 12px;
//           border-radius: 10px;
//           border: 1px solid #e5e7eb;
//           transition: 0.2s;
//         }

//         .input:focus {
//           outline: none;
//           border-color: #ef4444;
//         }
//       `}</style>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadCloud, Loader2, X } from "lucide-react";

export default function CreateCarPage() {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [errors, setErrors] = useState({});

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3500);
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

  // ================= VALIDATION =================
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Car name is required";
    if (!form.brand.trim()) newErrors.brand = "Brand is required";
    if (!form.category) newErrors.category = "Category is required";

    if (!form.price || isNaN(Number(form.price.replace(/,/g, "")))) {
      newErrors.price = "Valid price is required";
    }

    if (!form.year || isNaN(Number(form.year))) {
      newErrors.year = "Valid year is required";
    }

    if (!form.fuelType) newErrors.fuelType = "Fuel type is required";
    if (!form.transmission) newErrors.transmission = "Transmission required";

    if (form.images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({ ...prev, [name]: "" }));

    // PRICE FORMAT
    if (name === "price") {
      const raw = value.replace(/,/g, "");
      if (!raw) {
        setForm({ ...form, price: "" });
        return;
      }

      if (!isNaN(raw)) {
        setForm({ ...form, price: Number(raw).toLocaleString() });
      }
      return;
    }

    // MILEAGE FORMAT
    if (name === "mileage") {
      const raw = value.replace(/,/g, "");
      if (!raw) {
        setForm({ ...form, mileage: "" });
        return;
      }

      if (!isNaN(raw)) {
        setForm({ ...form, mileage: Number(raw).toLocaleString() });
      }
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const isFormValid =
    form.name.trim() &&
    form.brand.trim() &&
    form.category &&
    form.price &&
    !isNaN(Number(form.price.replace(/,/g, ""))) &&
    form.year &&
    !isNaN(Number(form.year)) &&
    form.fuelType &&
    form.transmission &&
    form.images.length > 0;

  // ================= IMAGE UPLOAD =================
  const handleUpload = async (e) => {
    try {
      const files = Array.from(e.target.files || []);

      if (!files.length) {
        showToast("No files selected", "error");
        return;
      }

      setUploading(true);

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const res = await fetch("/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...data.urls],
      }));

      showToast("Images uploaded successfully");
      setErrors((prev) => ({ ...prev, images: "" }));
    } catch (err) {
      showToast(err.message || "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const setThumbnail = (img) => {
    setForm((prev) => {
      const rest = prev.images.filter((i) => i.public_id !== img.public_id);
      return { ...prev, images: [img, ...rest] };
    });
  };

  const deleteImage = (img) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((i) => i.public_id !== img.public_id),
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      showToast("Please fix form errors", "error");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/admin/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price.replace(/,/g, "")),
          year: Number(form.year),
          mileage: Number(form.mileage?.replace(/,/g, "") || 0),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        const backendError = data?.error || "Failed to create car";
        throw new Error(backendError);
      }

      showToast("🚗 Car created successfully!");
      router.push("/admin/cars");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // ================= INPUT CLASS =================
  const inputClass = (field) =>
    `w-full p-3 rounded-lg border text-slate-600 ${
      errors[field] ? "border-red-500" : "border-gray-200"
    } focus:outline-none focus:border-red-500`;

  return (
    <main className="min-h-screen bg-gray-100 p-6 relative text-slate-600">
      {/* TOAST */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-8">
        <h1 className="text-3xl font-bold">Add New Car</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME + BRAND */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <input
                name="name"
                placeholder="Car Name"
                value={form.name}
                onChange={handleChange}
                className={inputClass("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                name="brand"
                placeholder="Brand"
                value={form.brand}
                onChange={handleChange}
                className={inputClass("brand")}
              />
              {errors.brand && (
                <p className="text-red-500 text-sm">{errors.brand}</p>
              )}
            </div>
          </div>

          {/* PRICE YEAR MILEAGE */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <input
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className={inputClass("price")}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            <div>
              <input
                name="year"
                placeholder="Year"
                value={form.year}
                onChange={handleChange}
                className={inputClass("year")}
              />
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year}</p>
              )}
            </div>

            <input
              name="mileage"
              placeholder="Mileage"
              value={form.mileage}
              onChange={handleChange}
              className={inputClass("mileage")}
            />
          </div>

          {/* SELECTS */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass("category")}
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
            className={inputClass("fuelType")}
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
            className={inputClass("transmission")}
          >
            <option>Automatic</option>
            <option>Manual</option>
          </select>

          {/* STATUS */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass("status")}
          >
            <option>Available</option>
            <option>Sold</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className={inputClass("description")}
          />

          {/* UPLOAD */}
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
              <input type="file" multiple onChange={handleUpload} hidden />
            </label>
            {errors.images && (
              <p className="text-red-500 text-sm mt-2">{errors.images}</p>
            )}
          </div>

          {/* IMAGES */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {form.images.map((img, i) => (
              <div
                key={img.public_id}
                className="relative rounded-xl overflow-hidden"
                onClick={() => setThumbnail(img)}
              >
                <Image
                  src={img.url}
                  alt="car"
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover"
                />

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
            ))}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!isFormValid || saving}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              !isFormValid || saving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {saving ? "Creating..." : "Create Car"}
          </button>
        </form>
      </div>
    </main>
  );
}
