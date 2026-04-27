import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactInfo() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      value: "Addis Ababa, Ethiopia",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+251 923708473",
    },
    {
      icon: Mail,
      title: "Email",
      value: "djnaticars@gmail.com",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Mon - Sat: 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-5">
        {contactInfo.map((item, index) => {
          const Icon = item.icon;

          return (
            <article
              key={index}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:border-red-300 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-red-600" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>

              <p className="text-slate-600">{item.value}</p>
            </article>
          );
        })}
      </div>

      <a
        href="https://wa.me/251923708473"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-7 rounded-2xl transition-all shadow-lg"
      >
        <MessageCircle className="w-5 h-5" />
        Chat on WhatsApp
      </a>
    </div>
  );
}
