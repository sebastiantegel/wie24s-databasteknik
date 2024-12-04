import mongoose from "mongoose";

export class Movie {
  constructor(public id: string, public title: string, public length: number) {}
}

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: false,
  },
});

export const movieModel = mongoose.model("movie", movieSchema);
