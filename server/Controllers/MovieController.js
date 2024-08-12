//****PUBLIC CONTROLLERS****
import expressAsyncHandler from "express-async-handler";

import { MoviesData } from "../Data/MovieData.js";
import Movie from "../Models/MoviesModels.js";

const importMovies = expressAsyncHandler(async (req, res) => {
  await Movie.deleteMany({});
  const movies = await Movie.insertMany(MoviesData);
  res.status(201).json(movies);
});

const getMovies = expressAsyncHandler(async (req, res) => {
  try {
    // filter movies by category, time, language, rate, year and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    // load more movies functionalty
    const page = Number(req.query.pageNumber) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    // find movies by query and skip and limit
    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // get total movies
    const count = await Movie.countDocuments(query);
    // send response to client with movies and total movies
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit),
      totalMovies: count,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET MOVIE BY ID

const getMovieById = expressAsyncHandler(async (req, res) => {
  try {
    // find the movie by id
    const movie = await Movie.findById(req.params.id);
    // if the movie found send it to the client
    if (movie) {
      res.json(movie);
    }
    // else send error message to the client
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET TOP RATED MOVIES

const getTopRatedMovies = expressAsyncHandler(async (req, res) => {
  try {
    // find top rated movies
    const movies = await Movie.find({}).sort({ rate: -1 });
    // send movies to the client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET RANDOM MOVIES
const getRandomMovies = expressAsyncHandler(async (req, res) => {
  try {
    // find random movies
    const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
    // send movies to the client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//CREATE MOVIE REVIEW

const createMovieReview = expressAsyncHandler(async (req, res) => {
  try {
    // get data from request body
    const { rating, comment } = req.body;

    // validate rating
    if (!rating || isNaN(rating) || rating < 0 || rating > 5) {
      res.status(400);
      throw new Error("Invalid rating value");
    }

    // get movie by id
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // check if user already reviewed this movie
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already reviewed this movie");
      }

      // create new review
      const review = {
        userName: req.user.fullName,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
        userId: req.user._id,
      };

      // add new review to movie
      movie.reviews.push(review);

      // update number of reviews
      movie.numberOfReviews = movie.reviews.length;

      // update rate
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      // save movie in database
      await movie.save();

      // send updated movie
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//*************ADMIN CONTROLLERS*************/

//Update Movie

const updateMovie = expressAsyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      image,
      desc,
      titleImage,
      rate,
      numberOfReviews,
      category,
      language,
      year,
      time,
      video,
      casts,
    } = req.body;

    // get movie by id
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // update movie
      movie.name = name || movie.name;
      movie.image = image || movie.image;
      movie.desc = desc || movie.desc;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
      movie.category = category || movie.category;
      movie.language = language || movie.language;
      movie.year = year || movie.year;
      movie.time = time || movie.time;
      movie.video = video || movie.video;
      movie.casts = casts || movie.casts;

      // save movie in database
      const updatedMovie = await movie.save();
      // send updated movie
      res.status(201).json(updatedMovie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete Movie

const deleteMovie = expressAsyncHandler(async (req, res) => {
  try {
    // find the movie by id
    const movie = await Movie.findById(req.params.id);
    // if the movie found delete it
    if (movie) {
      await movie.deleteOne();
      res.json({ message: "Movie Deleted" });
    }
    // else send error message to the client
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Create Movie

const createMovie = expressAsyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      image,
      desc,
      titleImage,
      rate,
      numberOfReviews,
      category,
      language,
      year,
      time,
      video,
      casts,
    } = req.body;

    // create new movie
    const movie = new Movie({
      name,
      image,
      desc,
      titleImage,
      rate,
      numberOfReviews,
      category,
      language,
      year,
      time,
      video,
      casts,
      userId: req.user._id,
    });
    if (movie) {
      // save movie in database
      const createdMovie = await movie.save();
      // send created movie
      res.status(201).json(createdMovie);
    } else {
      res.status(400);
      throw new Error("Invalid movie data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete All Movies

const deleteAllMovies = expressAsyncHandler(async (req, res) => {
  try {
    // delete all movies
    await Movie.deleteMany({});
    res.json({ message: "All movies removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  importMovies,
  getMovies,
  getMovieById,
  getTopRatedMovies,
  getRandomMovies,
  createMovieReview,
  updateMovie,
  deleteMovie,
  createMovie,
  deleteAllMovies,
};
