import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center  flex-col min-h-screen min-w-[100%] bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>
        <p className="text-lg mt-2">
          The page you are looking for does not exist.
        </p>
        <p className="text-lg mt-2">
          Please check the URL or return to the home page.
        </p>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    </>
  );
};

export default Error404;
