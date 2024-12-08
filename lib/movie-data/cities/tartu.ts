import { JSONFromURL } from ".."
import { ApolloJSON } from "../cinemas/apollo-types"

// apollokino default json
// if need xml use XML2JSONFromURL()

const url = "https://www.apollokino.ee/xml/Schedule?area=1015&nrOfDays=31"

export function getTartuSchedule() {
  return JSONFromURL<ApolloJSON>(url)
}