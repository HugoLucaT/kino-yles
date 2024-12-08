import { getSaaremaaSchedule } from "@/lib/movie-data/cities/saaremaa";
import { removeSpecialCharacters } from "@/lib/utils";
import Link from "next/link";
import CityFormat from "./CityFormat";

export default async function Saaremaa() {
  try {
    const [dataThule, dataApollo] = await Promise.all(getSaaremaaSchedule());
    return (
      <div>
        <div className="grid gap-4 grid-cols-8 p-4">
          {dataThule.Schedule.Shows.Show.map((show, index) => (
            <CityFormat show={show} index={index} />
          ))}
        </div>
        <div className="grid gap-4 grid-cols-8 p-4">
          {dataApollo.Shows.map((show, index) => (
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
