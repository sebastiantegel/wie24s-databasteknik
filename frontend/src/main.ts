import { IMovie } from "./models/IMovie";
import "./style.css";

const getAndShowData = async () => {
  const response = await fetch("http://localhost:3000/movies");
  const result: IMovie[] = await response.json(); // result = [{ message: "Hello world!" }]

  const moviesContainer = document.getElementById("movies");

  if (moviesContainer) {
    moviesContainer.innerHTML = "";
  }

  result.forEach((movie) => {
    const container = document.createElement("div");
    const title = document.createElement("h2");
    const length = document.createElement("p");

    title.innerHTML = movie.title;
    length.innerHTML = movie.length.toString();
    container.appendChild(title);
    container.appendChild(length);
    moviesContainer?.appendChild(container);
  });
};

document.getElementById("getData")?.addEventListener("click", async () => {
  await getAndShowData();
});

document.getElementById("movieForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = (document.getElementById("title") as HTMLInputElement).value;
  const length = +(document.getElementById("length") as HTMLInputElement).value;

  const response = await fetch("http://localhost:3000/movies/add", {
    method: "POST",
    body: JSON.stringify({ title, length }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.ok) {
    (e.target as HTMLFormElement).reset();

    await getAndShowData();
  }
});
