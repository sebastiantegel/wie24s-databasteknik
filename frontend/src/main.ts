import "./style.css";

document.getElementById("getData")?.addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/");
  const result = await response.json(); // result = { message: "Hello world!" }

  const heading = document.createElement("h1");
  heading.innerHTML = result.message;

  document.getElementById("app")?.appendChild(heading);
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
  }
});
