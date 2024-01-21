import mongoose from "mongoose";
import { IMovie } from "../interfaces/movie.interface";

const movieSchema = new mongoose.Schema<IMovie>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    genre: [{ type: String }],
    rating: String,
    streamingLink: String
})

export const Movie = mongoose.model('Movie', movieSchema)