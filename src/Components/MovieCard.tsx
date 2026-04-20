import type { CardInterface } from "../Ineterfaces/CardInterface";

const MovieCard = ({ img, title, rating, type, year }: CardInterface) => {
  return (
    <div className="movie-card">
      <img
        src={
          img
            ? `https://image.tmdb.org/t/p/w500${img}`
            : "src/assets/no-movie.png"
        }
        alt={`${title} poster`}
      />
      <h3>{title}</h3>
      <div className="content">
        <div className="rating">
          <img src="src/assets/star.svg" alt="Star icon" />
          <p>{rating ? rating.toFixed(1) : "N/A"}</p>
        </div>
        <span>{type}</span>
        <span>-</span>
        <span>{year ? year.split("-")[0] : "N/A"}</span>
      </div>
    </div>
  );
};

export default MovieCard;
