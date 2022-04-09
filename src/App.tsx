import { useEffect, useState } from 'react';

import { GenreName } from './@types/genre';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { Movie } from './@types/movie';

interface GenreResponseProps {
  id: number;
  name: GenreName;
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  function assembleMovies(movieItems: MovieProps[]): Movie[] {
    return movieItems.map<Movie>(item => ({
      id: item.imdbID,
      title: item.Title,
      poster: item.Poster,
      rating: item.Ratings[0].Value,
      runtime: item.Runtime
    }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar genres={genres} selectedGenreId={selectedGenreId} onSelectedGenre={handleClickButton} />
      <Content genreTitle={selectedGenre.name} movies={assembleMovies(movies)} />
    </div>
  )
}