

export interface IMovies {
    Movie: IMovie[]
}

export interface IMovie {
    title: string,
    genre: string,
    rating: string,
    streamingLink: string
}