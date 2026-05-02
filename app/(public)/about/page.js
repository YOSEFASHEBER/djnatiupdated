import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CarFront,
  BadgeDollarSign,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

/* ================= SEO METADATA ================= */

export const metadata = {
  title: "About DJ Nati Cars | Trusted Car Dealer in Addis Ababa",
  description:
    "Learn about DJ Nati Cars, a trusted car dealership in Addis Ababa, Ethiopia specializing in high-quality used vehicles, fair pricing, and reliable customer service.",
  keywords: [
    "DJ Nati Cars",
    "car dealer Addis Ababa",
    "used cars Ethiopia",
    "buy car Addis Ababa",
    "car dealership Ethiopia",
  ],
  openGraph: {
    title: "About DJ Nati Cars",
    description:
      "Discover the story behind DJ Nati Cars and our mission to provide trusted vehicles in Addis Ababa.",
    url: "https://djnaticars.com/about",
    type: "website",
  },
};

/* ================= FEATURES ================= */

const features = [
  {
    icon: CarFront,
    title: "Quality Used & New Cars",
    description:
      "Our inventory focuses mainly on carefully selected used vehicles, along with premium new arrivals for customers who want the latest models.",
  },
  {
    icon: BadgeDollarSign,
    title: "Fair Market Pricing",
    description:
      "We provide competitive pricing with honest value based on vehicle condition, quality, and market demand.",
  },
  {
    icon: ShieldCheck,
    title: "Inspected for Confidence",
    description:
      "Each vehicle is reviewed for quality, performance, and reliability so customers can buy with greater peace of mind.",
  },
  {
    icon: Users,
    title: "Relationship Driven",
    description:
      "We build long-term trust by guiding customers toward the right vehicle instead of simply making a quick sale.",
  },
];

/* ================= PAGE ================= */

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900 min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-red-50 to-white">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/40 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* TEXT */}
            <div className="space-y-6 sm:space-y-8">
              <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600">
                About DJ Nati Cars
              </span>

              <div className="space-y-5 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight">
                  Trusted Cars in Addis Ababa
                  <span className="block text-red-600">
                    Honest Deals at DJ Nati Cars
                  </span>
                </h1>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                  DJ Nati Cars specializes in high-quality used vehicles with
                  selected new car options for customers seeking reliability,
                  style, and value in Addis Ababa.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/cars"
                  aria-label="Browse available cars at DJ Nati Cars"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3 sm:py-4 text-white font-semibold hover:bg-red-700 transition"
                >
                  Browse Cars
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/contact"
                  aria-label="Contact DJ Nati Cars"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-3 sm:py-4 font-semibold hover:border-red-500 hover:text-red-500 transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="relative">
              <div className="absolute -inset-4 bg-red-200/40 blur-3xl rounded-full" />

              <div className="relative rounded-3xl overflow-hidden border shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dznmeumqb/image/upload/v1777468684/showroomimageweb_rimlik.png"
                  alt="DJ Nati Cars showroom in Addis Ababa Ethiopia"
                  width={900}
                  height={700}
                  priority
                  className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="py-12 sm:py-16 lg:py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* TEXT */}
            <div className="space-y-5 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Built on Trust and Smart Car Buying
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Buying a car is a major decision, especially when choosing from
                used vehicles. That is why DJ Nati Cars focuses on honesty,
                quality, and transparency in every transaction.
              </p>

              <p className="text-slate-500 leading-relaxed">
                Our mission is simple: help customers find reliable vehicles at
                fair prices while building long-term trust with every client.
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="rounded-2xl border p-5 shadow hover:border-red-300 transition"
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-slate-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* OWNER */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* IMAGE */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-red-100 blur-3xl rounded-full" />

              <div className="relative rounded-3xl overflow-hidden border shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dznmeumqb/image/upload/IMG_20260502_131137_650_a9ixgc.jpg"
                  alt="DJ Nati founder of DJ Nati Cars dealership"
                  width={800}
                  height={900}
                  loading="lazy"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600">
                <Sparkles className="w-4 h-4" />
                Meet The Founder
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                DJ Nati
              </h2>

              <p className="text-slate-600 leading-relaxed">
                DJ Nati founded the dealership with a passion for cars and a
                commitment to honest customer relationships.
              </p>

              <p className="text-slate-500 leading-relaxed">
                His vision is simple: provide reliable vehicles, fair pricing,
                and excellent customer experiences for every buyer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="rounded-3xl border bg-gradient-to-br from-white to-red-50 p-8 sm:p-12 shadow-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Ready to Find Your Next Car?
            </h2>

            <p className="text-slate-600 mb-6 sm:mb-8">
              Explore trusted vehicles available at DJ Nati Cars in Addis Ababa.
            </p>

            <Link
              href="/cars"
              aria-label="Explore cars inventory"
              className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 sm:px-8 sm:py-4 text-white font-semibold hover:bg-red-700 transition"
            >
              Explore Inventory
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
