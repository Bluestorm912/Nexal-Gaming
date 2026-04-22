"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://nexalgaming.co/wp-json/wp/v2/posts?_embed"
        );

        const data = await res.json();

        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <main style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Nexal Gaming</h1>

      {loading && <p>Loading posts...</p>}

      {!loading && posts.length === 0 && <p>No posts found.</p>}

      {posts.map((post: any) => {
        const image =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

        return (
          <div key={post.id} style={{ marginBottom: "40px" }}>
            {image && (
              <img
                src={image}
                alt="featured"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}

            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

            <div
              dangerouslySetInnerHTML={{
                __html: post.excerpt?.rendered || "",
              }}
            />
          </div>
        );
      })}
    </main>
  );
}