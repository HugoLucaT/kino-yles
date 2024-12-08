import { getTartuSchedule } from "@/lib/movie-data/cities/tartu";
import { removeSpecialCharacters } from "@/lib/utils";
import Link from "next/link";
import CityFormat from "./CityFormat";

export default async function Tartu() {
  try {
    const data = await getTartuSchedule();

    return (
      <div className="grid gap-4 grid-cols-8 p-4">
        {data.Shows.map((show, index) => (
          <CityFormat show={show} index={index} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return <p>Error loading schedule data</p>;
  }
}
