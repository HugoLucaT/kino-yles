import MainPageMovie from "@/components/movie/MainpageMovie";
import { getArtisEvents } from "@/lib/event-data/cinemas/artis-events";

export async function ArtisFormat() {
  const artisMovies = await getArtisEvents();

  return (
    <>
      <h1 className="bold italic text-6xl">Artise Filmid</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {artisMovies.map((movie, index) => (
          <MainPageMovie key={index} {...movie} />
        ))}
      </div>
    </>
  );
}
