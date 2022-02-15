import { html as first } from "./first-look.md";
import { html as uilang } from "./designing-ui-language.md";
import { html as hackernews } from "./hackernews.md";
import { html as tagsapi } from "./tags-api-preview.md";

export const POSTS_DATA = {
  data: [
    {
      id: 1,
      author: "Ryan Carniato",
      title: "A First Look at MarkoJS",
      caption: "Building a simple blog site with Marko",
      duration: 6,
      date: "2020-11-03T00:00:00Z",
      text: first,
    },
    {
      id: 2,
      author: "Ryan Carniato",
      title: "Designing a UI Language",
      caption: "Let's explore the decision process in the designing of the new tag primitive syntax, which powers Marko's highly flexible reactive composition.",
      duration: 9,
      date: "2020-11-25T00:00:00Z",
      text: uilang,
    },
    {
      id: 3,
      author: "Ryan Carniato",
      title: "Back to Basics: Building a HackerNews Clone with Marko",
      caption: "Since I joining the Marko team I noticed we lacked a lot of the common examples you find in other frontend frameworks. And I figured implementing them could teach more about how current Marko works.",
      duration: 10,
      date: "2021-03-10T00:00:00Z",
      text: hackernews,
    },
    {
      id: 4,
      author: "Ryan Carniato",
      title: "Introducing the Tags API Preview",
      caption: "The Marko Tags API is a new set of Core Tags coming to Marko. They let you use state in your templates without using classes.",
      duration: 13,
      date: "2021-07-28T00:00:00Z",
      text: tagsapi,
    },
  ],
};

export default async function initData() {
  const posts = await STORAGE.get("posts");
  if (!posts || !posts.length) {
    await STORAGE.put("posts", JSON.stringify(POSTS_DATA));
  }
}