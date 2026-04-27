// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight, X } from "lucide-react";

// export function CarImageGallery({ images = [], name = "car" }) {
//   const safeImages = useMemo(
//     () => images?.filter((img) => img?.url) || [],
//     [images],
//   );

//   const [index, setIndex] = useState(0);
//   const [fullscreen, setFullscreen] = useState(false);

//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);

//   const minSwipeDistance = 50;

//   const hasMultiple = safeImages.length > 1;
//   const currentImage = safeImages[index]?.url || "/placeholder.png";

//   // NAVIGATION
//   const prev = () => {
//     setIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1));
//   };

//   const next = () => {
//     setIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));
//   };

//   // TOUCH SWIPE
//   const onTouchStart = (e) => {
//     setTouchEnd(null);
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const onTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const onTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;

//     const distance = touchStart - touchEnd;

//     if (distance > minSwipeDistance) next();
//     if (distance < -minSwipeDistance) prev();
//   };

//   // KEYBOARD NAVIGATION
//   useEffect(() => {
//     if (!fullscreen) return;

//     const handleKey = (e) => {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//       if (e.key === "Escape") setFullscreen(false);
//     };

//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [fullscreen]);

//   // LOCK SCROLL
//   useEffect(() => {
//     document.body.style.overflow = fullscreen ? "hidden" : "auto";
//   }, [fullscreen]);

//   useEffect(() => {
//     setIndex(0);
//   }, [safeImages.length]);

//   return (
//     <>
//       {/* MAIN IMAGE */}
//       <div className="space-y-3">
//         <div
//           className="relative rounded-xl sm:rounded-2xl overflow-hidden border shadow-md bg-white cursor-zoom-in group"
//           onClick={() => safeImages.length && setFullscreen(true)}
//           onTouchStart={onTouchStart}
//           onTouchMove={onTouchMove}
//           onTouchEnd={onTouchEnd}
//         >
//           <Image
//             src={currentImage}
//             alt={`${name} main image`}
//             width={900}
//             height={600}
//             priority
//             quality={85}
//             sizes="(max-width:640px) 100vw, (max-width:1024px) 80vw, 900px"
//             className="w-full h-[240px] sm:h-[320px] md:h-[420px] object-cover transition-transform duration-300 group-hover:scale-105"
//           />

//           {hasMultiple && (
//             <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   prev();
//                 }}
//                 className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
//               >
//                 <ChevronLeft size={22} />
//               </button>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   next();
//                 }}
//                 className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
//               >
//                 <ChevronRight size={22} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* THUMBNAILS */}
//         {hasMultiple && (
//           <div>
//             <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-2">
//               More Photos
//             </p>

//             <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
//               {safeImages.map((img, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setIndex(i)}
//                   className={`relative flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden border-2 transition ${
//                     index === i
//                       ? "border-red-500 scale-105"
//                       : "border-slate-200 hover:border-slate-400"
//                   }`}
//                 >
//                   <Image
//                     src={img.url}
//                     alt={`${name} thumbnail ${i + 1}`}
//                     width={100}
//                     height={70}
//                     loading="lazy"
//                     quality={70}
//                     sizes="80px"
//                     className="w-[80px] h-[60px] sm:w-[100px] sm:h-[75px] md:w-[120px] md:h-[85px] object-cover"
//                   />

//                   {index === i && (
//                     <div className="absolute inset-0 bg-red-500/10" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* FULLSCREEN VIEW */}
//       {fullscreen && (
//         // LOCK BODY SCROLL + CONTROL NAVBAR
// useEffect(() => {
//   if (fullscreen) {
//     document.body.style.overflow = "hidden";
//     document.body.classList.add("fullscreen-gallery");
//   } else {
//     document.body.style.overflow = "auto";
//     document.body.classList.remove("fullscreen-gallery");
//   }

