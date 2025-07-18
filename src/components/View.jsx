import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const View = () => {
  const [view, setView] = useState("");
  const { id } = useParams();
  const Allpastes = useSelector((state) => state.paste.pastes);

  const paste = Allpastes.filter((p) => p._id === id)[0];

  return (
    <>
      <div className="flex flex-row justify-center items-center gap-4 bg-gray-100 space-content-between mt-4 min-w-full ">
        <input
          type="text"
          className="border border-gray-300  rounded-2xl p-3 w-[100%] cursor-not-allowed "
          placeholder="Type Title..."
          value={paste?.title}
          disabled
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="relative">
        {/* <div className="absolute top-15 right-8">{<FaCopy />}</div> */}
        <textarea
          name="pasteContent"
          id="pasteContent"
          className="border border-gray-300  rounded mt-4  w-full text-black p-4 hover:bg-gray-50 cursor-not-allowed"
          rows={25}
          value={paste?.content}
          disabled
          placeholder="Paste your content here..."
          onChange={(e) => setPasteContent(e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

export default View;
