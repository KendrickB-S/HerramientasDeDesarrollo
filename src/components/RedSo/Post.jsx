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

return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="mb-1">{post.author}</h6>
            <small className="text-muted">{timeAgo(post.createdAt)} • {new Date(post.createdAt).toLocaleString()}</small>
          </div>
          <div>
            <button className="btn btn-sm btn-outline-danger" onClick={() => onDeletePost(post.id)}>Eliminar</button>
          </div>
        </div>

        <p className="mt-3">{post.content}</p>

        {post.image && (
          <div className="mb-2">
            <img src={post.image} alt="post" style={{ maxWidth: "100%", borderRadius: 8 }} />
          </div>
        )}

        <div className="d-flex align-items-center gap-3 mt-2">
          <button
            className={`btn btn-sm ${post.liked ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => onToggleLike(post.id)}
          >
            ❤️ {post.likes}
          </button>

