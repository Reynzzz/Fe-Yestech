import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICategory, IProduct } from '../../types/IProduct'
import PRODUCT from '../../services/product'
import { IParamsProduct } from '../../types/IWarehouse'
import Skeleton from '../../components/atoms/Skeleton'
import { BASE_API } from '../../config/env'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const LIMIT_PAGE = 12

const ProductBanner = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dataProduct, setDataProduct] = useState<IProduct[]>([])
  const [categoryProduct, setCategoryProduct] = useState<ICategory[]>([])
  const [currentCategory, setCurrentCategory] = useState<string>('')
  const [currentNameCategory, setCurrentNameCategory] = useState<string>('')
  const [currentProduct, setCurrentProduct] = useState<IProduct>({} as IProduct)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const [params, setParams] = useState<IParamsProduct>({
    category: '',
    search: '',
    page: 1,
    limit: LIMIT_PAGE,
    type: 'all'
  })

  const fetchDataProduct = async (newParams: IParamsProduct) => {
    setIsLoading(true)

    try {
      const response = await PRODUCT.getAllProduct(newParams)
      const data = await response

      const products = data?.data || []

      setDataProduct(products)
      setCurrentProduct(products[0] || ({} as IProduct))
      setCurrentImageIndex(0)

      setParams({
        ...newParams,
        page: data.currentPage
      })

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
      setCurrentNameCategory(data?.[0]?.name || '')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error:', error)
    }
  }

  const handlePrev = () => {
    if (!dataProduct.length) return

    const currentIndex = dataProduct.findIndex((product) => product.id === currentProduct?.id)
    const newIndex = currentIndex > 0 ? currentIndex - 1 : dataProduct.length - 1

    setCurrentProduct(dataProduct[newIndex])
    setCurrentImageIndex(0)
  }

  const handleNext = () => {
    if (!dataProduct.length) return

    const currentIndex = dataProduct.findIndex((product) => product.id === currentProduct?.id)
    const newIndex = currentIndex < dataProduct.length - 1 ? currentIndex + 1 : 0

    setCurrentProduct(dataProduct[newIndex])
    setCurrentImageIndex(0)
  }

  const handleChangeCategory = (category: ICategory) => {
    setCurrentCategory(String(category.id))
    setCurrentNameCategory(category.name)
    setDropdownOpen(false)
  }

  useEffect(() => {
    const updatedParams = {
      ...params,
      category: currentCategory,
      page: 1
    }

    setParams(updatedParams)
    fetchDataProduct(updatedParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory])

  useEffect(() => {
    fetchCategory()
  }, [])

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <section className="container relative top-10 h-min w-full overflow-hidden rounded-[20px] border md:rounded-[0px] md:border-0">
      <h2 className="my-5 px-5 text-left text-lg font-bold text-[#CCCCCC] md:my-8 md:px-0 md:text-center md:text-3xl">
        Product
      </h2>

      {/* Versi Mobile */}
      <div className="absolute right-5 top-[1.40rem] w-30 md:hidden">
        <button
          className="flex w-full items-center justify-center gap-3 text-center text-[15px] font-bold text-primary"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          type="button"
        >
          <span>{currentNameCategory}</span>

          <svg
            className={`h-4 w-4 transform transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
            fill="primary"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {dropdownOpen && (
          <ul className="absolute right-0 z-10 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
            {categoryProduct?.map((category) => (
              <li
                key={category.id}
                onClick={() => handleChangeCategory(category)}
                className="cursor-pointer p-2 font-normal text-black"
              >
                {category?.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between px-5 pt-5 md:hidden">
        <button type="button" onClick={handlePrev}>
          <img src="/icons/mobile/arrow-left-grey.svg" alt="icon left mobile" className="w-full rotate-180" />
        </button>

        <h3 className="text-xl font-bold text-black">{currentProduct?.name}</h3>

        <button type="button" onClick={handleNext}>
          <img src="/icons/mobile/arrow-left-grey.svg" alt="icon right mobile" className="w-full" />
        </button>
      </div>

      {/* Versi Desktop */}
      <div className="flex w-full flex-col md:flex-row">
        <div className="hidden w-full flex-col md:flex md:w-[42%]">
          <div className="flex h-[409px]">
            <ul className="h-full w-[50%] overflow-y-auto border-r">
              {categoryProduct?.map((category) => (
                <li
                  key={category.id}
                  className={`cursor-pointer p-5 text-center ${
                    String(category.id) === currentCategory
                      ? 'bg-[#F1F1F1] font-bold text-[#222222]'
                      : 'font-normal text-black'
                  }`}
                  onClick={() => handleChangeCategory(category)}
                >
                  {category.name}
                </li>
              ))}

              <li className="w-full flex-shrink-0 cursor-not-allowed rounded-none p-3 px-4 text-center text-slate-300 md:rounded-md">
                DOOH
              </li>

              <li className="w-full flex-shrink-0 cursor-not-allowed rounded-none p-3 px-4 text-center text-slate-300 md:rounded-md">
                Commercial
              </li>

              <li className="w-full flex-shrink-0 cursor-not-allowed rounded-none p-3 px-4 text-center text-slate-300 md:rounded-md">
                Fine Pixel Pitch
              </li>
            </ul>

            <ul className="flex w-[50%] flex-col gap-3 overflow-y-auto p-5">
              {dataProduct?.map((product) => (
                <li
                  key={product.id}
                  onMouseEnter={() => {
                    setCurrentProduct(product)
                    setCurrentImageIndex(0)
                  }}
                  className={`cursor-pointer text-black ${
                    product?.id === currentProduct?.id ? 'font-bold' : 'font-normal'
                  }`}
                >
                  {product?.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden w-full flex-col items-center justify-center border-t p-14 text-md font-normal text-black md:flex">
            {/* Optional product specification */}
          </div>
        </div>

        <div className="w-full border-l md:w-[58%]">
          <div className="flex w-full flex-col-reverse justify-between md:flex-row">
            <ul className="flex flex-row gap-3 overflow-x-auto overflow-y-auto p-5 md:flex-col md:overflow-x-hidden md:overflow-y-auto">
              {currentProduct?.mainImg?.map((image, index) => (
                <li key={index} className="w-[49px] cursor-pointer" onClick={() => setCurrentImageIndex(index)}>
                  <img src={`${BASE_API}/${image.link}`} alt="product thumbnail" className="w-full object-cover" />
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
              className="mx-auto h-full w-full overflow-hidden"
            >
              {currentProduct?.mainImg?.map((image, index) => (
                <div key={index} className="h-auto w-full">
                  <img
                    src={`${BASE_API}/${image.link}`}
                    alt="product"
                    className="h-[209px] w-[450px] object-contain object-center md:h-[409px] md:w-[550px]"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="flex w-full flex-col border-t pt-5 md:flex-row flex-between">
            <div className="flex w-full flex-col gap-2 px-5 pb-5 md:w-[80%]">
              <h4 className="text-xl font-bold">{currentProduct?.name}</h4>

              <div
                className="line-clamp-3 text-sm font-normal"
                dangerouslySetInnerHTML={{ __html: currentProduct?.detailsHome || '' }}
              />
            </div>

            <div className="flex w-full items-center justify-between gap-5 ps-5 md:w-min md:justify-end md:gap-0">
              <Link
                to={`/detail-product/${currentProduct?.id}`}
                className="mr-5 flex h-[5.5rem] w-[8.2rem] flex-col gap-1 rounded-full border-2 border-primary pt-0 font-normal md:mr-0 md:flex md:h-32 md:w-32 md:gap-2 md:border-slate-300 md:pt-4 flex-center"
              >
                <div className="hidden md:flex">
                  <img
                    src="/icons/arrow-right-rotate.svg"
                    alt="icon arrow rotate"
                    className="w-10 text-black md:w-full"
                  />
                </div>
                <div className="w-full ps-2 md:hidden flex-center">
                  <img
                    src="/icons/mobile/arrow-left-blue.svg"
                    alt="icon arrow mobile"
                    className="w-10 text-black md:w-full"
                  />
                </div>
                Detail
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pb-5 md:pb-0 flex-center">
        <Link
          to="/products"
          className="mx-auto mt-5 w-[90%] rounded-full border-2 border-primary py-2 text-center font-semibold button-primary md:w-60 md:px-12"
        >
          See All Products
        </Link>
      </div>
    </section>
  )
}

export default ProductBanner
