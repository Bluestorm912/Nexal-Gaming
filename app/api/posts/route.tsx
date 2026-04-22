
export async function GET() {
  try {
    const res = await fetch(
      "https://nexalgaming.co/wp-json/wp/v2/posts?per_page=10&_embed"
    );

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}