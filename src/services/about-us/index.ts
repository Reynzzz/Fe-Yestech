/* eslint-disable no-unused-vars */
import endpoint from '../endpoint'
import { GET } from '../method'

// Vehicle List
// const getVehicleList = (search: string, currentPage: number, sizePage: number) =>
//   GET(`${endpoint.vehicleList}?SEARCH=${search.toUpperCase()}&PAGE=${currentPage}&PERPAGE=${sizePage}`)const get

const getHistory = () => GET(endpoint.history)

const getWarehouse = () => GET(endpoint.warehouse)

const ABOUTUS = {
  getHistory,
  getWarehouse
}
export default ABOUTUS
