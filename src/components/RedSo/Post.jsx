import React, { useState } from "react";

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff/60)}m`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h`;
  return `${Math.floor(diff/86400)}d`;
}

export default function Post({ post, onToggleLike, onAddComment, onDeletePost }) {
  const [comentario, setComentario] = useState("");

  const submitComment = (e) => {
    e.preventDefault();
    if (!comentario.trim()) return;
    onAddComment(post.id, {
      id: Date.now(),
      text: comentario.trim(),
      createdAt: new Date().toISOString()
    });
    setComentario("");
  };
}