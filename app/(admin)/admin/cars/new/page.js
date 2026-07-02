// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { UploadCloud, Loader2, X } from "lucide-react";

// export default function CreateCarPage() {
//   const router = useRouter();

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
//     }, 3500);
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
//     images: [], // plain strings: ["/assets/cars/toyota-camry.jpg"]
//   });

//   // ================= IMAGE PICKER =================
//   const [availableImages, setAvailableImages] = useState([]);
//   const [showPicker, setShowPicker] = useState(false);
//   const [loadingImages, setLoadingImages] = useState(false);

//   const openPicker = async () => {
//     setLoadingImages(true);
//     setShowPicker(true);
//     try {
//       const res = await fetch("/api/upload"); // GET — reads public/assets/cars/
//       const data = await res.json();
//       setAvailableImages(data.images || []);
//     } catch (err) {
//       showToast("Failed to load images", "error");
//       setShowPicker(false);
//     } finally {
//       setLoadingImages(false);
//     }
//   };

//   const toggleImageSelection = (imgPath) => {
//     setForm((prev) => {
//       const already = prev.images.includes(imgPath);
//       const updated = already
//         ? prev.images.filter((i) => i !== imgPath)
//         : [...prev.images, imgPath];
//       setErrors((e) => ({ ...e, images: updated.length ? "" : e.images }));
//       return { ...prev, images: updated };
//     });
//   };

//   const setThumbnail = (img) => {
//     setForm((prev) => ({
//       ...prev,
//       images: [img, ...prev.images.filter((i) => i !== img)],
//     }));
//   };

//   const deleteImage = (img) => {
//     setForm((prev) => ({
//       ...prev,
//       images: prev.images.filter((i) => i !== img),
//     }));
//   };

//   // ================= VALIDATION =================
//   const validate = () => {
//     const newErrors = {};

//     if (!form.name.trim()) newErrors.name = "Car name is required";
//     if (!form.brand.trim()) newErrors.brand = "Brand is required";
//     if (!form.category) newErrors.category = "Category is required";

//     if (!form.price || isNaN(Number(form.price.replace(/,/g, "")))) {
//       newErrors.price = "Valid price is required";
//     }

//     if (!form.year || isNaN(Number(form.year))) {
//       newErrors.year = "Valid year is required";
//     }

//     if (!form.fuelType) newErrors.fuelType = "Fuel type is required";
//     if (!form.transmission) newErrors.transmission = "Transmission required";

//     if (form.images.length === 0) {
//       newErrors.images = "At least one image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setErrors((prev) => ({ ...prev, [name]: "" }));

//     if (name === "price") {
//       const raw = value.replace(/,/g, "");
//       if (!raw) {
//         setForm({ ...form, price: "" });
//         return;
//       }
//       if (!isNaN(raw)) {
//         setForm({ ...form, price: Number(raw).toLocaleString() });
//       }
//       return;
//     }

//     if (name === "mileage") {
//       const raw = value.replace(/,/g, "");
//       if (!raw) {
//         setForm({ ...form, mileage: "" });
//         return;
//       }
//       if (!isNaN(raw)) {
//         setForm({ ...form, mileage: Number(raw).toLocaleString() });
//       }
//       return;
//     }

//     setForm({ ...form, [name]: value });
//   };

