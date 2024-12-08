import { XML2JSONFromURL } from "@/lib/movie-data"
import { EventsData } from "./event-types"

// apollokino default json
// if need xml use XML2JSONFromURL()
const url = "https://www.viimsikino.ee/xml/Events?includePictures=true"

export function getViimsiEvents() {
  return XML2JSONFromURL<EventsData>(url)
}