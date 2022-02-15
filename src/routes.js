import Router from "url-router";

const entries = import.meta.globEager(
  "./pages/*(!(components/*)*/)*.{js,marko}"
);
const getRoutes = {};
const postRoutes = {};

for (const entry in entries) {
  // Below we map file system paths to a route.
  const { default: GET, action: POST } = entries[entry];
  const path = entry
    .replace(/^\.\/pages/, "") // remove ./pages prefix
    .replace(/\.[^\.]+$/, "") // remove extension
    .replace(/[/.]\$/g, "/:") // replace /$param and .$param with /:param
    .replace(/(?:\/index)+(\/|$)/g, "/"); // replace /index with /

  if (POST) {
    postRoutes[path] = POST;
  }

  if (GET) {
    getRoutes[path] = GET.stream
      ? (ctx) => {
          // .marko routes will stream the template.
          return new Response(GET.stream({
            ...ctx,
            $global: ctx
          }), {
            status: 200,
            headers: { "content-type": "text/html;charset=UTF-8" },
          });
        }
      : GET;
  }
}

export default {
  GET: new Router(getRoutes),
  POST: new Router(postRoutes),
};
