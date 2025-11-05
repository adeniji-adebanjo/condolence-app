"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CondolenceFormProps {
  onSubmitSuccess: () => void;
}

export default function CondolenceForm({
  onSubmitSuccess,
}: CondolenceFormProps) {
  const [form, setForm] = useState({
    name: "",
    message: "",
    image: "",
    location: "",
    relationship: "",
    otherRelationship: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle image upload (convert to Base64 first)
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  // Submit form to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/condolences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // Try to parse server error message
        let errMsg = "Failed to submit condolence";
        try {
          const body = await res.json();
          errMsg = body?.message || body?.error || errMsg;
        } catch {
          try {
            errMsg = await res.text();
          } catch {
            /* ignore */
          }
        }
        throw new Error(errMsg);
      }

      setForm({
        name: "",
        message: "",
        image: "",
        location: "",
        relationship: "",
        otherRelationship: "",
      });

      // show success toast and trigger parent callback
      toast.success("Condolence submitted — thank you!");
      onSubmitSuccess();
    } catch (error) {
      console.error("Submission error:", error);
      const msg =
        error instanceof Error
          ? error.message
          : "There was an issue submitting your condolence. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md w-full space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Share Your Condolence
      </h2>

      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="Write your condolence or testimony..."
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />

      <div>
        <label htmlFor="file" className="block text-sm text-gray-700 mb-1">
          Upload an image (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm text-gray-700">
          Your Location
        </label>
        <input
          id="location"
          type="text"
          placeholder="e.g., London, UK"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="relationship" className="block text-sm text-gray-700">
          Relationship with Grandma
        </label>
        <select
          id="relationship"
          value={form.relationship}
          onChange={(e) =>
            setForm({
              ...form,
              relationship: e.target.value,
              otherRelationship:
                e.target.value !== "other" ? "" : form.otherRelationship,
            })
          }
          className="w-full border p-2 rounded"
          required
        >
          <option value="" disabled>
            Select relationship...
          </option>
          <option value="son">Son</option>
          <option value="daughter">Daughter</option>
          <option value="sibling">Sibling</option>
          <option value="friend">Friend</option>
          <option value="colleague">Colleague</option>
          <option value="other">Other</option>
        </select>
      </div>

      {form.relationship === "other" && (
        <div className="space-y-2">
          <label
            htmlFor="otherRelationship"
            className="block text-sm text-gray-700"
          >
            Please specify relationship
          </label>
          <input
            id="otherRelationship"
            type="text"
            placeholder="Please specify your relationship"
            value={form.otherRelationship}
            onChange={(e) =>
              setForm({ ...form, otherRelationship: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded w-full cursor-pointer hover:bg-blue-700 transition"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      <ToastContainer position="top-right" autoClose={4000} />
    </form>
  );
}
