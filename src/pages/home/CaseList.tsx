import { useEffect, useState } from 'react'
import Home from '../../services/home'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { BASE_API } from '../../config/env'
import { ICaseListHome } from '../../types/ICaseListHome'
import Skeleton from '../../components/atoms/Skeleton'
const CaseList = () => {
  const [data, setData] = useState<ICaseListHome[]>([])
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const handleCaseChange = (index: number) => {
    setCurrentCaseIndex(index)
    setCurrentImageIndex(0) // Reset image index when changing cases
  }

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handlePrevCaseClick = () => {
    setCurrentCaseIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data.length - 1))
    setCurrentImageIndex(0) // Reset image index when changing cases
  }

  const handleNextCaseClick = () => {
    setCurrentCaseIndex((prevIndex) => (prevIndex < data.length - 1 ? prevIndex + 1 : 0))
    setCurrentImageIndex(0) // Reset image index when changing cases
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await Home.getCaseList()
      setData(response)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error:', error)
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
    <section className="relative top-10">
      <div className="w-[90%] mx-auto pb-20">
        <h2 className="mb-8 mt-10 text-2xl font-bold text-center text-[#CCCCCC]">Case List</h2>
        <div className="w-full overflow-hidden h-min">
          <div className="flex justify-between w-full">
            {/* Desktop version */}
            <div onClick={handlePrevCaseClick} className="items-center justify-center hidden cursor-pointer md:flex">
              <img src="/icons/arrow-left-long.svg" alt="icon left long" className="w-full" />
            </div>
            {/* Mobile version */}
            <div onClick={handlePrevCaseClick} className="cursor-pointer flex-center md:hidden">
              <img src="/icons/mobile/arrow-left-long.svg" alt="icon-left long" className="w-full rotate-180" />
            </div>
            <h3 className="text-sm font-bold text-center md:text-4xl line-clamp-2">{currentCase?.name}</h3>
            {/* Desktop version */}
            <div onClick={handleNextCaseClick} className="items-center justify-center hidden cursor-pointer md:flex">
              <img src="/icons/arrow-right-long.svg" alt="icon-right long" className="w-full" />
            </div>
            {/* Mobile version */}
            <div onClick={handleNextCaseClick} className="cursor-pointer flex-center md:hidden">
              <img src="/icons/mobile/arrow-left-long.svg" alt="icon-left long" className="w-full" />
            </div>
          </div>

          <div className="gap-2 mt-3 mb-5 md:mt-5 md:mb-10 left-32 bottom-8 flex-center">
            {data.map((_, index) => (
              <span
                key={index}
                className={`block w-2 h-2 rounded-full ${currentCaseIndex === index ? 'bg-primary' : 'bg-slate-300'}`}
                onClick={() => handleCaseChange(index)}
              ></span>
            ))}
          </div>

          <div className="flex flex-col items-start justify-between w-full md:flex-row">
            <div className="w-full md:w-[70%] md:flex-row flex-col-reverse bg-[#F9F9FB] flex justify-between">
              <ul className="w-full md:w-[8%] flex flex-row justify-center items-center md:justify-start mt-5 md:mt-0 md:flex-col gap-2 me-3">
                {currentCase?.image.map((img, index) => (
                  <li
                    className={`overflow-hidden rounded-md ${currentImageIndex === index ? 'border-2 border-blue-500' : ''}`}
                    key={index}
                    onClick={() => handleImageChange(index)}
                  >
                    <img
                      src={`${BASE_API}/${img.link}`}
                      alt={`thumbnail ${index}`}
                      className="w-[36px] md:w-full cursor-pointer"
                    />
                  </li>
                ))}
              </ul>
              <div className="w-full h-auto">
                <Carousel
                  infiniteLoop
                  autoPlay
                  selectedItem={currentImageIndex}
                  showThumbs={false}
                  showStatus={false}
                  renderArrowPrev={() => null}
                  renderArrowNext={() => null}
                  className="w-full h-full mx-auto overflow-hidden"
                >
                  {currentCase?.image.map((image, index) => (
                    <div
                      key={index}
                      className="w-full h-auto bg-slate-900 rounded-[10px] md:rounded-[20px] overflow-hidden"
                    >
                      <img src={`${BASE_API}/${image.link}`} alt={currentCase?.name} className="w-full h-auto" />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

            <div className="w-full md:w-[30%] xs:h-min md:h-[300px] xs:pt-5 md:pt-28 lg:pt-5 lg:h-min flex flex-col items-start justify-center gap-2 md:gap-5 px-0 md:px-5 overflow-y-auto">
              <h3 className="text-2xl md:text-[2.5rem] line-clamp-2 font-bold leading-8 md:leading-[3rem] mt-5 md:mt-0">
                {currentCase?.name}
              </h3>
              <ul className="text-[#8B8B8B] text-sm font-normal">
                <li>Location: {currentCase?.location}</li>
                <li>Product: {currentCase?.product}</li>
              </ul>
              <p className="text-sm font-normal" dangerouslySetInnerHTML={{__html : currentCase?.details}}/>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden lg:block">
        <img src="/images/corak-case-list.svg" alt="corak square case list bottom" />
      </div>
      {/* Mobile */}
      <div className="absolute bottom-0 right-0 lg:hidden">
        <img src="/icons/mobile/corak-square-case-list.svg" alt="corak square case list bottom" />
      </div>
    </section>
  )
}

export default CaseList
