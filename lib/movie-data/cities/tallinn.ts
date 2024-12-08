import { JSONFromURL, XML2JSONFromURL } from ".."
import { ApolloJSON } from "../cinemas/apollo-types"
import { ArtisJSON } from "../cinemas/artis-types"
import { ViimsiXML } from "../cinemas/viimsi-types"


// apollokino default json
// if need xml use XML2JSONFromURL()
const urlApollo = "https://www.apollokino.ee/xml/Schedule?area=1004&nrOfDays=31"
const urlArtis = "https://www.kino.ee/xml/Schedule?nrOfDays=31"
const urlViimsi = "https://www.viimsikino.ee/xml/Schedule?nrOfDays=31"

export function getTallinnSchedule(): [
    Promise<ApolloJSON>,
    Promise<ArtisJSON>,
    Promise<ViimsiXML>
  ] {
  return [JSONFromURL<ApolloJSON>(urlApollo), JSONFromURL<ArtisJSON>(urlArtis), XML2JSONFromURL<ViimsiXML>(urlViimsi)]
}