import { IParamsProduct } from '../../types/IWarehouse'
import endpoint from '../endpoint'
import { GET, GETDETAIL, GETPAGINATION } from '../method'

const getAllProduct = (params: IParamsProduct) => GETPAGINATION(endpoint.product, params)
const getDetailProduct = (id: number) => GETDETAIL(endpoint.detailProduct, id)
const getAllCategory = () => GET(endpoint.category)
const getAllTypeCategory = () => GET(endpoint.typeCategory)

const PRODUCT = {
  getAllProduct,
  getDetailProduct,
  getAllCategory,
  getAllTypeCategory
}

export default PRODUCT
