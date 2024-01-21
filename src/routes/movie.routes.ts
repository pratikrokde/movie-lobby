import { Router } from "express";
import { MoviesController}   from "../controllers/movieController";
import { checkIfUserHasAdminAccess } from "../middlewares/authMiddleware";

const moviesController = new MoviesController();

export const movieRouter = Router();

movieRouter.get('/movies', moviesController.findAllMovies)
movieRouter.post('/movies', moviesController.createMovie)
movieRouter.get('/search', moviesController.findMovieByTitleOrGenre)
movieRouter.delete('/movie/:id', checkIfUserHasAdminAccess,  moviesController.findMovieAndDelete)
movieRouter.put('/movie/:id', moviesController.findMovieAndUpdate)
