import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendar, FaCopy, FaEdit, FaEye, FaShare } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { deleteToPaste, shareToPaste } from "../features/Slice";
import { toast } from "react-hot-toast";

const handleShareLink = (pasteId) => {
  const url = `${window.location.origin}/?pasteId=${pasteId}`;
  navigator.clipboard
    .writeText(url)
    .then(() => toast.success("Link copied to clipboard!"))
    .catch(() => toast.error("Failed to copy link."));
};

const Paste = () => {
  const [search, setSearch] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  if (pastes.length === 0) {
    return (
      <div className="text-center text-lg text-gray-500 mt-10">
        No pastes available. Please create a new paste.
      </div>
    );
  }

  const handleDelete = (pasteId) => dispatch(deleteToPaste(pasteId));
  const sharePaste = (pasteId) => dispatch(shareToPaste(pasteId));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search by title..."
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-blue-500 text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
        📚 All My Pastes
      </h2>

      {/* Paste Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPastes.map((paste) => (
          <div
            key={paste._id}
            className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 transition duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Paste Title */}
            <h3 className="text-xl font-semibold text-blue-600 truncate">
              {paste.title}
            </h3>

            {/* Paste Content */}
            <p className="text-gray-700 mt-2 line-clamp-4">{paste.content}</p>

            {/* Created At */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FaCalendar /> {paste.createdAt}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Content copied!");
                }}
                title="Copy"
                className="hover:text-blue-600"
              >
                <FaCopy />
              </button>

              <a href={`/pastes/${paste._id}`} title="View">
                <FaEye className="hover:text-blue-600" />
              </a>

              <button
                onClick={() => handleShareLink(paste._id)}
                title="Share"
                className="hover:text-blue-600"
              >
                <FaShare />
              </button>

              <a href={`/?pasteId=${paste._id}`} title="Edit">
                <FaEdit className="hover:text-yellow-500" />
              </a>

              <button
                onClick={() => handleDelete(paste._id)}
                title="Delete"
                className="hover:text-red-600"
              >
                <FaDeleteLeft />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paste;
