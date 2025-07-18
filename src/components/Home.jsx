import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { createToPaste, updateToPaste } from "../features/Slice";
import toast from "react-hot-toast";

export const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [pasteContent, setPasteContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const Allpastes = useSelector((state) => state.paste.pastes);

  const createPaste = () => {
    if (inputValue.trim() === "" || pasteContent.trim() === "") {
      toast.error("Title and content cannot be empty");
      return;
    }

    if (inputValue.length < 3) {
      toast.error("Title must be at least 3 characters long");
      return;
    }
    if (pasteContent.length < 10) {
      toast.error("Content must be at least 10 characters long");
      return;
    }

    const existingPaste = Allpastes.find((paste) => paste.title === inputValue);
    if (existingPaste && !pasteId) {
      toast.error("A paste with this title already exists");
      return;
    }

    const pasteData = {
      title: inputValue,
      content: pasteContent,
      _id: pasteId || Date.now().toString(30),
      createdAt: new Date().toDateString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(pasteData));
    } else {
      dispatch(createToPaste(pasteData));
    }

    setInputValue("");
    setPasteContent("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = Allpastes.find((p) => p._id === pasteId);
      setInputValue(paste?.title || "");
      setPasteContent(paste?.content || "");
    }
  }, [pasteId, Allpastes]);

  return (
    <div className="max-w-8xl mx-auto px-4 py-10 bg-gradient-to-r from-blue-600 to-blue-100">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 mb-8">
        📝 Paste Sharing App
      </h1>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Type title..."
          className="w-full sm:w-[80%] border border-gray-300 rounded-xl px-4 py-3 text-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200 lg:text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
          onClick={createPaste}
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      {/* Paste Content */}
      <div>
        <textarea
          name="pasteContent"
          id="pasteContent"
          rows={25}
          className="w-full border border-gray-300 rounded-xl p-4 text-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-50 transition duration-200"
          placeholder="Paste your content here..."
          value={pasteContent}
          onChange={(e) => setPasteContent(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};
