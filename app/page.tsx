"use client";

import { useEffect, useState } from "react";




export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
   
async function fetchPosts() {
  try {
    const res = await fetch(
      "https://api.allorigins.win/raw?url=https://nexalgaming.co/wp-json/wp/v2/posts"
    );

    const text = await res.text();

    console.log("RAW RESPONSE:", text);

    // SAFE CHECK: prevent crash
    if (!text || text.startsWith("<")) {
      console.error("Not JSON response (likely HTML error page)");
      setPosts([]);
      return;
    }

    const data = JSON.parse(text);

    console.log("PARSED DATA:", data);

    setPosts(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    setPosts([]);
  }
}

    fetchPosts();
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Nexal Gaming</h1>

      {posts.length === 0 && <p>Loading posts...</p>}

      {posts.map((post: any) => (
        <div key={post.id} style={{ marginBottom: "30px" }}>
          <h2>{post.title?.rendered}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt?.rendered || "",
            }}
          />
        </div>
      ))}
    </main>
  );
}

