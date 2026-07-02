"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const IMAGES_PER_PAGE = 12;

export default function ImagePickerModal({
  open,
  onClose,
  availableImages,
  loading,
  selectedImages,
  onToggle,
}) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (open) {
      setPage(1);
    }
  }, [open]);

  const totalPages = Math.max(
    1,
    Math.ceil(availableImages.length / IMAGES_PER_PAGE),
  );

  const currentImages = useMemo(() => {
    const start = (page - 1) * IMAGES_PER_PAGE;
    return availableImages.slice(start, start + IMAGES_PER_PAGE);
  }, [availableImages, page]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Pick Images from Assets
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Images */}
        <div className="overflow-y-auto p-4 flex-1">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
          ) : availableImages.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No images found in{" "}
              <code className="bg-gray-100 px-1 rounded">
                /public/assets/cars/
              </code>
            </p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3">
                {currentImages.map((imgPath) => {
                  const selected = selectedImages.includes(imgPath);

                  return (
                    <div
                      key={imgPath}
                      onClick={() => onToggle(imgPath)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
                        selected
                          ? "border-blue-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={imgPath}
                        alt={imgPath}
                        width={200}
                        height={120}
                        className="w-full h-28 object-cover"
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
                })}
              </div>

              {/* Pagination */}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-2 rounded border disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded ${
                        page === i + 1 ? "bg-red-500 text-white" : "border"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-2 rounded border disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}

        <div className="p-4 border-t flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {selectedImages.length} image
            {selectedImages.length !== 1 ? "s" : ""} selected
          </p>

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
