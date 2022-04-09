import { Genre } from '../@types/genre';
import { Button } from './Button';

export interface SideBarProps {
  selectedGenreId: number
  genres: Genre[]
  onSelectedGenre: (genreId: number) => void
}

export function SideBar({ genres, selectedGenreId, onSelectedGenre } : SideBarProps) {
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onSelectedGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}