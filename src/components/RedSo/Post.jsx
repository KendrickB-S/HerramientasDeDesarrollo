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
          <button
            className="btn btn-sm btn-outline-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#comments-${post.id}`}
            aria-expanded="false"
            aria-controls={`comments-${post.id}`}
          >
            💬 {post.comments.length}
          </button>
        </div>

        {/* comentarios (collapse) */}
        <div className="collapse mt-3" id={`comments-${post.id}`}>
          <div className="card card-body">
            {post.comments.length === 0 ? (
              <p className="text-muted">Sé el primero en comentar</p>
            ) : (
              post.comments.map((c) => (
                <div key={c.id} className="mb-2">
                  <div className="d-flex justify-content-between">
                    <div><strong>Usuario</strong> <small className="text-muted">• {new Date(c.createdAt).toLocaleString()}</small></div>
                  </div>
                  <div>{c.text}</div>
                </div>
              ))
            )}
            <form onSubmit={submitComment} className="mt-2 d-flex gap-2">
              <input
                className="form-control"
                placeholder="Escribe un comentario..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">Comentar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


