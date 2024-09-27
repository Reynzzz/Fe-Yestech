import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ICategory, IProduct, ITypeCategory } from '../../types/IProduct'
import PRODUCT from '../../services/product'
import { BASE_API } from '../../config/env'
import useDebounce from '../../hooks/useDebounce'
import { IParamsProduct } from '../../types/IWarehouse'
import ReactPaginate from 'react-paginate'
import Loading from '../../components/atoms/Loading'

const Product = () => {
  const [dataProduct, setDataProduct] = useState<IProduct[]>([])
  const [categoryProduct, setCategoryProduct] = useState<ICategory[]>([])
  const [currentCategory, setCurrentCategory] = useState<string>('')
  const [typeCategoryProduct, setTypeCategoryProduct] = useState<ITypeCategory[]>([])
  const [currentTypeCategory, setCurrentTypeCategory] = useState<string>('all')

  const [totalPages, setTotalPages] = useState(0)

  const LIMIT_PAGE = 12
  const [params, setParams] = useState({
    category: '',
    search: '',
    page: 1,
    limit: LIMIT_PAGE,
    type: 'all'
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  let query = searchParams.get('query') || ''

  const fetchDataProduct = async (params: IParamsProduct) => {
    setIsLoading(true)
    try {
      const response = await PRODUCT.getAllProduct(params)
      const data = await response
      setDataProduct(data.data)
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
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error:', error)
    }
  }

  const fetchTypeCategory = async () => {
    try {
      const response = await PRODUCT.getAllTypeCategory()
      const data = await response
      setTypeCategoryProduct(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error:', error)
    }
  }

  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery) {
      const updatedParams = { ...params, search: debouncedQuery }
      setParams(updatedParams)
      fetchDataProduct(updatedParams)
    } else {
      const updatedParams = { ...params, search: '', page: 1, limit: LIMIT_PAGE }
      setParams(updatedParams)
      fetchDataProduct(updatedParams)
    }
  }, [debouncedQuery])

  useEffect(() => {
    const updatedParams = { ...params, category: currentCategory, type: currentTypeCategory }
    setParams(updatedParams)
    fetchDataProduct(updatedParams)
  }, [currentCategory, currentTypeCategory])

  const changeSearchParams = (query: string) => {
    setSearchParams({ query: query })
  }
  const handleKeywordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    query = e.target.value
    changeSearchParams(query)
  }

  useEffect(() => {
    fetchCategory()
    fetchTypeCategory()
  }, [])
  const handlePageClick = (event: { selected: number }) => {
    const selectedPage = event.selected + 1
    const updatedParams = { ...params, page: selectedPage }
    setParams(updatedParams)
    fetchDataProduct(updatedParams)
  }

  const handleTypeCategoryChange = (id: string) => {
    if (currentTypeCategory === id) {
      setCurrentTypeCategory('')
    } else {
      setCurrentTypeCategory(id)
    }
  }

  return (
    <>
      <header className="w-full h-[351px] md:h-[391px] bg-center xs:bg-[url('/images/products/banner-product-mobile.svg')]   md:bg-[url('/images/products/banner-product.svg')] bg-cover rounded-br-[50px]">
        <div className="container flex-col w-full h-full pt-8 flex-between md:flex-row md:pt-0">
          <div className="flex flex-col w-full  md:w-[45%] gap-3 mt-16 ps-0 md:ps-10 text-center md:text-left">
            <h2 className="font-bold text-white text-3xl  md:text-5xl lg:text-[5rem] md:mb-5  mb-0">Products</h2>
            <p className="text-white text-center font-semibold w-full text-sm md:text-[15px] md:w-[90%] lg:w-[70%]">
              YES TECH offers a wide range of competitive and cut-edge LED displays to meet your diverse needs.
            </p>
          </div>

          <div className="relative  flex items-center justify-end w-full md:w-[55%] gap-10 pt-0 md:pt-16 ">
            <img
              src="/images/products/product-display-banner.svg"
              className="absolute left-0 z-10 w-[238px] md:w-[339px]  lg:w-[539px] md:-mt-0 -mt-32"
            />
            <img
              src="/images/products/product-display-banner-right.svg"
              className="absolute right-0 md:-mt-0 -mt-32 w-[158px] lg:w-[389px] md:w-[200px] scale-100 lg:scale-100 md:scale-125"
            />
          </div>
        </div>
      </header>

      <section className="flex overflow-hidden flex-col items-start justify-between w-full gap-5 pt-8 md:w-[90%] mx-auto md:flex-row">
        {/* search versi mobile */}
        <div className="relative flex justify-end w-full md:hidden">
          <input
            value={query}
            onChange={handleKeywordChange}
            placeholder="Search Global"
            className="flex justify-end w-[90%] mx-auto md:w-[30%] border border-[#BCBCBC] rounded-full py-2 ps-4 pe-10 outline-none "
          />
          <div className="absolute text-center right-7 top-3 ">
            <img src="/icons/search.svg" alt="search icon" className="w-full" />
          </div>
        </div>

        <div className="w-full md:w-[30%] lg:w-[20%] overflow-x-auto p-0 md:p-4 bg-[#F8F8F8] mb-10">
          <ul className="flex flex-row w-full gap-3 overflow-x-scroll md:overflow-x-hidden md:flex-col">
            {categoryProduct?.map((category) => (
              <li
                key={category.id}
                className={`cursor-pointer flex-shrink-0 p-3 px-4 text-center rounded-none md:rounded-md md:w-full  ${String(category.id) === currentCategory ? 'bg-primary text-white' : 'text-slate-600'}`}
                onClick={() => setCurrentCategory(String(category.id))}
              >
                {category?.name}
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

          <h4 className="text-[#A4A4A4] text-sm font-semibold my-5 hidden md:block">Operating Environment</h4>

          <ul className="flex flex-row justify-center gap-5 my-5 md:justify-start md:flex-col md:my-0">
            <li
              className="flex items-center justify-start gap-3"
              onChange={() => handleTypeCategoryChange(String('all'))}
            >
              <input type="checkbox" id="all" name="all" className="w-4 h-4" checked={currentTypeCategory === 'all'} />
              <label htmlFor="all" className="text-[#222222] text-sm md:text-lg font-normal">
                all
              </label>
            </li>
            {typeCategoryProduct?.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex items-center justify-start gap-3"
                  onChange={() => handleTypeCategoryChange(String(item?.id))}
                >
                  <input
                    type="checkbox"
                    id={String(item?.id)}
                    name={item?.name}
                    className="w-4 h-4"
                    checked={currentTypeCategory === String(item?.id)}
                  />
                  <label htmlFor={String(item?.id)} className="text-[#222222] text-sm md:text-lg font-normal">
                    {item?.name}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="w-[90%] mx-auto md:[60%] lg:w-[80%]">
          {/* search versi dkstop */}
          <div className="relative justify-end hidden w-full md:flex">
            <input
              type="search"
              autoFocus
              value={query}
              onChange={handleKeywordChange}
              placeholder="Search Global"
              className="flex justify-end w-full md:w-[50%] lg:w-[30%] border border-[#BCBCBC] rounded-full py-2 ps-4 pe-10 outline-none "
            />
            <div className="absolute text-center right-4 top-3 ">
              <img src="/icons/search.svg" alt="search icon" className="w-full" />
            </div>
          </div>

          {isLoading ? (
            <Loading />
          ) : dataProduct?.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-10 gap-8 overflow-hidden border-0 md:border-t-2 border-[#DEDEDE] pt-5 mt-5">
              {dataProduct.map((product) => (
                <Link
                  key={product?.id}
                  to={`/detail-product/${product?.id}`}
                  className="cursor-pointer hover:shadow-md transition-all product-item h-[238px] md:w-[230px] xl:w-[305px] md:h-[405px] xl:h-[435px] 2xl:w-[305px] 2xl:h-[435px] overflow-hidden flex flex-col"
                >
                  <img
                    src={`${BASE_API}/${product.mainImg[0]?.link}`}
                    alt={product?.name}
                    className="h-[152px] md:h-[305px] w-[152px] md:w-[305px] object-cover"
                  />

                  <div className="px-2 md:px-5">
                    <h3 className="h-8 mt-1 overflow-hidden font-bold text-black text-md line-clamp-1 md:line-clamp-3 md:text-2xl">
                      {product?.name}
                    </h3>
                    <div className="gap-2 md:mt-3 mt-2 text-[10px] font-semibold md:text-sm flex flex-col">
                      <p className="line-clamp-1" dangerouslySetInnerHTML={{__html : product?.detailsHome}}/>
                      <p className="line-clamp-1">{product?.categoryProduct?.name}</p>
                      <p className="line-clamp-1">{product?.Type?.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="w-full pt-0 mb-16 text-sm text-center md:mb-0 md:pt-20 md:text-xl">Product Tidak Tersedia</p>
          )}

          {dataProduct?.length > 0 ? (
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          ) : null}
        </div>
      </section>
    </>
  )
}

export default Product
