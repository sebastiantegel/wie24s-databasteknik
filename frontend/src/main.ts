import { IMovie } from "./models/IMovie";
import "./style.css";

const getData = async () => {
  const response = await fetch("http://localhost:3000/movies");
  const result: IMovie[] = await response.json(); // result = [{ message: "Hello world!" }]

  createHtml(result);
};

const createHtml = (movies: IMovie[]) => {
  const moviesContainer = document.getElementById("movies");

  if (moviesContainer) {
    moviesContainer.innerHTML = "";
  }

  movies.forEach((movie) => {
    const container = document.createElement("div");
    const title = document.createElement("h2");
    const length = document.createElement("p");
    const titleEdit = document.createElement("input");
    const lengthEdit = document.createElement("input");
    const removeButton = document.createElement("button");
    const moreInfoButton = document.createElement("button");
    const changeButton = document.createElement("button");

    moreInfoButton.innerHTML = "Visa mer";
    moreInfoButton.addEventListener("click", async () => {
      const response = await fetch("http://localhost:3000/movies/" + movie.id);
    });

    removeButton.innerHTML = "Ta bort";
    removeButton.addEventListener("click", async () => {
      const response = await fetch("http://localhost:3000/movies/" + movie.id, {
        method: "DELETE",
      });

      if (response.ok) {
        getData();
      }
    });

    titleEdit.value = movie.title;
    lengthEdit.value = movie.length.toString();

    if (!movie.isInEditMode) {
      changeButton.innerHTML = "Ändra";
      changeButton.addEventListener("click", () => {
        movie.isInEditMode = true;
        createHtml(movies);
      });
    } else {
      changeButton.innerHTML = "Spara";
      changeButton.addEventListener("click", async () => {
        movie.isInEditMode = false;
        const response = await fetch(
          "http://localhost:3000/movies/" + movie.id,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              title: titleEdit.value,
              length: Number(lengthEdit.value),
            }),
          }
        );

        if (response.ok) {
          getData();
        }
      });
    }

    title.innerHTML = movie.title;
    length.innerHTML = movie.length.toString();
    if (!movie.isInEditMode) {
      container.appendChild(title);
      container.appendChild(length);
    } else {
      container.appendChild(titleEdit);
      container.appendChild(lengthEdit);
    }
    container.appendChild(moreInfoButton);
    container.appendChild(removeButton);
    container.appendChild(changeButton);
    moviesContainer?.appendChild(container);
  });
};

document.getElementById("getData")?.addEventListener("click", async () => {
  await getData();
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

    await getData();
  }
});
