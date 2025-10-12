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


}