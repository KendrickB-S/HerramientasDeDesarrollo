import React, { useState } from "react";

export default function CreatePost({ onCreate }) {
  const [texto, setTexto] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texto.trim() && !imagenUrl.trim()) return;
    onCreate({
      id: Date.now(),
      author: "Anónimo",
      content: texto.trim(),
      image: imagenUrl.trim() || null,
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
      comments: []
    });
    setTexto("");
    setImagenUrl("");
  };


}