import { Link } from 'react-router-dom'
import { IProduct } from '../../types/IProduct'
import { useEffect, useState } from 'react'
import PRODUCT from '../../services/product'
import Skeleton from '../../components/atoms/Skeleton'
import { IParamsProduct } from '../../types/IWarehouse'
import { BASE_API } from '../../config/env'

interface IRelatedProduct {
  paramsProduct: IParamsProduct
}
const RelatedProduct: React.FC<IRelatedProduct> = ({ paramsProduct }) => {
  const [dataProduct, setDataProduct] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchDataProduct = async (params: IParamsProduct) => {
    setIsLoading(true)
    try {
      const response = await PRODUCT.getAllProduct(params)
      const data = await response
      setDataProduct(data.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error:', error)
    }
  }

  useEffect(() => {
    fetchDataProduct(paramsProduct)
  }, [paramsProduct])

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <section className=" overflow-auto mx-auto w-[90%] lg:w-[80%] flex-center flex-col my-10 md:my-20 h-min">
      <div className="flex-col w-full gap-5 mb-5 flex-center ">
        <h3 className="text-2xl font-bold text-center md:text-3xl text-secondary">RELATED PRODUCT & ACCESSORIES</h3>
      </div>
      <div className="grid grid-cols-2 gap-5 overflow-hidden md:gap-10 lg:grid-cols-3 ">
        {dataProduct?.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/detail-product/${item.id}`}
              className="cursor-pointer hover:shadow-md transition-all product-item h-[308px] md:w-[305px] md:h-[435px] 2xl:w-[305px] 2xl:h-[435px]   overflow-hidden flex  flex-col"
            >
              <img
                src={`${BASE_API}/${item?.mainImg[0].link}`}
                alt={item?.name}
                className="h-[152px] md:h-[305px] w-[152px] md:w-[305px] "
              />
              <div className="px-2 md:px-5">
                <h3 className="text-xl font-bold text-black md:text-2xl ">{item?.name}</h3>
                <div className="gap-2 mt-3 text-[10px] font-semibold md:text-sm flex-flex-col">
                  <p className="line-clamp-1" dangerouslySetInnerHTML={{__html : item?.detailsHome}}/>
                  <p className="line-clamp-1">{item?.categoryProduct?.name}</p>
                  <p className="line-clamp-1">{item?.Type?.name}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default RelatedProduct
