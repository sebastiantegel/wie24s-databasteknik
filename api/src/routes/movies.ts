import express from "express";
import { Movie } from "../models/Movie";

// Syftet med denna fil är att ha:
// CRUD-operationer för movies

// hit kommer vi om url:n innehåller: http://localhost:3000/movies

export const moviesRouter = express.Router();

const movies: Movie[] = [
  { title: "Lord of the rings", length: 145 },
  { title: "Die hard", length: 120 },
  { title: "The Proposal", length: 118 },
];

// GET request till http://localhost:3000/movies/
moviesRouter.get("/", (req, res) => {
  res.json(movies);
});

// POST http://localhost:3000/movies/add
moviesRouter.post("/add", (req, res) => {
  console.log("POST:", req.body);
  movies.push(req.body);
  res.status(201).end();
});

// PUT http://localhost:3000/movies/update
moviesRouter.put("/update", (req, res) => {});

// DELETE http://localhost:3000/movies/
moviesRouter.delete("/", (req, res) => {});
