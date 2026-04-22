"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();

        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Nexal Gaming</h1>

      {posts.length === 0 && <p>Loading posts...</p>}

      {posts.map((post: any) => (
        <div key={post.id}>
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        </div>
      ))}
    </main>
  );
}