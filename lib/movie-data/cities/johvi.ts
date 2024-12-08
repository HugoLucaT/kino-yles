import { JSONFromURL } from ".."
import { ApolloJSON } from "../cinemas/apollo-types"

// apollokino default json
// if need xml use XML2JSONFromURL()
const url = "https://www.apollokino.ee/xml/Schedule?area=1019&nrOfDays=31"

export function getJohviSchedule() {
  return JSONFromURL<ApolloJSON>(url)
}