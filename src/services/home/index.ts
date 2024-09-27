/* eslint-disable no-unused-vars */
import endpoint from '../endpoint'
import { GET } from '../method'

// Vehicle List
// const getVehicleList = (search: string, currentPage: number, sizePage: number) =>
//   GET(`${endpoint.vehicleList}?SEARCH=${search.toUpperCase()}&PAGE=${currentPage}&PERPAGE=${sizePage}`)const get

const getBanner = () => GET(endpoint.banner)

const getCaseList = () => GET(endpoint.caseList)

const getOwner = () => GET(endpoint.owner)

const getCategoryOwner = () => GET(endpoint.categoryOwner)

const Home = {
  getBanner,
  getCaseList,
  getOwner,
  getCategoryOwner
}
export default Home
