export default async function Home() {
  let posts = [];

  try {
    const res = await fetch(
      "https://nexalgaming.co/wp-json/wp/v2/posts?per_page=10&_embed",
      { cache: "no-store" }
    );

    posts = await res.json();
  } catch (err) {
    console.error("Server fetch error:", err);
  }

  return (
    <main style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Nexal Gaming</h1>

      {posts.length === 0 && <p>No posts found.</p>}

      {posts.map((post: any) => {
        const image =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

        return (
          <div key={post.id} style={{ marginBottom: "40px" }}>
            {image && (
              <img
                src={image}
                alt=""
                style={{ width: "100%", borderRadius: "10px" }}
              />
            )}

            <h2
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered,
              }}
            />
          </div>
        );
      })}
    </main>
  );
}