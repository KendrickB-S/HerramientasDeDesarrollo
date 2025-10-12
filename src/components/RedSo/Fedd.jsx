import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";

const STORAGE_KEY = "mini-social-posts-v1";

export default function Feed() {
  const [posts, setPosts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : sampleInitial();
    } catch {
      return sampleInitial();
    }
  });

   useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  function sampleInitial() {
    return [
      {
        id: 1,
        author: "Andrei",
        content: "Bienvenido al mini-clon social! ✨",
        image: null,
        createdAt: new Date().toISOString(),
        likes: 2,
        liked: false,
        comments: [
          { id: 11, text: "¡Genial!", createdAt: new Date().toISOString() }
        ]
      },
    ];
  }

  const handleCreate = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(p => {
      if (p.id !== postId) return p;
      const liked = !p.liked;
      return { ...p, liked, likes: liked ? p.likes + 1 : Math.max(0, p.likes -1) };
    }));
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, comment] } : p));
  };

  const deletePost = (postId) => {
    if (!window.confirm("¿Eliminar publicación?")) return;
    setPosts(posts.filter(p => p.id !== postId));
  };

}