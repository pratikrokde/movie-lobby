import request from 'supertest';
import { app } from '../src/index';
import {  Movie } from '../src/models/movie';

describe('Movie API', () => {
  const sampleMovie = {
    title: 'Dunki',
    genre: [ 'Comedy' ],
    rating: "7.5",
    streamingLink: 'https://sample.com/test-data',
  };
  const sampleMovie1 = {
    title: 'Jawan',
    genre: [ 'Action' ],
    rating: "7",
    streamingLink: 'https://sample.com/test-data',
  };

  beforeEach(async () => {
    await Movie.deleteMany({});
  });

  it('should give list of all movies', async () => {
    await Movie.create(sampleMovie);

    const response = await request(app).get('/movies');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe(sampleMovie.title);
  });

  it('should search for existing movies', async () => {
    await Movie.create(sampleMovie);

    const response = await request(app).get('/search?title=Dunki');

    expect(response.status).toBe(200);
    expect(response.body.movie).toHaveLength(1);
    expect(response.body.movie[0].title).toBe(sampleMovie.title);
  });

  it('should add a new movie', async () => {
    const response = await request(app)
      .post('/movies')
      .send(sampleMovie1);

    expect(response.status).toBe(201);
    expect(response.body.movie.title).toBe(sampleMovie1.title);

   
    const savedMovie = await Movie.findOne({ title: sampleMovie1.title });
    expect(savedMovie).not.toBeNull();

  });

  it('should update an existing movie', async () => {
    const savedMovie = await Movie.create(sampleMovie);

    const updatedData = {
      title: 'Updated Test Movie',
      rating: "8",
    };

    const response = await request(app)
      .put(`/movie/${savedMovie._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);

  
    const updatedMovie = await Movie.findById(savedMovie._id);
    
    expect(updatedMovie?.title).toBe(updatedData.title);

  });

  it('should delete an existing movie', async () => {
    const savedMovie = await Movie.create(sampleMovie);

    const response = await request(app).delete(`/movie/${savedMovie._id}`).set('role', 'Admin')
    expect(response.status).toBe(200);

    const deletedMovie = await Movie.findById(savedMovie._id);
    expect(deletedMovie).toBeNull();
  });
});  
