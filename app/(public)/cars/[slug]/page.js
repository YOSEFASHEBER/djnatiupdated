import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import slugify from "slugify";
import cloudinary from "@/lib/cloudinary";

// ================= GET CAR =================
export async function GET(req, context) {
  const params = await context.params;

  await connectDB();

  try {
    const car = await Car.findOne({ slug: params?.slug });

    if (!car) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    return Response.json({ success: true, data: car });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ================= UPDATE CAR (VALIDATION ADDED) =================
// export async function PUT(req, context) {
//   const params = await context.params;

//   await connectDB();

//   try {
//     const body = await req.json();

//     const car = await Car.findOne({ slug: params.slug });

//     if (!car) {
//       return Response.json({ error: "Car not found" }, { status: 404 });
//     }

//     // ================= VALIDATION =================
//     const errors = {};

//     if ("name" in body && !body.name?.trim()) {
//       errors.name = "Car name is required";
//     }

//     if ("brand" in body && !body.brand?.trim()) {
//       errors.brand = "Brand is required";
//     }

//     if ("price" in body) {
//       const price = Number(body.price);
//       if (!price || isNaN(price) || price <= 0) {
//         errors.price = "Price must be a valid number";
//       }
//     }

//     if ("year" in body) {
//       const year = Number(body.year);
//       if (!year || isNaN(year) || year < 1900) {
//         errors.year = "Year must be valid";
//       }
//     }

//     if ("fuelType" in body && !body.fuelType?.trim()) {
//       errors.fuelType = "Fuel type is required";
//     }

//     if ("transmission" in body && !body.transmission?.trim()) {
//       errors.transmission = "Transmission is required";
//     }

//     if (
//       "images" in body &&
//       (!Array.isArray(body.images) || body.images.length === 0)
//     ) {
//       errors.images = "At least one image is required";
//     }

//     // ❌ STOP if errors exist
//     if (Object.keys(errors).length > 0) {
//       return Response.json(
//         {
//           success: false,
//           errors,
//         },
//         { status: 400 },
//       );
//     }

//     // ================= UPDATE FIELDS =================
//     if (body.name) car.name = body.name;
//     if (body.brand) car.brand = body.brand;
//     if (body.year) car.year = Number(body.year);
//     if (body.price) car.price = Number(body.price);
//     if (body.description !== undefined) car.description = body.description;
//     if (body.status) car.status = body.status;
//     if (body.images) car.images = body.images;

//     // ================= SLUG =================
//     if (body.name || body.brand || body.year) {
//       const baseSlug = slugify(`${car.brand}-${car.name}-${car.year}`, {
//         lower: true,
//         strict: true,
//       });

//       car.slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
//     }

//     await car.save();

//     return Response.json({ success: true, data: car });
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }
const updateCar = async () => {
  try {
    const res = await fetch(`/api/admin/cars/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    // ❌ HANDLE BACKEND VALIDATION ERRORS PROPERLY
    if (!res.ok || !data?.success) {
      if (data?.errors) {
        // show each field error in toast
        Object.values(data.errors).forEach((msg) => {
          showToast(msg, "error");
        });

        return; // stop execution
      }

      throw new Error(data?.error || "Update failed");
    }

    showToast("Car updated successfully");
  } catch (err) {
    showToast(err.message || "Something went wrong", "error");
  }
};
// ================= DELETE CAR =================
export async function DELETE(req, context) {
  const params = await context.params;

  await connectDB();

  try {
    const car = await Car.findOne({ slug: params.slug });

    if (!car) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    if (car.images?.length) {
      await Promise.all(
        car.images.map((img) => cloudinary.uploader.destroy(img.public_id)),
      );
    }

    await Car.deleteOne({ slug: params.slug });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
