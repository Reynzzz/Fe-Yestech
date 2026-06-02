import { useEffect, useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Home from '../../services/home'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { BASE_API } from '../../config/env'
import { ICaseListHome } from '../../types/ICaseListHome'
import Skeleton from '../../components/atoms/Skeleton'

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 35
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: 'easeOut'
    }
  }
}

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -45
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 45
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
}

const CaseList = () => {
  const [data, setData] = useState<ICaseListHome[]>([])
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const handleCaseChange = (index: number) => {
    setCurrentCaseIndex(index)
    setCurrentImageIndex(0)
  }

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handlePrevCaseClick = () => {
    setCurrentCaseIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data.length - 1))
    setCurrentImageIndex(0)
  }

  const handleNextCaseClick = () => {
    setCurrentCaseIndex((prevIndex) => (prevIndex < data.length - 1 ? prevIndex + 1 : 0))
    setCurrentImageIndex(0)
  }

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const response = await Home.getCaseList()
      setData(response)
    } catch (error) {
      console.log('🚀 ~ error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return <Skeleton />
  }

  const currentCase = data[currentCaseIndex]

  return (
    <motion.section
      className="relative top-10 overflow-hidden bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={staggerContainer}
    >
      <motion.div className="mx-auto w-[90%] pb-20" variants={staggerContainer}>
        <motion.div className="text-center" variants={fadeUp}>
          <p className="mb-3 mt-10 text-xs font-bold uppercase tracking-[0.28em] text-primary">Project Showcase</p>

          <h2 className="mb-8 text-3xl font-bold text-[#202335] md:text-5xl">Case List</h2>
        </motion.div>

        <motion.div
          className="w-full overflow-hidden rounded-[28px] bg-[#F9F9FB] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.08)] md:p-8"
          variants={fadeUp}
        >
          <div className="flex w-full items-center justify-between gap-4">
            {/* Desktop prev */}
            <motion.button
              type="button"
              onClick={handlePrevCaseClick}
              className="hidden cursor-pointer items-center justify-center rounded-full p-2 transition md:flex"
              whileHover={{
                x: -6,
                scale: 1.05
              }}
              whileTap={{
                scale: 0.92
              }}
            >
              <img src="/icons/arrow-left-long.svg" alt="icon left long" className="w-full" />
            </motion.button>

            {/* Mobile prev */}
            <motion.button
              type="button"
              onClick={handlePrevCaseClick}
              className="cursor-pointer rounded-full p-2 flex-center md:hidden"
              whileTap={{
                scale: 0.9
              }}
            >
              <img src="/icons/mobile/arrow-left-long.svg" alt="icon-left long" className="w-full rotate-180" />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.h3
                key={currentCase?.id || currentCaseIndex}
                className="line-clamp-2 text-center text-sm font-bold text-[#111827] md:text-4xl"
                initial={{
                  opacity: 0,
                  y: 18
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -18
                }}
                transition={{
                  duration: 0.35,
                  ease: 'easeOut'
                }}
              >
                {currentCase?.name}
              </motion.h3>
            </AnimatePresence>

            {/* Desktop next */}
            <motion.button
              type="button"
              onClick={handleNextCaseClick}
              className="hidden cursor-pointer items-center justify-center rounded-full p-2 transition md:flex"
              whileHover={{
                x: 6,
                scale: 1.05
              }}
              whileTap={{
                scale: 0.92
              }}
            >
              <img src="/icons/arrow-right-long.svg" alt="icon-right long" className="w-full" />
            </motion.button>

            {/* Mobile next */}
            <motion.button
              type="button"
              onClick={handleNextCaseClick}
              className="cursor-pointer rounded-full p-2 flex-center md:hidden"
              whileTap={{
                scale: 0.9
              }}
            >
              <img src="/icons/mobile/arrow-left-long.svg" alt="icon-left long" className="w-full" />
            </motion.button>
          </div>

          <motion.div className="left-32 bottom-8 mt-4 mb-6 gap-2 flex-center md:mt-5 md:mb-10" variants={fadeUp}>
            {data.map((_, index) => (
              <motion.button
                type="button"
                key={index}
                className={`block h-2 rounded-full transition-all duration-300 ${
                  currentCaseIndex === index ? 'w-8 bg-primary' : 'w-2 bg-slate-300'
                }`}
                onClick={() => handleCaseChange(index)}
                whileHover={{
                  scale: 1.2
                }}
                whileTap={{
                  scale: 0.85
                }}
                aria-label={`Go to case ${index + 1}`}
              />
            ))}
          </motion.div>

          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row">
            <motion.div
              className="flex w-full flex-col-reverse justify-between rounded-[24px] bg-white p-3 shadow-sm md:w-[70%] md:flex-row md:p-4"
              variants={fadeLeft}
            >
              <motion.ul
                className="me-3 mt-5 flex w-full flex-row items-center justify-center gap-2 md:mt-0 md:w-[8%] md:flex-col md:justify-start"
                variants={staggerContainer}
              >
                {currentCase?.image.map((img, index) => (
                  <motion.li
                    className={`overflow-hidden rounded-md transition-all duration-300 ${
                      currentImageIndex === index
                        ? 'border-2 border-blue-500 shadow-[0_10px_30px_rgba(59,130,246,0.25)]'
                        : 'border border-transparent opacity-70 hover:opacity-100'
                    }`}
                    key={index}
                    onClick={() => handleImageChange(index)}
                    variants={fadeUp}
                    whileHover={{
                      scale: 1.08,
                      y: -3
                    }}
                    whileTap={{
                      scale: 0.92
                    }}
                  >
                    <img
                      src={`${BASE_API}/${img.link}`}
                      alt={`thumbnail ${index}`}
                      className="w-[36px] cursor-pointer object-cover md:w-full"
                    />
                  </motion.li>
                ))}
              </motion.ul>

              <div className="w-full overflow-hidden rounded-[18px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentCaseIndex}-${currentImageIndex}`}
                    initial={{
                      opacity: 0,
                      scale: 0.97,
                      y: 18
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.97,
                      y: -18
                    }}
                    transition={{
                      duration: 0.45,
                      ease: 'easeOut'
                    }}
                  >
                    <Carousel
                      infiniteLoop
                      autoPlay
                      selectedItem={currentImageIndex}
                      showThumbs={false}
                      showStatus={false}
                      renderArrowPrev={() => null}
                      renderArrowNext={() => null}
                      onChange={handleImageChange}
                      className="mx-auto h-full w-full overflow-hidden"
                    >
                      {currentCase?.image.map((image, index) => (
                        <div
                          key={index}
                          className="h-auto w-full overflow-hidden rounded-[18px] bg-slate-900 md:rounded-[24px]"
                        >
                          <img
                            src={`${BASE_API}/${image.link}`}
                            alt={currentCase?.name}
                            className="h-auto w-full object-cover"
                          />
                        </div>
                      ))}
                    </Carousel>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentCase?.id || currentCaseIndex}
                className="flex w-full flex-col items-start justify-center gap-2 overflow-y-auto px-0 md:h-[300px] md:w-[30%] md:gap-5 md:px-5 md:pt-28 lg:h-min lg:pt-5 xs:h-min xs:pt-5"
                variants={fadeRight}
                initial="hidden"
                animate="visible"
                exit={{
                  opacity: 0,
                  x: 30
                }}
              >
                <h3 className="mt-5 line-clamp-2 text-2xl font-bold leading-8 text-[#111827] md:mt-0 md:text-[2.5rem] md:leading-[3rem]">
                  {currentCase?.name}
                </h3>

                <ul className="text-sm font-normal text-[#8B8B8B]">
                  <li>Location: {currentCase?.location}</li>
                  <li>Product: {currentCase?.product}</li>
                </ul>

                <p
                  className="text-sm font-normal leading-6 text-gray-600"
                  dangerouslySetInnerHTML={{ __html: currentCase?.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 hidden lg:block"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <img src="/images/corak-case-list.svg" alt="corak square case list bottom" />
      </motion.div>

      {/* Mobile */}
      <motion.div
        className="absolute bottom-0 right-0 lg:hidden"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <img src="/icons/mobile/corak-square-case-list.svg" alt="corak square case list bottom" />
      </motion.div>
    </motion.section>
  )
}

export default CaseList
