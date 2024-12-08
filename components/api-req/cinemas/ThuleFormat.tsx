import MainPageMovie from "@/components/movie/MainpageMovie";
import { getThuleEvents } from "@/lib/event-data/cinemas/thule-events";

export async function ThuleFormat() {
  const thuleMovies = await getThuleEvents();

  return (
    <>
      <h1 className="bold italic text-6xl">Thule Filmid</h1>
      <br />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {thuleMovies.Events.Event.map((movie, index) => (
          <MainPageMovie key={index} {...movie} />
        ))}
      </div>
    </>
  );
}
