"use client";

import { useState } from "react";
import { axiosbaseurl } from "../axios/axios";

export default function AddSubject() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Subject name is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosbaseurl.post(
        "/admin/addsubject",
        formData
      );

      alert(res.data.message || "Subject added successfully 🎉");

      setFormData({
        name: "",
        description: "",
      });
    } catch (error) {
      console.error("Add Subject Error:", error);

      alert(
        error.response?.data?.error ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-[28px] border border-border bg-card/70 p-8 shadow-xl backdrop-blur-xl animate-enter">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">
          Add Subject
        </h2>
        <p className="mt-2 text-muted-foreground">
          Create a new learning universe ✨
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Subject Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Example: Biology"
            required
            disabled={loading}
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            disabled={loading}
            placeholder="Describe the subject..."
            className="w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Subject"}
        </button>
      </form>
    </div>
  );
}