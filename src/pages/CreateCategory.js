import React, { useState } from "react";
import { createCategory } from "../api";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      await createCategory({ userId, name: categoryName });
      setCategoryName("");
      alert("Category created successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
