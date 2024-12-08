import { XML2JSONFromURL } from "@/lib/movie-data"
import { EventsData } from "./event-types"

// apollokino default json
// if need xml use XML2JSONFromURL()
const url = "https://pilet.thulekoda.ee/xml/Events?includePictures=true"

export function getThuleEvents() {
  return XML2JSONFromURL<EventsData>(url)
}