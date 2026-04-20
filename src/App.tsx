import { useState, useEffect } from "react";
import "./App.css";
import Search from "./Components/Search";
import MovieCard from "./Components/MovieCard";
import { useDebounce } from "react-use";
import type { MovieInterface } from "./Ineterfaces/MovieInterface";

function App() {
  const [query, setquery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useDebounce(
    () => {
      setDebouncedQuery(query);
    },
    1000,
    [query],
  );

  useEffect(() => {
    const API_OPTION = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    const fetchMovies = async (query: string = "") => {
      setIsLoading(true);
      setErrorMsg("");

      try {
        const endPoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endPoint, API_OPTION);

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        if (data.results === "false") {
          setErrorMsg(data.Error || "Failed to fetch movies");
        } else {
          setMovies(data.results || []);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.error("Error fetching movies:", e);
        setErrorMsg(
          "there was an error fetching movies, please try again later",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies(debouncedQuery);
  }, [API_KEY, debouncedQuery]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="src/assets/hero.png" alt="Hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search query={query} setQuery={setquery} />
        </header>

        <section className="all-movies">
          <h2 className="my-15">All Movies</h2>
          {isLoading ? (
            <p className="text-white">Loading..... Wait bihh</p>
          ) : errorMsg ? (
            <p className="text-red-600">{errorMsg}</p>
          ) : (
            <ul>
              {movies.map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    img={movie.poster_path}
                    title={movie.original_title}
                    rating={movie.vote_average}
                    type={"Movie"}
                    year={movie.release_date}
                  />
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
