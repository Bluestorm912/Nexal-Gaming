"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://nexalgaming.co/wp-json/wp/v2/posts?per_page=10&_embed"
        );

        const data = await res.json();

        console.log("WORDPRESS DATA:", data);

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error(err);
        setPosts([]);
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

      {!loading && posts.length === 0 && (
        <p>No posts found (check WordPress data).</p>
      )}

      {posts.map((post: any) => {
        const featuredImage =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

        return (
          <div key={post.id} style={{ marginBottom: "40px" }}>
            {featuredImage && (
              <img
                src={featuredImage}
                alt="featured"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            )}

            <h2
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div
              dangerouslySetInnerHTML={{
                __html: post.content?.rendered || "",
              }}
            />
          </div>
        );
      })}
    </main>
  );
}