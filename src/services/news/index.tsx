import endpoint from '../endpoint'
import { GET, GETDETAIL } from '../method'

const getAllNews = () => GET(endpoint.news)
const getDetailNews = (id: number) => GETDETAIL(endpoint.detailNews, id)

const NEWS = {
  getAllNews,
  getDetailNews
}

export default NEWS
