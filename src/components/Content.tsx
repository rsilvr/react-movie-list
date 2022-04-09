import { Movie } from '../@types/movie'
import { MovieCard } from './MovieCard'

interface ContentProps {
  genreTitle: string
  movies: Movie[]
}

export function Content({ genreTitle, movies } : ContentProps) {
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {genreTitle}</span></span>
      </header>
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.id} title={movie.title} poster={movie.poster} runtime={movie.runtime} rating={movie.rating} />
          ))}
        </div>
      </main>
    </div>
  )
}