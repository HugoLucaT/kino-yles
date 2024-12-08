import { JSONFromURL } from "@/lib/movie-data"
import { Event } from "./event-types"

// apollokino default json
// if need xml use XML2JSONFromURL()
const url = "https://www.kino.ee/xml/Events?includePictures=true"

export function getArtisEvents() {
  return JSONFromURL<Event[]>(url)
}