import MainPageMovie from "@/components/movie/MainpageMovie";
import { getViimsiEvents } from "@/lib/event-data/cinemas/viimsi-events";

export async function ViimsiFormat() {
  const viimsiMovies = await getViimsiEvents();

  return (
    <>
      <h1 className="bold italic text-6xl">Viimsi Filmid</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {viimsiMovies.Events.Event.map((movie, index) => (
          <MainPageMovie key={index} {...movie} />
        ))}
      </div>
    </>
  );
}
