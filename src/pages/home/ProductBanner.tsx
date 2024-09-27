import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICategory, IProduct } from '../../types/IProduct'
import PRODUCT from '../../services/product'
import { IParamsProduct } from '../../types/IWarehouse'
import Skeleton from '../../components/atoms/Skeleton'
import { BASE_API } from '../../config/env'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const ProductBanner = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dataProduct, setDataProduct] = useState<IProduct[]>([])
  const [categoryProduct, setCategoryProduct] = useState<ICategory[]>([])
  const [currentCategory, setCurrentCategory] = useState<string>('')
  const [currentNameCategory, setCurrentNameCategory] = useState<string>('')
  const [currentProduct, setCurrentProduct] = useState<IProduct>({} as IProduct)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentProductIndex, setCurrentProductIndex] = useState<number>(0)
  console.log('🚀 ~ ProductBanner ~ currentProductIndex:', currentProductIndex)

  const [totalPages, setTotalPages] = useState(0)
  console.log('🚀 ~ ProductBanner ~ totalPages:', totalPages)

  const LIMIT_PAGE = 12
  const [params, setParams] = useState({
    category: '',
    search: '',
    page: 1,
    limit: LIMIT_PAGE,
    type: 'all'
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchDataProduct = async (params: IParamsProduct) => {
    setIsLoading(true)
    try {
      const response = await PRODUCT.getAllProduct(params)
      const data = await response
      setDataProduct(data.data)
      setCurrentProduct(data.data[0])
      setParams({
        ...params,
        page: data.currentPage
      })
      setTotalPages(data.totalPages)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error:', error)
    }
  }

  const fetchCategory = async () => {
    try {
      const response = await PRODUCT.getAllCategory()
      const data = await response
      setCategoryProduct(data)
      setCurrentNameCategory(data[0].name)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error:', error)
    }
  }

  const handlePrev = () => {
    setCurrentProductIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : dataProduct.length - 1
      setCurrentProduct(dataProduct[newIndex])
      return newIndex
    })
  }

  const handleNext = () => {
    setCurrentProductIndex((prevIndex) => {
      const newIndex = prevIndex < dataProduct.length - 1 ? prevIndex + 1 : 0
      setCurrentProduct(dataProduct[newIndex])
      return newIndex
    })
  }

  useEffect(() => {
    const updatedParams = { ...params, category: currentCategory }
    setParams(updatedParams)
    fetchDataProduct(updatedParams)
  }, [currentCategory])

  useEffect(() => {
    fetchCategory()
  }, [])

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <section className="container  top-10 relative w-full  h-min  overflow-hidden border md:border-0 md:rounded-[0px] rounded-[20px]">
      <h2 className="my-5 md:my-8 text-lg md:text-3xl font-bold md:text-center text-[#CCCCCC] text-left px-5 md:px-0">
        Product
      </h2>

      {/* Versi Mobile */}
      <div className="absolute w-30 top-[1.40rem] right-5 md:hidden">
        <button
          className="flex items-center justify-center w-full gap-3 text-[15px] font-bold text-center text-primary "
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>{currentNameCategory}</span>
          <svg
            className={`w-4 h-4 transition-transform transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
            fill="primary"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {dropdownOpen && (
          <ul className="absolute right-0 z-10 w-48 py-2 mt-2 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            {categoryProduct?.map((category) => (
              <li
                key={category.id}
                onClick={() => {
                  setCurrentCategory(String(category?.id))
                  setCurrentNameCategory(category?.name)
                }}
                className="p-2 font-normal text-black"
              >
                {category?.name}
              </li>
            ))}
          </ul>
        )}
        
      </div>

      <div className="flex items-center justify-between px-5 pt-5 md:hidden">
        <div className="" onClick={handlePrev}>
          <img src="/icons/mobile/arrow-left-grey.svg" alt="icon left mobile" className="w-full rotate-180" />
        </div>
        <h3 className="text-xl font-bold text-black">{currentProduct?.name}</h3>
        <div className="" onClick={handleNext}>
          <img src="/icons/mobile/arrow-left-grey.svg" alt="icon left mobile" className="w-full" />
        </div>
      </div>
      {/* Versi dekstop */}
      <div className="flex flex-col w-full md:flex-row">
        <div className="hidden md:flex flex-col w-full md:w-[42%]">
          <div className="flex  h-[409px] ">
            <ul className="w-[50%] h-full overflow-y-auto border-r">
              {categoryProduct?.map((category) => (
                <li
                  key={category.id}
                  className={`cursor-pointer p-5 text-center  ${String(category.id) === currentCategory ? 'font-bold bg-[#F1F1F1] text-[#222222' : 'text-black font-normal'}`}
                  onClick={() => setCurrentCategory(String(category.id))}
                >
                  {category.name}
                </li>
              ))}
               <li className='cursor-not-allowed flex-shrink-0 p-3 px-4 text-center rounded-none md:rounded-md md:w-full text-slate-300'>
              DOOH
            </li>
            <li className='cursor-not-allowed flex-shrink-0 p-3 px-4 text-center rounded-none md:rounded-md md:w-full text-slate-300'>
              Commercial
            </li>
            <li className='cursor-not-allowed flex-shrink-0 p-3 px-4 text-center rounded-none md:rounded-md md:w-full text-slate-300'>
              Fine Pixel Pitch
            </li>
            </ul>
            <ul className="w-[50%]  overflow-y-auto p-5 gap-3">
              {dataProduct?.map((product) => (
                <li
                  key={product.id}
                  // onClick={() => setCurrentProduct(product)}
                  onMouseEnter={() => setCurrentProduct(product)}
                  className={`${product?.id === currentProduct?.id ? 'font-bold' : ' font-normal'} text-black cursor-pointer`}
                >
                  {product?.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-col items-center justify-center hidden w-full font-normal text-black border-t p-14 md:flex text-md">
            {/* <p>Pixel pitch: 2.9/3.9/5.9mm </p>
            <p>Cabinet size: 500*500*73mm</p> */}
          </div>
        </div>

        <div className="md:w-[58%] w-full border-l">
          <div className="flex flex-col-reverse justify-between w-full md:flex-row">
            <ul className="flex flex-row gap-3 p-5 overflow-x-auto overflow-y-auto md:overflow-y-auto md:flex-col md:overflow-x-hidden">
              {currentProduct?.mainImg?.map((image, index) => (
                <li key={index} className="w-[49px]  cursor-pointer  " onClick={() => setCurrentImageIndex(index)}>
                  <img src={`${BASE_API}/${image.link}`} alt="product 1" className="object-cover w-full " />
                </li>
              ))}
            </ul>

            <Carousel
              infiniteLoop
              selectedItem={currentImageIndex}
              showThumbs={false}
              showStatus={false}
              renderArrowPrev={() => null}
              renderArrowNext={() => null}
              className="w-full h-full mx-auto overflow-hidden "
            >
              {currentProduct?.mainImg?.map((image, index) => (
                <div key={index} className="w-full h-auto">
                  <img
                    src={`${BASE_API}/${image.link}`}
                    alt="product"
                    // h-[309px]
                    className=" h-[209px]  md:h-[409px] w-[450px] md:w-[550px] object-contain object-center"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="flex-col w-full pt-5 border-t md:flex-row flex-between">
            <div className="flex flex-col gap-2 px-5 pb-5 w-full md:w-[80%]">
              <h4 className="text-xl font-bold">{currentProduct?.name}</h4>
              <div className="text-sm font-normal line-clamp-3" dangerouslySetInnerHTML={{__html : currentProduct?.detailsHome}}/>
            </div>
            <div className="flex items-center justify-between w-full gap-5 ps-5 md:justify-end md:gap-0 md:w-min">
              {/* <div className="flex-col items-start justify-center md:0 w-[90%] font-normal text-black  md:hidden text-sm">
                <p>Pixel pitch: 2.9/3.9/5.9mm </p>
                <p>Cabinet size: 500*500*73mm</p>
              </div> */}
              <Link
                to={`/detail-product/${currentProduct?.id}`}
                className="flex-col w-[8.2rem] h-[5.5rem] gap-1 md:gap-2 pt-0 md:pt-4 font-normal border-2 rounded-full border-primary md:border-slate-300 md:flex md:w-32 md:mr-0 mr-5 md:h-32 flex-center "
              >
                <div className="hidden md:flex">
                  <img
                    src="/icons/arrow-right-rotate.svg"
                    alt="ivon left rotate"
                    className="w-10 text-black md:w-full "
                  />
                </div>
                <div className="w-full flex-center ps-2 md:hidden">
                  <img
                    src="/icons/mobile/arrow-left-blue.svg"
                    alt="ivon left rotate"
                    className="w-10 text-black md:w-full "
                  />
                </div>
                Detail
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pb-5 md:pb-0 flex-center ">
        <Link
          to="/products"
          className="w-[90%] mx-auto py-2 mt-5 font-semibold text-center border-2 rounded-full md:w-60 md:px-12 button-primary border-primary"
        >
          See All Products
        </Link>
      </div>
    </section>
  )
}

export default ProductBanner
