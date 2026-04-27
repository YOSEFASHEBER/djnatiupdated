import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export const metadata = {
  title: "Contact DJ NATI Cars | Buy & Sell Cars in Addis Ababa",
  description:
    "Contact DJ NATI Cars in Addis Ababa, Ethiopia. Call, email, or message us to buy or sell cars. Visit our location or chat with us on WhatsApp.",
  keywords: [
    "DJ NATI Cars",
    "cars Addis Ababa",
    "buy car Ethiopia",
    "sell car Ethiopia",
    "car dealers Addis Ababa",
  ],
  openGraph: {
    title: "Contact DJ NATI Cars",
    description:
      "Reach DJ NATI Cars for trusted car buying and selling services in Addis Ababa.",
    url: "https://djnaticars.com/contact",
    siteName: "DJ NATI Cars",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-br from-white via-red-50 to-white min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600 mb-5">
            Get In Touch
          </span>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Contact DJ NATI Cars
          </h1>

          <p className="text-slate-600 text-lg leading-relaxed">
            Have questions about buying or selling a car in Addis Ababa? Our
            team at DJ NATI Cars is ready to help you choose the right vehicle
            with trusted service and quick support.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ContactInfo />
          <ContactForm />
        </section>

        {/* Map */}
        <section className="mt-20">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Visit Our Location
            </h2>
            <p className="text-slate-600">
              Visit DJ NATI Cars in Addis Ababa to explore available vehicles.
            </p>
          </div>

          <div className="rounded-4xl overflow-hidden border border-slate-200 shadow-2xl bg-white p-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1970.398136468009!2d38.762930252364!3d8.990885598605837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8500172f0487%3A0xeb84db9156f7faf0!2sDj%20Nati%20Car%20market!5e0!3m2!1sen!2sus!4v1777232184131!5m2!1sen!2sus"
              width="100%"
              height="450"
              className="rounded-3xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
