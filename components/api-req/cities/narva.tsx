import { getNarvaSchedule } from "@/lib/movie-data/cities/narva";
import { removeSpecialCharacters } from "@/lib/utils";
import Link from "next/link";
import CityFormat from "./CityFormat";

export default async function Narva() {
  try {
    const data = await getNarvaSchedule();

    return (
      <div>
        <div className="grid gap-4 grid-cols-8 p-4">
          {data.Shows.map((show, index) => (
            <CityFormat show={show} index={index} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return <p>Error loading schedule data</p>;
  }
}
