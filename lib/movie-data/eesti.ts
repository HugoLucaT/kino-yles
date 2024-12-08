import { JSONFromURL, XML2JSONFromURL } from "."
import { EventsData } from "../event-data/cinemas/event-types"
import { getApolloSchedule } from "./cinemas/apollo"
import { ApolloJSON } from "./cinemas/apollo-types"
import { ArtisJSON } from "./cinemas/artis-types"
import { ThuleXML } from "./cinemas/thule-types"
import { ViimsiXML } from "./cinemas/viimsi-types"


// apollokino default json
// if need xml use XML2JSONFromURL()
const urlApollo = "https://www.apollokino.ee/xml/Schedule?area=1004&nrOfDays=31"
const urlArtis = "https://www.kino.ee/xml/Schedule?nrOfDays=31"
const urlViimsi = "https://www.viimsikino.ee/xml/Schedule?nrOfDays=31"
const urlThule = "https://pilet.thulekoda.ee/xml/Schedule?nrOfDays=31"

const urlAritsEvents = "https://www.kino.ee/xml/Events?includePictures=true"
const urlViimsiEvents = "https://www.viimsikino.ee/xml/Events?includePictures=true"
const urlThuleEvents = "https://pilet.thulekoda.ee/xml/Events?includePictures=true"



export function getEstoniaSchedule(): [
    Promise<ApolloJSON>,
    Promise<ArtisJSON>,
    Promise<ViimsiXML>,
    Promise<ThuleXML>
  ] {
    const apolloData: Promise<ApolloJSON> = getApolloSchedule()
  return [apolloData, JSONFromURL<ArtisJSON>(urlArtis), XML2JSONFromURL<ViimsiXML>(urlViimsi), XML2JSONFromURL<ThuleXML>(urlThule)]
}

export function getEstoniaEvents(): [
    Promise<Event[]>,
    Promise<EventsData>,
    Promise<EventsData>
  ] {
  return [JSONFromURL<Event[]>(urlAritsEvents), XML2JSONFromURL<EventsData>(urlViimsiEvents),  XML2JSONFromURL<EventsData>(urlThuleEvents)]
}