import { getThuleEvents } from "@/lib/event-data/cinemas/thule-events";
import { removeSpecialCharacters } from "@/lib/utils";
import Link from "next/link";

export default async function Thule() {
  try {
    const data = await getThuleEvents();
    return (
      <div>
        <h1>Schedule</h1>
        {data.Events.Event.map((event, index) => (
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
