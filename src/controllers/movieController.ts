import { IMoviesController } from "../interfaces/controllers/IMovies.controller";
import { IMovies } from "../interfaces/movie.interface";
import { Movie } from "../models/movie";
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export class MoviesController implements IMoviesController {

    findAllMovies = async (request: Request, response: Response): Promise<void> => {
        try {
            const movies: IMovies | any = await Movie.find();
            response.status(httpStatus.OK).send(movies);
        } catch (error: any) {
            response.status(httpStatus.NOT_FOUND).json({
                message: 'No record found',
                error: error.message
            })
        }
    }

    createMovie = async (request: Request, response: Response): Promise<void> => {
        try {
            const { title, genre, rating, streamingLink } = request.body;

            const movie = await Movie.create({
                title, genre, rating, streamingLink
            })

            response.status(httpStatus.CREATED).json({ movie })
        } catch (error: any) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to create movie',
                error: error.message
            })
        }
    }

    findMovieByTitleOrGenre = async (request: Request, response: Response): Promise<void> => {
        try {
            let query: any = {};

            if (request.query.title) {
                let title: any = request.query.title
                query.title = new RegExp(title, 'i');
            }

            if (request.query.genre) {
                let genre: any = request.query.genre
                query.genre = new RegExp(genre, 'i');
            }
            const movie = await Movie.find(query)
            
            if (!movie || movie?.length < 1) response.status(httpStatus.NOT_FOUND).json({ message: "No movies found" });
            else {
                response.json({ movie });
            }

        } catch (error: any) {
            response.status(httpStatus.NOT_FOUND).json({
                message: 'No records found',
                error: error.message
            })
        }
    }

    findMovieAndDelete = async (request: Request, response: Response): Promise<void> => {
        try {
            const _id = request.params.id;
            const movie = await Movie.findByIdAndDelete({
                _id
            })
            if (!movie) response.status(httpStatus.NOT_FOUND).json({ message: "No records found to delete" })
            else {
                response.status(httpStatus.OK).json({ movie })
            }

        } catch (error: any) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to delete data',
                error: error.message
            })
        }
    }

    findMovieAndUpdate = async (request: Request, response: Response): Promise<void> => {
        try {
            const { title, genre, rating, streamingLink } = request.body;
            const _id: string = request.params.id;
            const movie = await Movie.findOneAndUpdate({ _id }, {
                title, genre, rating, streamingLink
            })

            response.status(httpStatus.OK).json({
                message: 'Data Successfully Updated'
            })
        } catch (error: any) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to update data',
                error: error.message
            })
        }

    }
}


