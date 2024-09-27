import { Link } from 'react-router-dom'
import NEWS from '../../services/news'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { BASE_API } from '../../config/env'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Skeleton from '../../components/atoms/Skeleton'
import { INewsHome } from '../../types/INewsHome'

const News = () => {
  const [data, setdata] = useState<INewsHome[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [dataBanner, setDataBanner] = useState<INewsHome | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await NEWS.getAllNews()
      const data = await response
      setDataBanner(data[0])
      setdata(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }
  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : (dataBanner?.imageNews.length || 1) - 1))
  }

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < (dataBanner?.imageNews.length || 1) - 1 ? prevIndex + 1 : 0))
  }

  const textContents = dataBanner?.details?.map((detail) => detail.text).join(' ') || ''

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <>
      <header className="w-full h-[351px] md:h-[391px]   md:bg-[url('/images/news/hero.png')] xs:bg-[url('/images/news/banner-mobile.svg')] bg-cover rounded-br-[50px] bg-no-repeat bg-center">
        <div className="container flex flex-col items-center justify-center w-full h-full gap-5 px-0 md:gap-0 md:px-16 md:flex-row">
          <div className="flex flex-col w-full md:w-[50%]">
            <h2 className="font-bold text-white text-center md:text-left text-5xl md:text-[5rem]">News</h2>
          </div>
          <div className=" flex items-start justify-start w-full md:w-[50%] ">
            <p className="text-white font-medium text-center md:text-left text-xs md:text-lg w-full md:w-[70%]">
              The glory of the oriental shines all over the world
            </p>
          </div>
        </div>
      </header>

      <div className="md:w-[90%] mx-auto w-full p-5 md:my-10 my-0   ">
        <section id="news">
          <h3 className="w-full md:w-[90%] mx-auto font-bold text-[#B1B1B1] text-sm md:text-xl mb-2 md:mb-3">
            Updated News
          </h3>

          <h2 className="text-xl font-bold text-secondary md:hidden">{dataBanner?.name}</h2>
          <ul className="flex items-center justify-start gap-2 mt-2 mb-4 text-xs font-normal text-secondary md:hidden">
            <li>2024.06.05</li>
            <li>CNN Indonesia</li>
          </ul>

          {/* versi dekstop */}
          <div className="w-full flex-center">
            <div className="items-center justify-center hidden cursor-pointer md:flex" onClick={handlePrevClick}>
              <img src="/icons/arrow-right-grey.svg" alt="icon right grey" className="w-full" />
            </div>

            <div className="gap-5 w-full md:w-[90%]  mx-auto flex md:flex-row flex-col">
              <Carousel
                selectedItem={currentImageIndex}
                showThumbs={false}
                showStatus={false}
                renderArrowPrev={() => null}
                renderArrowNext={() => null}
                className="w-full h-full mx-auto overflow-hidden "
              >
                {dataBanner?.imageNews.map((image, index) => (
                  <div
                    key={index}
                    className="w-full h-auto bg-slate-900 rounded-[10px] md:rounded-[20px] overflow-hidden"
                  >
                    <img src={`${BASE_API}/${image.link}`} alt={dataBanner?.name} className="w-full h-auto" />
                  </div>
                ))}
              </Carousel>

              <div className="flex overflow-y-auto  flex-col items-start justify-start text-sm lg:text-[16px]  gap-5 md:gap-0 lg:gap-10 w-full md:w-[35%] text-[#444444]">
                <p className="xs:h-min lg:h-min line-clamp-[15]" dangerouslySetInnerHTML={{ __html: textContents }} />

                <div className="flex items-center justify-center w-full pb-5 md:pb-0 md:justify-start ">
                  <Link
                    to={`/read-news/${dataBanner?.id}`}
                    className="w-full py-2 mx-auto mt-0 font-semibold text-center border-2 rounded-full md:mt-5 lg:w-60 lg:px-12 button-primary border-primary"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>

            <div className="items-center justify-center hidden cursor-pointer md:flex" onClick={handleNextClick}>
              <img src="/icons/arrow-right-grey.svg" alt="icon right grey" className="w-full rotate-180" />
            </div>
          </div>

          <div className="w-[90%] mx-auto bottom-8 flex md:justify-center items-center justify-between gap-2 mt-0 md:mt-5 mb-10">
            {/* versi mobile */}
            <div className="flex items-center justify-center cursor-pointer md:hidden" onClick={handlePrevClick}>
              <img src="/icons/arrow-right-grey.svg" alt="icon right grey" className="w-full" />
            </div>
            <div className="gap-2 mt-3 mb-5 md:mt-5 md:mb-10 left-32 bottom-8 flex-center">
              {dataBanner?.imageNews?.map((_, index) => (
                <span
                  key={index}
                  className={`cursor-pointer block w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-primary' : 'bg-slate-300'}`}
                  onClick={() => handleThumbnailClick(index)}
                ></span>
              ))}
            </div>
            {/* versi mobile */}
            <div className="flex items-center justify-center cursor-pointer md:hidden" onClick={handleNextClick}>
              <img src="/icons/arrow-right-grey.svg" alt="icon right grey" className="w-full rotate-180" />
            </div>
          </div>
        </section>

        <section className="w-full md:w-[90%] mx-auto mb-10 md:mb-24">
          <h3 className="  font-bold text-[#121221] text-2xl md:text-3xl mb-5">Latest News</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-10 md:gap-10 gap-y-5 md:gap-y-10">
            {data.length > 0
              ? data?.map((item) => {
                  const itemTextContent = item.details.map((detail) => detail.text).join(' ')
                  return (
                    <Link
                      key={item.id}
                      to={`/read-news/${item.id}`}
                      className="flex flex-row w-full rounded-md overflow-hidden   h-auto gap-3  lg:w-[200px] xl:w-[240px] md:flex-col md:gap-0"
                    >
                      <img
                        src={`${BASE_API}/${item.imageNews[0].link}`}
                        alt={dataBanner?.name}
                        className="w-[183px] md:w-[316px] "
                      />

                      <div className="flex flex-col w-full gap-3 mt-0 md:gap-5 md:mt-3">
                        <h4 className="text-sm font-bold leading-5 md:h-14 line-clamp-2 md:text-xl md:leading-6 md:line-clamp-2">
                          {item.name}
                        </h4>
                        <ul className="text-xs -mt-0 md:-mt-5 flex gap-3 font-normal text-[#949494]">
                          {/* <li>1 Hour Ago</li>
                          <li>1 Hour Ago</li> */}
                          <li className="line-clamp-3" dangerouslySetInnerHTML={{ __html: itemTextContent }}></li>
                        </ul>
                      </div>
                    </Link>
                  )
                })
              : null}
          </div>
        </section>
      </div>
    </>
  )
}

export default News
