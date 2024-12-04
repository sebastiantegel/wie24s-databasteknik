import express from "express";
import { Movie, movieModel } from "../models/Movie";

// Syftet med denna fil är att ha:
// CRUD-operationer för movies

// hit kommer vi om url:n innehåller: http://localhost:3000/movies

export const moviesRouter = express.Router();

// GET request till http://localhost:3000/movies/
moviesRouter.get("/", async (req, res) => {
  // res.json(movies);
  const movies = await movieModel.find();
  const myMovies = movies.map(
    (movie) => new Movie(movie._id.toString(), movie.title, movie.length || 0)
  );
  res.json(myMovies);
});

// POST http://localhost:3000/movies/add
moviesRouter.post("/add", async (req, res) => {
  console.log("POST:", req.body);

  const m = new movieModel({
    title: req.body.title,
    length: req.body.length,
  });

  try {
    const savedMovie = await m.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT http://localhost:3000/movies/update
moviesRouter.put("/update", (req, res) => {});

// DELETE http://localhost:3000/movies/
moviesRouter.delete("/", (req, res) => {});
