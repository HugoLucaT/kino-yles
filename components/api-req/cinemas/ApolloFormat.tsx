import MainPageMovie from "@/components/movie/MainpageMovie";
import { getApolloEvents } from "@/lib/event-data/cinemas/apollo-events";

export async function ApolloFormat() {
  const apolloMovies = await getApolloEvents();

  return (
    <>
      <h1 className="bold italic text-6xl">Apollo Filmid</h1>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {apolloMovies.map((movie, index) => (
          <MainPageMovie key={index} {...movie} />
        ))}
      </div>
    </>
  );
}
