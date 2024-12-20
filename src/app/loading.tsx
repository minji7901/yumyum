import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900">
      <div className="w-12 h-12 border-4 border-white border-t-sky-500 rounded-full animate-spin"></div>
      <div className="mt-4">Loading...</div>
    </div>
  );
}