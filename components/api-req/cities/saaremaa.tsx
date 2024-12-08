import { getSaaremaaSchedule } from "@/lib/movie-data/cities/saaremaa";
import { removeSpecialCharacters } from "@/lib/utils";
import Link from "next/link";

export default async function Saaremaa() {
  try {
    const [dataThule, dataApollo] = await Promise.all(getSaaremaaSchedule());
    return (
      <div>
        <h1>Schedule</h1>
        {dataThule.Schedule.Shows.Show.map((show, index) => (
          <div key={index}>
            {/*<h2>{show.Title}</h2>*/}
            <Link
              href={`/saaremaa/${removeSpecialCharacters(show.OriginalTitle)}`}
            >
              {show.Title}
            </Link>
            <p>
              <strong>Original Title:</strong> {show.OriginalTitle}
            </p>
            <p>
              <strong>Show Time:</strong> {show.dttmShowStart}
            </p>
            <p>
              <strong>Location:</strong> {show.TheatreAndAuditorium}
            </p>
            <p>
              <strong>Genres:</strong> {show.Genres}
            </p>
            {show.Images.EventMediumImagePortrait && (
              <img
                src={show.Images.EventMediumImagePortrait}
                alt={show.Title}
                width="100"
              />
            )}
          </div>
        ))}
        {dataApollo.Shows.map((show, index) => (
          <div key={index}>
            {/*<h2>{show.Title}</h2>*/}
            <Link
              href={`/saaremaa/${show.Title.replace(/[\s:%.!@#$^&*()_=+\[\]{}|\\\-?.<>]+/g, "").toLowerCase()}`}
            >
              {show.Title}
            </Link>
            <p>
              <strong>Original Title:</strong> {show.OriginalTitle}
            </p>
            <p>
              <strong>Show Time:</strong> {show.dttmShowStart}
            </p>
            <p>
              <strong>Location:</strong> {show.TheatreAndAuditorium}
            </p>
            <p>
              <strong>Genres:</strong> {show.Genres}
            </p>
            {show.Images.EventMediumImagePortrait && (
              <img
                src={show.Images.EventMediumImagePortrait}
                alt={show.Title}
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
