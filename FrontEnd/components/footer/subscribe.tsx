"use client";

import { useState, useEffect } from "react";

interface FormInputs {
  email: string;
}

export default function Subscribe() {
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [inputs, setInputs] = useState<FormInputs>({
    email: "",
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const savedEmail = localStorage.getItem("tinytreasures_email") ?? "";
    if (savedEmail && savedEmail === inputs.email) {
      setMessage("You are already subscribed.");
      setSubscribed(true);
      return; // stop submitting again
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500"}/subscribe`,
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
        if (res.message.toLowerCase().includes("already")) {
          setSubscribed(true);
        } else if (res.message.toLowerCase().includes("success")) {
          setSubscribed(true);
          localStorage.setItem("tinytreasures_subscribed", "true");
          localStorage.setItem("tinytreasures_email", inputs.email);
          setInputs({ email: "" });
        }
      })
      .catch((err) => {
        setMessage("Something went wrong. Please try again.");
        console.error(err);
      });
  };

  // Clear message automatically after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center justify-center sm:justify-start">
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={handleInput}
          value={inputs.email ?? ""}
          id="email"
          required
          className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-auto flex-1"
        />
        <button
          type="submit"
          className="px-5 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition w-full sm:w-auto"
        >
          Subscribe
        </button>
      </div>

      {message && (
        <p
          className={`text-sm sm:text-left ${
            message.toLowerCase().includes("already")
              ? "text-yellow-400"
              : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
