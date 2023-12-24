"use client";

import { useCallback, useEffect, useState } from "react";
import React from "react";
import Nav from "@/components/Nav";
import axios from "axios";
import MovieCard from "@/components/cards/MovieCard";
const apiKey = process.env.REACT_APP_API_KEY;

const GenreMovie = ({ apiKey }) => {
  const currentURL = window.location.href;
  const urlSegments = currentURL.split("/");
  const lastSegment = urlSegments[urlSegments.length - 1];

  const [movies, setMovies] = useState([]);

  const getGenreId = useCallback(() => {
    if (lastSegment === "drama") {
      return 18;
    } else if (lastSegment === "horror") {
      return 27;
    } else if (lastSegment === "action") {
      return 28;
    } else if (lastSegment === "adventure") {
      return 12;
    } else if (lastSegment === "animation") {
      return 16;
    } else if (lastSegment === "comedy") {
      return 35;
    } else if (lastSegment === "crime") {
      return 80;
    } else if (lastSegment === "documentary") {
      return 99;
    } else if (lastSegment === "romance") {
      return 10749;
    } else if (lastSegment === "war") {
      return 10752;
    }
  }, [lastSegment]);

  useEffect(() => {
    const genreId = getGenreId();

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
      )
      .then((response) => {
        const fetchedMovies = response.data.results;
        setMovies(fetchedMovies);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [getGenreId, setMovies]);

  return (
    <div className="w-full">
      <Nav />
      <div className="w-full flex justify-center pt-10 pb-5">
        <h1 className="text-4xl">{lastSegment}</h1>
      </div>
      <div className="flex justify-center flex-wrap gap-2 pt-2">
        {movies.map((movie, index) => (
          <div key={index}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreMovie;