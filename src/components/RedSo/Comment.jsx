import React from "react";

const Comment = ({ text }) => {
  return (
    <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md">
      💬 {text}
    </p>
  );
};

export default Comment;
