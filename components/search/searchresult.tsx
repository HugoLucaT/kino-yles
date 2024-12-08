import { getApolloEvents } from "@/lib/event-data/cinemas/apollo-events";
import { getArtisEvents } from "@/lib/event-data/cinemas/artis-events";
import { getThuleEvents } from "@/lib/event-data/cinemas/thule-events";
import { getViimsiEvents } from "@/lib/event-data/cinemas/viimsi-events";
import { removeSpecialCharacters } from "@/lib/utils";
import Link from "next/link";

interface Data {
  Title: string;
  OriginalTitle: string;
  EventMediumImagePortrait: string;
  Rating: string;
  ShortSynopsis: string;
  Genres: string;
}

export default async function SearchResult(info: any) {
  const decodedMovie = decodeURIComponent(info.movie);
  console.log(decodedMovie);
  try {
    let data: Data[] = [];
    const eventData = await getApolloEvents();
    eventData.forEach((event) => {
      if (
        removeSpecialCharacters(event.OriginalTitle).includes(decodedMovie)
      ) {
        data.push({
          Title: event.Title,
          OriginalTitle: event.OriginalTitle,
          EventMediumImagePortrait: event.Images.EventMediumImagePortrait,
          Rating: event.Rating,
          ShortSynopsis: event.ShortSynopsis,
          Genres: event.Genres,
        });
      }
    });

    const artisEventData = await getArtisEvents();
    artisEventData.forEach((event) => {
      if (
        removeSpecialCharacters(event.OriginalTitle).includes(decodedMovie)
      ) {
        data.push({
          Title: event.Title,
          OriginalTitle: event.OriginalTitle,
          EventMediumImagePortrait: event.Images.EventMediumImagePortrait,
          Rating: event.Rating,
          ShortSynopsis: event.ShortSynopsis,
          Genres: event.Genres,
        });
      }
    });

    const viimsiEventData = await getViimsiEvents();
    viimsiEventData.Events.Event.forEach((event) => {
      if (
        removeSpecialCharacters(event.OriginalTitle).includes(decodedMovie)
      ) {
        data.push({
          Title: event.Title,
          OriginalTitle: event.OriginalTitle,
          EventMediumImagePortrait: event.Images.EventMediumImagePortrait,
          Rating: event.Rating,
          ShortSynopsis: event.ShortSynopsis,
          Genres: event.Genres,
        });
      }
    });

    const thuleEventData = await getThuleEvents();
    thuleEventData.Events.Event.forEach((event) => {
      if (
        removeSpecialCharacters(event.OriginalTitle).includes(decodedMovie)
      ) {
        data.push({
          Title: event.Title,
          OriginalTitle: event.OriginalTitle,
          EventMediumImagePortrait: event.Images.EventMediumImagePortrait,
          Rating: event.Rating,
          ShortSynopsis: event.ShortSynopsis,
          Genres: event.Genres,
        });
      }
    });

    return (
      <div>
        <h1>Movies</h1>
        {data.map((event, index) => (
          <div key={index}>
            {/*<h2>{event.Title}</h2>*/}
            <Link
              href={`/eesti/${removeSpecialCharacters(event.OriginalTitle)}`}
            >
              {event.Title}
            </Link>
            <p>
              <strong>Original Title:</strong> {event.OriginalTitle}
            </p>
            <p>
              <strong>Movie Rating:</strong> {event.Rating}
            </p>
            <p>
              <strong>Short description:</strong> {event.ShortSynopsis}
            </p>
            <p>
              <strong>Genres:</strong> {event.Genres}
            </p>
            {event.EventMediumImagePortrait && (
              <img
                src={event.EventMediumImagePortrait}
                alt={event.Title}
                width="100"
              />
            )}
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return <p>Error loading schedule data</p>;
  }
}
