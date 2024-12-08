import { getTallinnSchedule } from "@/lib/movie-data/cities/tallinn";
import { removeSpecialCharacters } from "@/lib/utils";
import Link from "next/link";

export default async function Tallinn() {
  try {
    const [dataApollo, dataArtis, dataViimsi] =
      await Promise.all(getTallinnSchedule());
    return (
      <div>
        <h1>Schedule</h1>
        {dataApollo.Shows.map((show, index) => (
          <div key={index}>
            {/*<h2>{show.Title}</h2>*/}
            <Link
              href={`/tallinn/${removeSpecialCharacters(show.OriginalTitle)}`}
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
        {dataArtis.Shows.map((show, index) => (
          <div key={index}>
            {/*<h2>{show.Title}</h2>*/}
            <Link
              href={`/tallinn/${show.Title.replace(/[\s:%.!@#$^&*()_=+\[\]{}|\\\-?.<>]+/g, "").toLowerCase()}`}
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
        {dataViimsi.Schedule.Shows.Show.map((show, index) => (
          <div key={index}>
            {/*<h2>{show.Title}</h2>*/}
            <Link
              href={`/tallinn/${show.Title.replace(/[\s:%.!@#$^&*()_=+\[\]{}|\\\-?.<>]+/g, "").toLowerCase()}`}
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
