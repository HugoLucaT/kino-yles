import { XML2JSONFromURL } from ".."
import { ApolloJSON } from "../cinemas/apollo-types"

const url = "https://www.apollokino.ee/xml/Schedule?area=1025&nrOfDays=31"

export function getViljandiSchedule() {
  return XML2JSONFromURL<ApolloJSON>(url)
}