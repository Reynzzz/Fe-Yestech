import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { ICategory, IProduct, ITypeCategory } from '../../types/IProduct'
import PRODUCT from '../../services/product'
import { BASE_API } from '../../config/env'
import useDebounce from '../../hooks/useDebounce'
import { IParamsProduct } from '../../types/IWarehouse'
import ReactPaginate from 'react-paginate'
import Loading from '../../components/atoms/Loading'

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0
  }
}

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40
  },
  visible: {
    opacity: 1,
    x: 0
  }
}

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40
  },
  visible: {
    opacity: 1,
    x: 0
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1
  }
}

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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

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
      const updatedParams = {
        ...params,
        search: debouncedQuery,
        page: 1,
        limit: LIMIT_PAGE
      }

      setParams(updatedParams)
      fetchDataProduct(updatedParams)
    } else {
      const updatedParams = {
        ...params,
        search: '',
        page: 1,
        limit: LIMIT_PAGE
      }

      setParams(updatedParams)
      fetchDataProduct(updatedParams)
    }
  }, [debouncedQuery])

  useEffect(() => {
    const updatedParams = {
      ...params,
      category: currentCategory,
      type: currentTypeCategory,
      page: 1
    }

    setParams(updatedParams)
    fetchDataProduct(updatedParams)
  }, [currentCategory, currentTypeCategory])

  useEffect(() => {
    fetchCategory()
    fetchTypeCategory()
  }, [])

  const changeSearchParams = (query: string) => {
    if (query) {
      setSearchParams({ query })
    } else {
      setSearchParams({})
    }
  }

  const handleKeywordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    query = e.target.value
    changeSearchParams(query)
  }

  const handlePageClick = (event: { selected: number }) => {
    const selectedPage = event.selected + 1

    const updatedParams = {
      ...params,
      page: selectedPage
    }

    setParams(updatedParams)
    fetchDataProduct(updatedParams)

    window.scrollTo({
      top: 300,
      behavior: 'smooth'
    })
  }

  const handleTypeCategoryChange = (id: string) => {
    if (id === 'all') {
      setCurrentTypeCategory('all')
      return
    }

    if (currentTypeCategory === id) {
      setCurrentTypeCategory('all')
    } else {
      setCurrentTypeCategory(id)
    }
  }

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative w-full h-[351px] md:h-[391px] bg-center xs:bg-[url('/images/products/banner-product-mobile.svg')] md:bg-[url('/images/products/banner-product.svg')] bg-cover rounded-br-[50px] overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-black"
        />

        <div className="container relative z-10 flex-col w-full h-full pt-8 flex-between md:flex-row md:pt-0">
          <motion.div
            variants={fadeLeft}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col w-full md:w-[45%] gap-3 mt-16 ps-0 md:ps-10 text-center md:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-fit mx-auto md:mx-0 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold text-white backdrop-blur-md"
            >
              YES TECH PRODUCT
            </motion.span>

            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-bold text-white text-3xl md:text-5xl lg:text-[5rem] md:mb-5 mb-0"
            >
              Products
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="text-white text-center md:text-left font-semibold w-full text-sm md:text-[15px] md:w-[90%] lg:w-[70%]"
            >
              YES TECH offers a wide range of competitive and cut-edge LED displays to meet your diverse needs.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeRight}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex items-center justify-end w-full md:w-[55%] gap-10 pt-0 md:pt-16"
          >
            <motion.img
              src="/images/products/product-display-banner.svg"
              className="absolute left-0 z-10 w-[238px] md:w-[339px] lg:w-[539px] md:-mt-0 -mt-32"
              animate={{
                y: [0, -12, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              alt="product display banner"
            />

            <motion.img
              src="/images/products/product-display-banner-right.svg"
              className="absolute right-0 md:-mt-0 -mt-32 w-[158px] lg:w-[389px] md:w-[200px] scale-100 lg:scale-100 md:scale-125"
              animate={{
                y: [0, 14, 0]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              alt="product display banner right"
            />
          </motion.div>
        </div>
      </motion.header>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex overflow-hidden flex-col items-start justify-between w-full gap-5 pt-8 md:w-[90%] mx-auto md:flex-row"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="relative flex justify-end w-full md:hidden"
        >
          <input
            value={query}
            onChange={handleKeywordChange}
            placeholder="Search Global"
            className="flex justify-end w-[90%] mx-auto md:w-[30%] border border-[#BCBCBC] rounded-full py-3 ps-5 pe-10 outline-none shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />

          <div className="absolute text-center right-7 top-3.5">
            <img src="/icons/search.svg" alt="search icon" className="w-full" />
          </div>
        </motion.div>

        <motion.aside
          variants={fadeLeft}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full md:w-[30%] lg:w-[20%] overflow-x-auto p-0 md:p-4 bg-[#F8F8F8] mb-10 rounded-none md:rounded-2xl md:shadow-sm md:border md:border-black/5"
        >
          <ul className="flex flex-row w-full gap-3 overflow-x-scroll md:overflow-x-hidden md:flex-col">
            <motion.li
              whileTap={{ scale: 0.96 }}
              className={`cursor-pointer flex-shrink-0 p-3 px-4 text-center rounded-none md:rounded-md md:w-full transition-all ${
                currentCategory === '' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-white'
              }`}
              onClick={() => setCurrentCategory('')}
            >
              All Products
            </motion.li>

            {categoryProduct?.map((category) => (
              <motion.li
                key={category.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.96 }}
                className={`cursor-pointer flex-shrink-0 p-3 px-4 text-center rounded-none md:rounded-md md:w-full transition-all ${
                  String(category.id) === currentCategory
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:bg-white'
                }`}
                onClick={() => setCurrentCategory(String(category.id))}
              >
                {category?.name}
              </motion.li>
            ))}

            <li className="cursor-not-allowed flex-shrink-0 p-3 px-4 text-center rounded-none md:rounded-md md:w-full text-slate-300">
              DOOH
            </li>

            <li className="cursor-not-allowed flex-shrink-0 p-3 px-4 text-center rounded-none md:rounded-md md:w-full text-slate-300">
              Commercial
            </li>

            <li className="cursor-not-allowed flex-shrink-0 p-3 px-4 text-center rounded-none md:rounded-md md:w-full text-slate-300">
              Fine Pixel Pitch
            </li>
          </ul>

          <h4 className="text-[#A4A4A4] text-sm font-semibold my-5 hidden md:block">Operating Environment</h4>

          <ul className="flex flex-row justify-center gap-5 my-5 md:justify-start md:flex-col md:my-0">
            <motion.li whileHover={{ x: 4 }} className="flex items-center justify-start gap-3">
              <input
                type="checkbox"
                id="all"
                name="all"
                className="w-4 h-4 accent-primary cursor-pointer"
                checked={currentTypeCategory === 'all'}
                onChange={() => handleTypeCategoryChange('all')}
              />

              <label htmlFor="all" className="text-[#222222] text-sm md:text-lg font-normal cursor-pointer">
                all
              </label>
            </motion.li>

            {typeCategoryProduct?.map((item) => {
              return (
                <motion.li key={item.id} whileHover={{ x: 4 }} className="flex items-center justify-start gap-3">
                  <input
                    type="checkbox"
                    id={String(item?.id)}
                    name={item?.name}
                    className="w-4 h-4 accent-primary cursor-pointer"
                    checked={currentTypeCategory === String(item?.id)}
                    onChange={() => handleTypeCategoryChange(String(item?.id))}
                  />

                  <label
                    htmlFor={String(item?.id)}
                    className="text-[#222222] text-sm md:text-lg font-normal cursor-pointer"
                  >
                    {item?.name}
                  </label>
                </motion.li>
              )
            })}
          </ul>
        </motion.aside>

        <motion.div
          variants={fadeRight}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-[90%] mx-auto md:w-[60%] lg:w-[80%]"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="relative justify-end hidden w-full md:flex"
          >
            <input
              type="search"
              autoFocus
              value={query}
              onChange={handleKeywordChange}
              placeholder="Search Global"
              className="flex justify-end w-full md:w-[50%] lg:w-[30%] border border-[#BCBCBC] rounded-full py-3 ps-5 pe-10 outline-none shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />

            <div className="absolute text-center right-4 top-3.5">
              <img src="/icons/search.svg" alt="search icon" className="w-full" />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[400px] flex items-center justify-center"
              >
                <Loading />
              </motion.div>
            ) : dataProduct?.length > 0 ? (
              <motion.div
                key="products"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={staggerContainer}
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 overflow-hidden border-0 md:border-t-2 border-[#DEDEDE] pt-5 mt-5"
              >
                {dataProduct.map((product) => (
                  <motion.div
                    key={product?.id}
                    variants={cardVariant}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    whileHover={{
                      y: -6,
                      scale: 1.01
                    }}
                    className="h-full"
                  >
                    <Link
                      to={`/detail-product/${product?.id}`}
                      className="group cursor-pointer hover:shadow-xl transition-all product-item h-[238px] md:h-[405px] xl:h-[420px] overflow-hidden flex flex-col rounded-xl bg-white border border-black/5"
                    >
                      <div className="relative overflow-hidden bg-gray-50">
                        <img
                          src={`${BASE_API}/${product.mainImg[0]?.link}`}
                          alt={product?.name}
                          className="h-[152px] md:h-[285px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />
                      </div>

                      <div className="px-2 md:px-4 py-2">
                        <h3 className="h-8 mt-1 overflow-hidden font-bold text-black text-md line-clamp-1 md:line-clamp-3 md:text-2xl transition-colors group-hover:text-primary">
                          {product?.name}
                        </h3>

                        <div className="gap-1 md:mt-3 mt-2 text-[10px] font-semibold md:text-sm flex flex-col text-slate-600">
                          <p className="line-clamp-1" dangerouslySetInnerHTML={{ __html: product?.detailsHome }} />

                          <p className="line-clamp-1">{product?.categoryProduct?.name}</p>

                          <p className="line-clamp-1">{product?.Type?.name}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full pt-10 md:pt-20 mb-16 md:mb-0 text-center"
              >
                <div className="mx-auto flex min-h-[220px] max-w-md flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10">
                  <h3 className="text-xl font-bold text-slate-800">Product Tidak Tersedia</h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Coba gunakan kata kunci lain atau pilih kategori produk yang berbeda.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {dataProduct?.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
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
            </motion.div>
          ) : null}
        </motion.div>
      </motion.section>
    </>
  )
}

export default Product
