import { JSONFromURL } from ".."
import { ApolloJSON } from "./apollo-types"

// apollokino default json
// if need xml use XML2JSONFromURL()
const url = "https://www.apollokino.ee/xml/Schedule?"

const endpoints = [
  "https://www.apollokino.ee/xml/Schedule?nrOfDays=31", 
  "https://www.apollokino.ee/xml/Schedule?area=1015&nrOfDays=31", 
  "https://www.apollokino.ee/xml/Schedule?area=1002&nrOfDays=31", 
  "https://www.apollokino.ee/xml/Schedule?area=1012&nrOfDays=31", 
  "https://www.apollokino.ee/xml/Schedule?area=1008&nrOfDays=31", 
  "https://www.apollokino.ee/xml/Schedule?area=1019&nrOfDays=31",
  "https://www.apollokino.ee/xml/Schedule?area=1025&nrOfDays=31"
]

export async function getApolloSchedule(): Promise<ApolloJSON> {
  const fetchPromises = endpoints.map((endpoint) => JSONFromURL<ApolloJSON>(endpoint));
  const results = await Promise.all(fetchPromises);
  return mergeApolloJSON(...results);
}

export function getApolloEventSchedule(params: string) {
  return JSONFromURL<ApolloJSON>(url + params)
}

function mergeApolloJSON(...responses: ApolloJSON[]): ApolloJSON {
  return {
    PubDate: responses[0]?.PubDate || new Date().toISOString(),
    Shows: responses.flatMap((response) => response.Shows),
  };
}