//   const isFormValid =
//     form.name.trim() &&
//     form.brand.trim() &&
//     form.category &&
//     form.price &&
//     !isNaN(Number(form.price.replace(/,/g, ""))) &&
//     form.year &&
//     !isNaN(Number(form.year)) &&
//     form.fuelType &&
//     form.transmission &&
//     form.images.length > 0;

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) {
//       showToast("Please fix form errors", "error");
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
//           year: Number(form.year),
//           mileage: Number(form.mileage?.replace(/,/g, "") || 0),
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data?.success) {
//         throw new Error(data?.error || "Failed to create car");
//       }

//       showToast("🚗 Car created successfully!");
//       router.push("/admin/cars");
//     } catch (err) {
//       showToast(err.message, "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ================= INPUT CLASS =================
//   const inputClass = (field) =>
//     `w-full p-3 rounded-lg border text-slate-600 ${
//       errors[field] ? "border-red-500" : "border-gray-200"
//     } focus:outline-none focus:border-red-500`;

//   return (
//     <main className="min-h-screen bg-gray-100 p-6 relative text-slate-600">
//       {/* TOAST */}
//       {toast.show && (
//         <div
//           className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white ${
//             toast.type === "success" ? "bg-green-600" : "bg-red-600"
//           }`}
//         >
//           {toast.message}
//         </div>
//       )}

//       {/* IMAGE PICKER MODAL */}
//       {showPicker && (
//         <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Pick Images from Assets
//               </h2>
//               <button
//                 type="button"
//                 onClick={() => setShowPicker(false)}
//                 className="text-gray-500 hover:text-gray-800 text-xl font-bold"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="overflow-y-auto p-4 grid grid-cols-3 gap-3">
//               {loadingImages ? (
//                 <div className="col-span-3 flex justify-center py-10">
//                   <Loader2 className="animate-spin text-gray-400" size={32} />
//                 </div>
//               ) : availableImages.length === 0 ? (
//                 <p className="col-span-3 text-center text-gray-500 py-8">
//                   No images found in{" "}
//                   <code className="bg-gray-100 px-1 rounded">
//                     /public/assets/cars/
//                   </code>
//                   .<br />
//                   Push images to GitHub first.
//                 </p>
//               ) : (
//                 availableImages.map((imgPath) => {
//                   const selected = form.images.includes(imgPath);
//                   return (
//                     <div
//                       key={imgPath}
//                       onClick={() => toggleImageSelection(imgPath)}
//                       className={`relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
//                         selected
//                           ? "border-blue-500"
//                           : "border-transparent hover:border-gray-300"
//                       }`}
//                     >
//                       <Image
//                         src={imgPath}
//                         width={200}
//                         height={120}
//                         alt={imgPath}
//                         className="object-cover w-full h-28"
//                       />
//                       {selected && (
//                         <span className="absolute top-1 right-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
//                           ✓
//                         </span>
//                       )}
//                       <p className="text-xs text-gray-500 truncate px-1 py-1">
//                         {imgPath.split("/").pop()}
//                       </p>
//                     </div>
//                   );
//                 })
//               )}
//             </div>

//             <div className="p-4 border-t flex items-center justify-between">
//               <p className="text-sm text-gray-500">
//                 {form.images.length} image
//                 {form.images.length !== 1 ? "s" : ""} selected
//               </p>
//               <button
//                 type="button"
//                 onClick={() => setShowPicker(false)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-8">
//         <h1 className="text-3xl font-bold">Add New Car</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* NAME + BRAND */}
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <input
//                 name="name"
//                 placeholder="Car Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className={inputClass("name")}
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-sm">{errors.name}</p>
//               )}
//             </div>
//             <div>
//               <input
//                 name="brand"
//                 placeholder="Brand"
//                 value={form.brand}
//                 onChange={handleChange}
//                 className={inputClass("brand")}
//               />
//               {errors.brand && (
//                 <p className="text-red-500 text-sm">{errors.brand}</p>
//               )}
//             </div>
//           </div>

//           {/* PRICE YEAR MILEAGE */}
//           <div className="grid md:grid-cols-3 gap-6">
//             <div>
//               <input
//                 name="price"
//                 placeholder="Price"
//                 value={form.price}
//                 onChange={handleChange}
//                 className={inputClass("price")}
//               />
//               {errors.price && (
//                 <p className="text-red-500 text-sm">{errors.price}</p>
//               )}
//             </div>
//             <div>
//               <input
//                 name="year"
//                 placeholder="Year"
//                 value={form.year}
//                 onChange={handleChange}
//                 className={inputClass("year")}
//               />
//               {errors.year && (
//                 <p className="text-red-500 text-sm">{errors.year}</p>
//               )}
//             </div>
//             <input
//               name="mileage"
//               placeholder="Mileage"
//               value={form.mileage}
//               onChange={handleChange}
//               className={inputClass("mileage")}
//             />
//           </div>

//           {/* SELECTS */}
//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             className={inputClass("category")}
//           >
//             <option>Sedan</option>
//             <option>SUV</option>
//             <option>Pick-up</option>
//             <option>Hatchback</option>
//             <option>Van</option>
//             <option>Crossover</option>
//             <option>Off-roader</option>
//             <option>Coupe</option>
//           </select>

//           <select
//             name="fuelType"
//             value={form.fuelType}
//             onChange={handleChange}
//             className={inputClass("fuelType")}
//           >
//             <option>Petrol</option>
//             <option>Diesel</option>
//             <option>Hybrid</option>
//             <option>Electric</option>
//           </select>

//           <select
//             name="transmission"
//             value={form.transmission}
//             onChange={handleChange}
//             className={inputClass("transmission")}
//           >
//             <option>Automatic</option>
//             <option>Manual</option>
//           </select>

//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className={inputClass("status")}
//           >
//             <option>Available</option>
//             <option>Sold</option>
//           </select>

//           {/* DESCRIPTION */}
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={form.description}
//             onChange={handleChange}
//             rows={4}
//             className={inputClass("description")}
//           />

//           {/* IMAGE PICKER TRIGGER */}
//           <div className="border-2 border-dashed rounded-xl p-8 text-center">
//             <button
//               type="button"
//               onClick={openPicker}
//               className="cursor-pointer flex flex-col items-center gap-2 w-full"
//             >
//               <UploadCloud size={40} className="text-gray-400" />
//               <span className="text-gray-600 font-medium">
//                 Click to pick images from assets
//               </span>
//               <span className="text-gray-400 text-sm">
//                 Images must be in{" "}
//                 <code className="bg-gray-100 px-1 rounded">
//                   public/assets/cars/
//                 </code>{" "}
//                 — push via Git first
//               </span>
//             </button>
//             {errors.images && (
//               <p className="text-red-500 text-sm mt-2">{errors.images}</p>
//             )}
//           </div>

//           {/* SELECTED IMAGES PREVIEW */}
//           {form.images.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {form.images.map((img, i) => (
//                 <div
//                   key={img}
//                   className={`relative rounded-xl overflow-hidden cursor-pointer ${
//                     i === 0
//                       ? "ring-4 ring-blue-500"
//                       : "hover:ring-2 hover:ring-gray-300"
//                   }`}
//                   onClick={() => setThumbnail(img)}
//                 >
//                   <Image
//                     src={img}
//                     alt="car"
//                     width={300}
//                     height={200}
//                     className="w-full h-32 object-cover"
//                   />
//                   {i === 0 && (
//                     <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
//                       Thumbnail
//                     </span>
//                   )}
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       deleteImage(img);
//                     }}
//                     className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* SUBMIT */}
//           <button
//             type="submit"
//             disabled={!isFormValid || saving}
//             className={`w-full py-3 rounded-xl font-semibold transition ${
//               !isFormValid || saving
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-red-500 text-white hover:bg-red-600"
//             }`}
//           >
//             {saving ? "Creating..." : "Create Car"}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  UploadCloud,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const IMAGES_PER_PAGE = 6; // 2 rows × 3 cols — full image visible, easy to browse

export default function CreateCarPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [errors, setErrors] = useState({});

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3500,
    );
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

  // ================= IMAGE PICKER =================
  const [availableImages, setAvailableImages] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [pickerPage, setPickerPage] = useState(1);

  const totalPages = Math.ceil(availableImages.length / IMAGES_PER_PAGE);
  const pagedImages = availableImages.slice(
    (pickerPage - 1) * IMAGES_PER_PAGE,
    pickerPage * IMAGES_PER_PAGE,
  );

  const openPicker = async () => {
    setLoadingImages(true);
    setShowPicker(true);
    setPickerPage(1);
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
      const already = prev.images.includes(imgPath);
      const updated = already
        ? prev.images.filter((i) => i !== imgPath)
        : [...prev.images, imgPath];
      setErrors((e) => ({ ...e, images: updated.length ? "" : e.images }));
      return { ...prev, images: updated };
    });
  };

  const setThumbnail = (img) => {
    setForm((prev) => ({
      ...prev,
      images: [img, ...prev.images.filter((i) => i !== img)],
    }));
  };

  const deleteImage = (img) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((i) => i !== img),
    }));
  };

  // ================= VALIDATION =================
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Car name is required";
    if (!form.brand.trim()) newErrors.brand = "Brand is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.price || isNaN(Number(form.price.replace(/,/g, ""))))
      newErrors.price = "Valid price is required";
    if (!form.year || isNaN(Number(form.year)))
      newErrors.year = "Valid year is required";
    if (!form.fuelType) newErrors.fuelType = "Fuel type is required";
    if (!form.transmission) newErrors.transmission = "Transmission required";
    if (form.images.length === 0)
      newErrors.images = "At least one image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "price" || name === "mileage") {
      const raw = value.replace(/,/g, "");
      if (!raw) {
        setForm({ ...form, [name]: "" });
        return;
      }
      if (!isNaN(raw))
        setForm({ ...form, [name]: Number(raw).toLocaleString() });
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
      if (!res.ok || !data?.success)
        throw new Error(data?.error || "Failed to create car");
      showToast("🚗 Car created successfully!");
      router.push("/admin/cars");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

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

      {/* IMAGE PICKER MODAL */}
      {showPicker && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col"
            style={{ maxHeight: "85vh" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b shrink-0">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Pick Images
                </h2>
                {availableImages.length > 0 && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {availableImages.length} image
                    {availableImages.length !== 1 ? "s" : ""} available
                    {form.images.length > 0 &&
                      ` · ${form.images.length} selected`}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowPicker(false)}
                className="text-gray-400 hover:text-gray-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Grid — fixed height so images are fully visible */}
            <div
              className="p-4 overflow-y-auto shrink-0"
              style={{ height: "380px" }}
            >
              {loadingImages ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="animate-spin text-gray-400" size={32} />
                </div>
              ) : availableImages.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full text-center text-gray-500 gap-2">
                  <UploadCloud size={36} className="text-gray-300" />
                  <p>
                    No images found in{" "}
                    <code className="bg-gray-100 px-1 rounded">
                      /public/assets/cars/
                    </code>
                  </p>
                  <p className="text-sm text-gray-400">
                    Push images to GitHub first.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {pagedImages.map((imgPath) => {
                    const selected = form.images.includes(imgPath);
                    const isThumb = form.images[0] === imgPath;
                    return (
                      <div
                        key={imgPath}
                        onClick={() => toggleImageSelection(imgPath)}
                        className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                          selected
                            ? "border-blue-500 shadow-md"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        {/* Fixed-height image — always fully visible */}
                        <div
                          className="relative w-full"
                          style={{ height: "110px" }}
                        >
                          <Image
                            src={imgPath}
                            fill
                            alt={imgPath.split("/").pop()}
                            className="object-cover"
                            sizes="200px"
                          />
                        </div>

                        {/* Badges */}
                        {selected && (
                          <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow">
                            ✓
                          </span>
                        )}
                        {isThumb && (
                          <span className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded font-medium shadow">
                            Thumb
                          </span>
                        )}

                        {/* Filename */}
                        <p className="text-xs text-gray-500 truncate px-2 py-1 bg-white">
                          {imgPath.split("/").pop()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 px-4 py-3 border-t shrink-0">
                <button
                  type="button"
                  onClick={() => setPickerPage((p) => Math.max(1, p - 1))}
                  disabled={pickerPage === 1}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page number pills */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setPickerPage(page)}
                        className={`w-7 h-7 rounded-lg text-sm font-medium transition ${
                          page === pickerPage
                            ? "bg-red-500 text-white"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setPickerPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={pickerPage === totalPages}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="p-4 border-t flex items-center justify-between shrink-0">
              <p className="text-sm text-gray-500">
                {form.images.length} image{form.images.length !== 1 ? "s" : ""}{" "}
                selected
              </p>
              <button
                type="button"
                onClick={() => setShowPicker(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MAIN FORM ================= */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-8">
        <h1 className="text-3xl font-bold">Add New Car</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass("category")}
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

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass("status")}
          >
            <option>Available</option>
            <option>Sold</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className={inputClass("description")}
          />

          {/* IMAGE PICKER TRIGGER */}
          <div className="border-2 border-dashed rounded-xl p-8 text-center">
            <button
              type="button"
              onClick={openPicker}
              className="cursor-pointer flex flex-col items-center gap-2 w-full"
            >
              <UploadCloud size={40} className="text-gray-400" />
              <span className="text-gray-600 font-medium">
                Click to pick images from assets
              </span>
              <span className="text-gray-400 text-sm">
                Images must be in{" "}
                <code className="bg-gray-100 px-1 rounded">
                  public/assets/cars/
                </code>{" "}
                — push via Git first
              </span>
            </button>
            {errors.images && (
              <p className="text-red-500 text-sm mt-2">{errors.images}</p>
            )}
          </div>

          {/* SELECTED IMAGES PREVIEW */}
          {form.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {form.images.map((img, i) => (
                <div
                  key={img}
                  className={`relative rounded-xl overflow-hidden cursor-pointer ${
                    i === 0
                      ? "ring-4 ring-blue-500"
                      : "hover:ring-2 hover:ring-gray-300"
                  }`}
                  onClick={() => setThumbnail(img)}
                >
                  <Image
                    src={img}
                    alt="car"
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                      Thumbnail
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteImage(img);
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

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
