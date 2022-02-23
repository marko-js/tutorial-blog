export async function action({ request }) {
  const formData = await request.formData();
  let comments = await STORAGE.get(`comments:${formData.get("postId")}`, {
    type: "json",
  });
  const newComment = {
    author: formData.get("author"),
    text: formData.get("comment"),
    date: new Date().toUTCString(),
  };
  comments || (comments = []);
  comments.push(newComment);

  await STORAGE.put(
    `comments:${formData.get("postId")}`,
    JSON.stringify(comments)
  );

  // handle no JS
  if (request.headers.get("accept").includes("text/html")) {
    return Response.redirect(
      request.headers.get("referer") || new URL("/", request.url),
      303
    );
  }

  return new Response(JSON.stringify(newComment), { status: 200 });
}
