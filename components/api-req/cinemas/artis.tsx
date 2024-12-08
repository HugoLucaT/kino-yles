import { getArtisEvents } from "@/lib/event-data/cinemas/artis-events";
import { removeSpecialCharacters } from "@/lib/utils";
import Link from "next/link";

export default async function Artis() {
  try {
    const data = await getArtisEvents();

    return (
      <div>
        <h1>Schedule</h1>
        {data.map((event, index) => (
          <div key={index}>
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
            {event.Images.EventMediumImagePortrait && (
              <img
                src={event.Images.EventMediumImagePortrait}
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
