Marko Blog Tutorial w/ Vite + Cloudflare Workers
==================================

This repo is setup to be a companion to Marko Blog Tutorial Workshop to teach the basics of Marko through building a simple blog site. It will cover component authoring, data fetching, mutation, and deployment to Cloudflare.

The repo itself is broken up into multiple branches one representing each step of the tutorial. The main branch will contain the final working version of the code as well.

This repo is meant to serve as reference. The tutorial workshop itself given in more detail is available here: `_______`

## Tutorial

### Step 1: Exploring the Template

This tutorial is adapted from Marko's Vite/Cloudflare template and the first step is clone down our starting point from the Step1 branch. After cloning navigate into the directory install and run the dev server:

```bash
npm install
npm run dev
```

If all is right when you open `http://localhost:3000` in the browser you should see a grey screen with `Hello Blog`.

This branch contains all the basic setup for the workers, routing, development environment, data bootstrapping, and our page layout that we will be using for the remainder of the tutorial.

### Step 2: Fetching Blog Listings

This step updates the main index.marko entry point to add data fetching. It shows how the `<async>` tag is used to fetch and disply content loaded from the server.

### Step 3: Creating Blog Posts with Forms

This step adds a "New Blog Post" page that shows how we can use the built in mechanism of Forms in the web platform to add new Blog posts. This shows how browser built in methods for posting Forms and Form validation can be used to your advantage.

### Step 4: Adding Interactive JavaScript

In this step we add the details view of the Blog Post. It fetches the data for the Blog post as well as adds the ability to add Comments. This step introduces stateful components and will update the Comments completely in the browser using JavaScript. However, we still use forms so that the page is completely functional even when JavaScript is not available in the browser.

### Step 5: Optimizing Hydration Performance

In this step we update our handling of Comments to better optimize the experience for end users. We will learn how to make Partial Hydration work for you.

## Deploying to Cloudflare

This example uses a custom KV Storage on Cloudflare, that we emulate in the development environment. In addition to configuring your `wrangler.toml` with your account information and updating the project name you will need to allocate a new KV store on your cloudflare account.

```sh
> wrangler kv:namespace create --preview "STORAGE"
```
This will return the keys you need to add to your wrangler.toml like:

```
kv_namespaces = [
  { binding = "STORAGE", preview_id = "a33ce8e331f24b10a1e6bad43949f384", id = "aab664c75e4420639ddd6911a06ecaa4" }
]
```

## Base Template Reference

### Production Preview
First you'll need to authenticate with `cloudflare` and install the [`wrangler cli`](https://developers.cloudflare.com/workers/cli-wrangler). If you've not already done this, follow [the cloudflare workers getting started guide through step 3](https://developers.cloudflare.com/workers/get-started/guide#3-configure-the-workers-cli).

```bash
npm run build
npx wrangler dev
```

### Routing
This simple example comes with file system based routing implemented using [Vite's glob imports](https://vitejs.dev/guide/features.html#glob-import). It follows similar conventions to [Remix](https://remix.run/docs/en/v1/guides/routing#review).

Any top level `.marko` (and `.js`) file under the `./src/pages` directory will automatically be served according to it's path on disk.
We automatically exclude any `components` directories.

For dynamic routes you can prefix the file/folder name with `$`. Or to save creating a folder use an extension that starts with a `$`.
`index` folders and files are also stripped from the path being matched.

Here are some example file system paths, and what their route format ultimately becomes.

```bash
# Static routes
./pages/index.marko => /
./pages/story.marko => /story
./pages/story/index.marko => /story
./pages/api/user.js => /api/user

# Dynamic routes
./pages/story/$id.marko => /story/:id
./pages/story.$id.marko => /story/:id
```

For `.marko` files the `input` for the page component will be an object like the following:

```js
{
  url: new URL(...), // a URL instance for the current request.
  request: new Request(...), // The current Request object.
  params: { ... } // An object containing all matched params for the dynamic paths.
}
```

If a `.js` file is used, it must `export default` a handler function that returns a web `Response` object.
It will receive the same object as described above, for example it may look like:

```js
// Handles `GET` requests to the current path.
export default ({ request, url, params }) => {
  return new Response("Hello!", { status: 200 });
}
```

### Form Handlers / POST requests
In both `.marko` and `.js` files you can also expose an `action` export to handle `POST` requests.

```js
// Handles `POST` requests to the current path.
export async function action({ request, url, params }) {
  await saveSomeData();
  return Response.redirect(request.headers.get("referrer") || "/", 303);
}
```

### Common Template for multiple routes
Sometimes you may want to have the same `.marko` component used for multiple routes in your application.
Typically this is done to make the URL a bit prettier and it may be best to simply use a query string or other mechanism instead of multiple pathnames.

However this can be done simply by creating a `.js` file at the alternative paths and re-exporting the `.marko` component from there.

```js
import Template, { action } from "./another-template-path.marko";
export { Template as default, action }
```
