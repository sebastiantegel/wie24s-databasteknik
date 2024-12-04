import mongoose from "mongoose";
import express, { Request, Response, json } from "express";
import cors from "cors";
import { moviesRouter } from "./routes/movies";

// Skapa ett api med hjälp av express
const app = express();

// Använd cors för att öka säkerheten och beskriva vilka
// som kan göra anrop till vårt api.
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "*",
  })
);

// Gör om datat i alla anrop till json
app.use(json());

// Lyssna efter anrop till http://localhost:3000/
// Skicka tillbaka texten 'Hello world!'
app.get("/", (req: Request, res: Response) => {
  console.log("Request handling stuff...");
  res.json({ message: "Hello world!" });
});

// Lyssna efter anrop till http://localhost:3000/movies
// och skicka anropet till moviesRouter (routes/movies.ts)
app.use("/movies", moviesRouter);

// Anslut till databasen
mongoose.connect(
  "mongodb+srv://sebastiantegel:UsMeHBSPvUpUoSs2@cluster0.a2ub8.mongodb.net/movieLibrary?retryWrites=true&w=majority"
);

const database = mongoose.connection;
database.on("error", () => {
  console.log("Error connecting to the database");
});
database.on("connected", () => {
  console.log("Connected to the database, ready to roll!");
});

// Lyssna efter anrop på port 3000
app.listen(3000, () => {
  console.log("Running api on 3000>");
});
