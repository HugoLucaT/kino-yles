import { getTallinnSchedule } from "@/lib/movie-data/cities/tallinn";
import { removeSpecialCharacters } from "@/lib/utils";
import Link from "next/link";
import CityFormat from "./CityFormat";

export default async function Tallinn() {
  try {
    const [dataApollo, dataArtis, dataViimsi] =
      await Promise.all(getTallinnSchedule());
    return (
      <>
        <div className="grid gap-4 grid-cols-8 p-4">
          {dataApollo.Shows.map((show, index) => (
            <CityFormat show={show} index={index} />
          ))}
        </div>
        <div className="grid gap-4 grid-cols-8 p-4">
          {dataArtis.Shows.map((show, index) => (
            <CityFormat show={show} index={index} />
          ))}
        </div>
        <div className="grid gap-4 grid-cols-8 p-4">
          {dataViimsi.Schedule.Shows.Show.map((show, index) => (
            <CityFormat show={show} index={index} />
          ))}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return <p>Error loading schedule data</p>;
  }
}
