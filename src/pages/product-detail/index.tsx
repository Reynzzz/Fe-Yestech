import RelatedProduct from './related-product'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IItemProduct, IProduct } from '../../types/IProduct'
import PRODUCT from '../../services/product'
import Skeleton from '../../components/atoms/Skeleton'
import { BASE_API } from '../../config/env'
import DownloadTable from './DownloadTable'
import { IParameters } from '../../types/IWarehouse'

type RenderContentProps = {
  layout: string
  item: IItemProduct
}
const DetailProduct = () => {
  const { id } = useParams()
  const [data, setdata] = useState<IProduct | null>(null)
  const [parameters, setParameters] = useState<IParameters[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const LIMIT_PAGE = 3
  const [params, setParams] = useState({
    category: '',
    search: '',
    page: 1,
    limit: LIMIT_PAGE,
    type: 'all'
  })

  const fetchData = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await PRODUCT.getDetailProduct(id)
      const data = await response

      
      setdata(data.data)
      setParameters(data?.data?.parameters)
      setParams({ ...params, category: data?.data?.categoryId, type: 'all' })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error:', error)
    }
  }

  useEffect(() => {
    fetchData(Number(id))
  }, [id])

  if (isLoading) {
    return <Skeleton />
  }

  const RenderContentSection: React.FC<RenderContentProps> = ({ layout, item }) => {
    switch (layout) {
      case 'teks-details-left-and-image-right':
        return (
          <section
  className={`overflow-auto mx-auto w-full md:w-[80%] flex flex-col md:flex-row gap-10 justify-between items-center mt-10 md:mt-20 h-min bg-${item?.background}`}
>
  {/* Kontainer teks */}
  <div className="flex flex-col items-start justify-start w-[90%] mx-auto  gap-3 md:gap-5 order-1 md:order-none">
    <h3 className="text-2xl font-bold md:text-3xl text-secondary line-clamp-1 md:line-clamp-none">
      {item?.title}
    </h3>
    <p className="text-sm font-normal md:text-md text-secondary w-full md:mt-3">
      {item?.description}
    </p>
  </div>
  {/* Kontainer gambar */}
  <div className="w-[90%] md:w-[60%] flex justify-end items-center mt-5 md:mt-0 order-2 md:order-none">
    {item?.images?.map((image, index) => (
      <img
        key={index}
        src={image?.url}
        alt="list detail"
        className="object-cover w-full rounded-lg h-auto"
      />
    ))}
  </div>
</section>

        )
      case 'teks-details-right-and-image-left':
        return (
          <section
  className={`overflow-auto mx-auto w-full md:w-[80%] flex flex-col md:flex-row gap-10 justify-between items-center mt-10 md:mt-20 h-min bg-${item?.background}`}
>
  {/* Kontainer teks */}
  <div className="flex flex-col mt-3 md:mt-0 items-start ps-0 md:ps-28 justify-start w-[90%] mx-auto  gap-2 md:gap-5 order-1 md:order-none">
    <h3 className="text-2xl font-bold text-start md:text-3xl text-secondary line-clamp-1 md:line-clamp-none">
      {item?.title}
    </h3>
    <p className="text-sm font-normal md:text-md text-secondary w-full  mt-0 md:mt-3">
      {item?.description}
    </p>
  </div>

  {/* Kontainer gambar */}
  <div className="w-[90%] md:w-[60%] flex justify-end items-end mt-5 md:mt-0 order-2 md:order-none">
    {item?.images?.map((image, index) => (
      <img key={index} src={image?.url} alt="list detail" className="object-cover w-full h-auto rounded-lg over" />
    ))}
  </div>
</section>

        )

      case 'teks-details-and-image-center':
        return (
          <section
          className={`overflow-auto mx-auto w-[90%] md:w-[80%] flex flex-col-reverse md:flex-col justify-center items-center mt-10 md:mt-20 h-min bg-${item?.background}`}
        >
          {/* Kontainer teks */}
          <div className="flex flex-col w-full gap-2 mb-5 md:gap-5 justify-center items-center order-2 md:order-1">
            <h3 className="text-2xl font-bold text-center md:text-3xl text-secondary line-clamp-1 md:line-clamp-none">
              {item?.title}
            </h3>
            <p className="text-sm font-normal text-center text-secondary">
              {item?.description}
            </p>
          </div>
          
          {/* Kontainer gambar */}
          <div className="flex justify-center w-full md:w-[80%] mx-auto order-1 md:order-2">
            {item?.images?.map((image, index) => (
              <img key={index} src={image?.url} className="object-cover w-full rounded-lg" alt="list detail" />
            ))}
          </div>
        </section>
        
        )

      default:
        return null
    }
  }

  return (
    <div className="relative overflow-hidden">
      <header className="w-full relative h-[582px] md:h-[552px] overflow-hidden bg-[url('/images/detail-product/banner-mobile.svg')] md:bg-[url('/images/products/banner-product.svg')] bg-center bg-no-repeat bg-cover rounded-br-[50px]">
        <img
          src="/images/detail-product/bg-linear-banner.png"
          alt="liner background detail"
          className="absolute top-0 bottom-0 left-0 hidden md:block"
        />
        <div className="container flex-col-reverse w-full h-full flex-between md:flex-row ">
          <div className="flex flex-col w-full md:w-[50%] -top-10 md:-top-0 relative gap-3 md:mt-16 md:ps-10">
            <h2 className="font-bold text-white text-3xl md:text-5xl  pb-0 md:pb-5 lg:text-[4rem] line-clamp-1 md:line-clamp-none">
              {data?.name}
            </h2>
            <div className="flex items-end justify-start ">
              <span className="w-40 h-[6px] bg-primary"></span>
              <span className="w-full h-[1px] bg-white"></span>
            </div>

            <div
  className="flex flex-col gap-1 text-sm font-normal text-white list-disc md:gap-3 md:my-5 ps-4 description-content"
  dangerouslySetInnerHTML={{ __html: data?.detailsHome || '' }} // Beri nilai default string kosong jika undefined
/>

           
            <button className="px-3 py-2 mt-5 font-semibold text-white transition-all border-2 border-white rounded-full hover:bg-primary hover:border-primary w-52 md:w-72">
              Request a Solition
            </button>
          </div>
          <div className=" flex items-center justify-end w-[80%]   md:w-[35%] mt-20 md:mt-0">
            <img src={`${BASE_API}/${data?.mainImg[0].link}`} alt={data?.name} className="object-cover w-full h-auto" />
          </div>
        </div>
      </header>

      <div className="md:w-[90%] mx-auto w-full">
        {data?.sections?.map((item, index) => {
          return (
            <div key={index} className="w-full mt-10">
              {<RenderContentSection layout={item?.layout} item={item} />}
            </div>
          )
        })}

        <DownloadTable parameters={parameters} />

        <RelatedProduct paramsProduct={params} />
      </div>
    </div>
  )
}

export default DetailProduct
