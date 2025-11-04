"use client";
import { useState } from "react";

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

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/condolences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({
        name: "",
        message: "",
        image: "",
        location: "",
        relationship: "",
        otherRelationship: "",
      });
      onSubmitSuccess();
    } catch (error) {
      console.error("Failed to submit condolence:", error);
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
      <label htmlFor="file">
        Upload an image of you with Grandma (optional)
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="border border-solid border-black p-2 rounded w-full"
      />

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
          onChange={(e) => {
            setForm({
              ...form,
              relationship: e.target.value,
              otherRelationship:
                e.target.value !== "other" ? "" : form.otherRelationship,
            });
          }}
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
    </form>
  );
}
