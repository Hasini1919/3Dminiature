"use client";

import { useState } from "react";
import Image from "next/image";

interface FormInputs {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [inputs, setInputs] = useState<FormInputs>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ phone?: string }>({});

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((state) => ({ ...state, [e.target.name]: e.target.value }));

    if (e.target.name === "phone") {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(e.target.value)) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone number must be 10 digits long.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.phone.match(/^\d{10}$/)) {
      setErrors({ phone: "Invalid phone number. It must be 10 digits." });
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500"}/enquiry`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        setInputs({ name: "", email: "", phone: "", message: "" });
      })
      .catch(() => {
        setMessage("Failed to send enquiry. Please try again.");
      });
  };

  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-start justify-center gap-8 p-6">
      <div className="w-full lg:w-1/3 space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h5 className="text-lg font-semibold flex items-center gap-2">
            <Image src="/phone.svg" alt="Phone" width={30} height={30} />
            Call to Us
          </h5>
          <p className="text-gray-600">We are available 24/7, 7 days a week</p>
          <p className="font-bold">Phone: 076 183 8937</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h5 className="text-lg font-semibold flex items-center gap-2">
            <Image src="/email.svg" alt="Email" width={30} height={30} />
            Write to Us
          </h5>
          <p className="text-gray-600">
            Fill out our form and we will contact you within 24 hours
          </p>
          <p className="font-bold">Email: tt3dlens@gmail.com</p>
        </div>
      </div>

      <main className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold mb-6 text-center">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto space-y-4"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium">
              Name:
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              id="name"
              value={inputs.name ?? ""}
              className="border rounded px-3 py-2 w-full bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium">
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              value={inputs.email ?? ""}
              id="email"
              className="border rounded px-3 py-2 w-full bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-medium">
              Phone:
            </label>
            <input
              type="tel"
              name="phone"
              onChange={handleInput}
              value={inputs.phone ?? ""}
              id="phone"
              className={`border rounded px-3 py-2 w-full bg-gray-100  ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="font-medium">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              onChange={handleInput}
              value={inputs.message ?? ""}
              className="border rounded px-3 py-2 w-full bg-gray-100"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-1/3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Send message
          </button>
        </form>
        {message && (
          <p className="text-center text-red-500 text-sm mt-4">{message}</p>
        )}
      </main>
    </div>
  );
}
