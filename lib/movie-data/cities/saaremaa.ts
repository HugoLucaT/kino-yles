import { XML2JSONFromURL , JSONFromURL} from ".."
import { ThuleXML } from "../cinemas/thule-types"
import { ApolloJSON } from "../cinemas/apollo-types"

const urlThule = "https://pilet.thulekoda.ee/xml/Schedule?nrOfDays=31"
const urlApollo = "https://www.apollokino.ee/xml/Schedule?area=1012&nrOfDays=31"

export function getSaaremaaSchedule(): [
  Promise<ThuleXML>,
  Promise<ApolloJSON>] {
  return [XML2JSONFromURL<ThuleXML>(urlThule), JSONFromURL<ApolloJSON>(urlApollo)]
}