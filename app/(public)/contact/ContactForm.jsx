"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};

    if (!formData.name) errs.name = "Name is required";
    if (!formData.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email";

    if (!formData.message) errs.message = "Message is required";

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSuccess(true);

    console.log(formData);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-white shadow-2xl rounded-[2rem] border border-slate-200 p-8 sm:p-10">
      {success && (
        <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 font-semibold">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-slate-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-slate-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            Message
          </label>

          <textarea
            placeholder="Tell us how we can help you"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full border border-slate-300 rounded-2xl px-4 py-3 h-36 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none resize-none"
          />

          {errors.message && (
            <p className="text-red-500 text-sm mt-2">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-red-200"
        >
          <Send className="w-5 h-5" />
          Send Message
        </button>
      </form>
    </div>
  );
}
