// import { ArrowLeft, ArrowRight } from "lucide-react";

// export default function Pagination({ page, totalPages, updateParams }) {
//   return (
//     <div className="flex justify-center mt-12 gap-2 flex-wrap text-slate-950">
//       <button
//         onClick={() => updateParams({ page: Math.max(page - 1, 1) })}
//         className="px-3 py-2 bg-white border rounded-xl"
//       >
//         <ArrowLeft className="text-slate-800" />
//       </button>

//       {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
//         <button
//           key={num}
//           onClick={() => updateParams({ page: num })}
//           className={`px-3 py-2 border rounded-xl ${
//             page === num ? "bg-red-600 text-slate-600" : "bg-white"
//           }`}
//         >
//           {num}
//         </button>
//       ))}

//       <button
//         onClick={() => updateParams({ page: Math.min(page + 1, totalPages) })}
//         className="px-3 py-2 bg-white border rounded-xl "
//       >
//         <ArrowRight />
//       </button>
//     </div>
//   );
// }
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({ page, totalPages, updateParams }) {
  return (
    <div className="flex justify-center mt-12 gap-2 flex-wrap text-slate-950">
      {/* PREVIOUS */}
      <button
        onClick={() => updateParams({ page: Math.max(page - 1, 1) })}
        className="px-3 py-2 bg-white border rounded-xl text-slate-900 hover:bg-gray-100 transition"
      >
        <ArrowLeft className="text-slate-900" />
      </button>

      {/* PAGE NUMBERS */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => updateParams({ page: num })}
          className={`px-3 py-2 border rounded-xl transition ${
            page === num
              ? "bg-red-600 text-white"
              : "bg-white text-slate-900 hover:bg-gray-100"
          }`}
        >
          {num}
        </button>
      ))}

      {/* NEXT */}
      <button
        onClick={() => updateParams({ page: Math.min(page + 1, totalPages) })}
        className="px-3 py-2 bg-white border rounded-xl text-slate-900 hover:bg-gray-100 transition"
      >
        <ArrowRight className="text-slate-900" />
      </button>
    </div>
  );
}
