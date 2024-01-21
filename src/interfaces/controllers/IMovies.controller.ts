import { Request, Response } from 'express';

export interface IMoviesController {
    findAllMovies: (request:Request, response:Response) => void;
    createMovie: (request:Request, response:Response) => Promise<void>;
    findMovieByTitleOrGenre: (request:Request, response:Response) => Promise<void>;
    findMovieAndDelete: (request:Request, response:Response) => Promise<void>;
    findMovieAndUpdate: (request:Request, response:Response) => Promise<void>;
}