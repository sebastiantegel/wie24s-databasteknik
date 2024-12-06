import express from "express";
import { Movie, movieModel } from "../models/Movie";

// Syftet med denna fil är att ha:
// CRUD-operationer för movies

// hit kommer vi om url:n innehåller: http://localhost:3000/movies

export const moviesRouter = express.Router();

// Create - POST http://localhost:3000/movies/add
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

// Read - GET request till http://localhost:3000/movies/
moviesRouter.get("/", async (req, res) => {
  // res.json(movies);
  const movies = await movieModel.find();
  const myMovies = movies.map(
    (movie) => new Movie(movie._id.toString(), movie.title, movie.length || 0)
  );
  res.json(myMovies);
});

// Read - GET request till http://localhost:3000/movies/:id
moviesRouter.get("/:id", async (req, res) => {
  console.log("Id to find: ", req.params.id);

  const movie = await movieModel.findById(req.params.id);

  res.status(200).json(movie);
});

// Update - PUT http://localhost:3000/movies/:id
moviesRouter.put("/:id", async (req, res) => {
  try {
    const response = await movieModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      length: req.body.length,
    });

    res.status(200).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete - DELETE http://localhost:3000/movies/:id
moviesRouter.delete("/:id", async (req, res) => {
  try {
    await movieModel.findByIdAndDelete(req.params.id);
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error);
  }
});
