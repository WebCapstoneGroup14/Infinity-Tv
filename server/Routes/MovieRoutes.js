import express from "express";

import { admin, protect } from "../middlewares/Auth.js";
import * as moviesController from "../Controllers/MovieController.js";

const router = express.Router();

router.post("/import", moviesController.importMovies);
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);
router.get("/rated/top", moviesController.getTopRatedMovies);
router.get("/random/all", moviesController.getRandomMovies);

//Private routes

router.post("/:id/reviews", protect, moviesController.createMovieReview);

//Admin Routes

router.put("/:id", protect, admin, moviesController.updateMovie);
router.delete("/:id", protect, admin, moviesController.deleteMovie);
router.post("/", protect, admin, moviesController.createMovie);
router.delete("/", protect, admin, moviesController.deleteAllMovies);

export default router;