//   return () => {
//     document.body.style.overflow = "auto";
//     document.body.classList.remove("fullscreen-gallery");
//   };
// }, [fullscreen])
//         <div
//           className="fixed inset-0 bg-black/95 z-40 flex items-center justify-center"
//           onClick={() => setFullscreen(false)}
//         >
//           {/* CLOSE BUTTON */}
//           <button
//             onClick={() => setFullscreen(false)}
//             className="fixed top-6 right-6 z-50 bg-black/70 hover:bg-black text-white p-4 rounded-full backdrop-blur-lg transition"
//           >
//             <X size={28} />
//           </button>

//           {/* PREV */}
//           {hasMultiple && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 prev();
//               }}
//               className="absolute left-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full"
//             >
//               <ChevronLeft size={32} />
//             </button>
//           )}

//           {/* IMAGE */}
//           <div
//             className="relative max-w-[95vw] max-h-[90vh]"
//             onClick={(e) => e.stopPropagation()}
//             onTouchStart={onTouchStart}
//             onTouchMove={onTouchMove}
//             onTouchEnd={onTouchEnd}
//           >
//             <Image
//               src={currentImage}
//               alt={`${name} fullscreen image`}
//               width={1600}
//               height={1000}
//               priority
//               quality={95}
//               sizes="100vw"
//               className="max-h-[85vh] object-contain"
//             />
//           </div>

//           {/* NEXT */}
//           {hasMultiple && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 next();
//               }}
//               className="absolute right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full"
//             >
//               <ChevronRight size={32} />
//             </button>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function CarImageGallery({ images = [], name = "car" }) {
  const safeImages = useMemo(
    () => images?.filter((img) => img?.url) || [],
    [images],
  );

  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const hasMultiple = safeImages.length > 1;
  const currentImage = safeImages[index]?.url || "/placeholder.png";

  // ================= NAVIGATION =================
  const prev = () => {
    setIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));
  };

  // ================= TOUCH SWIPE =================
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
  };

  // ================= KEYBOARD NAVIGATION =================
  useEffect(() => {
    if (!fullscreen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setFullscreen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fullscreen]);

  // ================= LOCK BODY SCROLL + HIDE NAVBAR =================
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("fullscreen-gallery");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("fullscreen-gallery");
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("fullscreen-gallery");
    };
  }, [fullscreen]);

  useEffect(() => {
    setIndex(0);
  }, [safeImages.length]);

  return (
    <>
      {/* ================= MAIN IMAGE ================= */}
      <div className="space-y-3">
        <div
          className="relative rounded-xl sm:rounded-2xl overflow-hidden border shadow-md bg-white cursor-zoom-in group"
          onClick={() => safeImages.length && setFullscreen(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src={currentImage}
            alt={`${name} main image`}
            width={900}
            height={600}
            priority
            quality={85}
            sizes="(max-width:640px) 100vw, (max-width:1024px) 80vw, 900px"
            className="w-full h-[240px] sm:h-[320px] md:h-[420px] object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* NAV BUTTONS */}
          {hasMultiple && (
            <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          )}
        </div>

        {/* ================= THUMBNAILS ================= */}
        {hasMultiple && (
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-2">
              More Photos
            </p>

            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
              {safeImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`relative flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden border-2 transition ${
                    index === i
                      ? "border-red-500 scale-105"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`${name} thumbnail ${i + 1}`}
                    width={100}
                    height={70}
                    loading="lazy"
                    quality={70}
                    sizes="80px"
                    className="w-[80px] h-[60px] sm:w-[100px] sm:h-[75px] md:w-[120px] md:h-[85px] object-cover"
                  />

                  {index === i && (
                    <div className="absolute inset-0 bg-red-500/10" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= FULLSCREEN VIEW ================= */}
      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-40 flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setFullscreen(false)}
            className="fixed top-6 right-6 z-50 bg-black/70 hover:bg-black text-white p-4 rounded-full backdrop-blur-lg transition"
          >
            <X size={28} />
          </button>

          {/* PREV */}
          {hasMultiple && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* IMAGE */}
          <div
            className="relative max-w-[95vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={currentImage}
              alt={`${name} fullscreen image`}
              width={1600}
              height={1000}
              priority
              quality={95}
              sizes="100vw"
              className="max-h-[85vh] object-contain"
            />
          </div>

          {/* NEXT */}
          {hasMultiple && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
