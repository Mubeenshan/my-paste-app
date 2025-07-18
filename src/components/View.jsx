import React from "react";
import { FaCopy } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const View = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="text-center text-lg text-gray-500 mt-10">
        Paste not found. Please check the URL or create a new paste.
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success("Content copied to clipboard!");
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-6 bg-white shadow-lg rounded-lg overflow-y-auto overflow-hidden">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          className="border border-gray-300 rounded-2xl px-4 py-3 w-full bg-gray-100 font-semibold text-gray-700 cursor-not-allowed"
          value={paste.title}
          disabled
        />
      </div>

      <div className="relative mt-4">
        <button
          onClick={handleCopy}
          className="absolute top-5 right-5 text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full shadow-md transition-all"
        >
          <FaCopy />
        </button>
        <textarea
          name="pasteContent"
          id="pasteContent"
          className="border border-gray-300 rounded-lg mt-2 w-full text-gray-800 p-4 bg-gray-100 cursor-not-allowed resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={30}
          value={paste.content}
          disabled
          placeholder="Paste content..."
        ></textarea>
      </div>
    </div>
  );
};

export default View;
