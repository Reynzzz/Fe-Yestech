import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { IDetailNews } from '../../types/IDetailNews'
import NEWS from '../../services/news'
import Skeleton from '../../components/atoms/Skeleton'
import { BASE_API } from '../../config/env'

const NewsRead = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setdata] = useState<IDetailNews | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await NEWS.getDetailNews(id)
      const data = await response
      setdata(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error:', error)
    }
  }

  useEffect(() => {
    fetchData(Number(id))
  }, [id])

  const handleNext = () => {
    navigate(`/read-news/${Number(id) + 1}`)
  }

  const handleReturn = () => {
    if (Number(id) > 1) {
      navigate(`/read-news/${Number(id) - 1}`)
    }
  }

  if (isLoading) {
    return <Skeleton />
  }
  if (!data) {
    return <div>Data not found</div>
  }
  return (
    <>
      <header className="w-full  h-[351px] md:h-[391px] bg-center   md:bg-[url('/images/news/hero.png')] xs:bg-[url('/images/news/banner-mobile.svg')] bg-cover rounded-br-[50px]">
        <div className="container flex items-center justify-center w-full h-full px-0 md:px-16">
          <h1 className="text-[1.50rem] md:text-4xl font-bold text-center text-white">{data?.name}</h1>
        </div>
      </header>
      <section className="container">
        <div className="lg:w-[95%] w-full mx-auto p-0 md:p-5 my-10 flex justify-between gap-5 items-start  ">
          <div className="lg:w-[70%] w-full  flex flex-col gap-3">
            <div className="w-full p-0 lg:p-8 bg-transparent md:bg-bgSecondary rounded-[12px] flex flex-col gap-5">
              <h2 className="text-xl font-semibold text-center text-black md:text-left lg:text-2xl lg:font-medium">
                {data?.name}
              </h2>
              <div className="flex flex-col-reverse justify-center w-full gap-5 md:flex-col ">
                <div className="flex items-start justify-start w-full ">
                  <img src={`${BASE_API}/${data?.imageNews[0]?.link}`} className="object-cover w-full h-auto" />
                </div>
                <ul className="flex justify-between md:justify-center items-center -mt-3 md:-mt-0 gap-2 md:gap-10 text-[10px] md:text-xs text-[#3E3232] opacity-100 md:opacity-70 font-medium ">
                  <li className="gap-3 flex-center ">
                    <div className="flex-center">
                      <img src="/icons/date.svg" alt="date icon" className="w-full" />
                    </div>
                    <h3>July 14 , 2022</h3>
                  </li>
                  <li className="gap-3 flex-center">
                    <div className="flex-center">
                      <img src="/icons/comment.svg" alt="comment icon" className="w-full" />
                    </div>
                    <h3>comments : 35</h3>
                  </li>
                  <li className="gap-2 flex-center">
                    <div className="flex-center">
                      <img src="/icons/category.svg" alt="category icon" className="w-full" />
                    </div>
                    <h3>Categgory Sport</h3>
                  </li>
                </ul>
              </div>
            </div>

            {data?.details
              .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
              .map((detail, index: number) => {
                return (
                  <div key={index} className="flex flex-col w-full gap-5 md:gap-8">
                    <div className="flex flex-col w-full gap-3 px-0 md:gap-5 lg:px-8 ">
                      <article
                        className="text-sm font-semibold md:text-xl md:font-medium"
                        dangerouslySetInnerHTML={{ __html: detail?.text ?? '' }}
                      />
                    </div>
                    <div className="flex-center w-full md:w-[80%] mx-auto">
                      <img src="/images/news-read/news-list.png" className="w-full h-auto rounded-md overflow-hidde" />
                    </div>
                  </div>
                )
              })}
          </div>

          {/* sidebar */}
          <div className="lg:w-[30%] hidden w-full md:flex flex-col gap-5">
            <ul className="w=full flex justify-between items-center">
              <li className="opacity-70">
                <button className="bg-bgSecondary flex-center gap-3 py-2 px-4 rounded-md text-[#3E3232] font-medium text-xs">
                  <div className="flex-center">
                    <img src="/icons/share.svg" alt="share icon" className="w-full" />
                  </div>
                  Share
                </button>
              </li>
              <li className="opacity-70">
                <button className="bg-bgSecondary flex-center gap-3 py-2 px-4 rounded-md text-[#3E3232] font-medium text-xs">
                  <div className="flex-center">
                    <img src="/icons/marking.svg" alt="marking icon" className="w-full" />
                  </div>
                  Marking
                </button>
              </li>
              <li className="opacity-70">
                <button className="bg-bgSecondary flex-center gap-3 py-2 px-4 rounded-md text-[#3E3232] font-medium text-xs">
                  <div className="flex-center">
                    <img src="/icons/comment.svg" alt="comment icon" className="w-full" />
                  </div>
                  Comment
                </button>
              </li>
            </ul>
            <div className="flex justify-between gap-2 p-5 bg-bgSecondary rounded-[12px]">
              <div className="flex justify-start gap-3">
                <img src="/images/news-read/avatar.png" className="rounded-[12px] w-[87px] h-auto" />
                <div className="flex flex-col gap-2">
                  <h3 className="w-full text-[16px] pt-3 font-semibold text-[#3E3232]">Behzad Pashaei</h3>
                  <button className="bg-[#F81539] w-[90%] bg-opacity-75 text-white rounded-[12px] py-2 px-2 flex-center gap-2">
                    <FaPlus /> Follow
                  </button>
                </div>
              </div>
              <span className="pt-4 text-xs font-normal bg-bgSecondary opacity-70">27 post</span>
            </div>
            <ul className="p-5 bg-bgSecondary rounded-[12px]">
              <div className="flex items-center justify-start gap-2">
                <span className="bg-[#F81539] h-2 w-[4px] rounded-full"></span>
                <h3 className="text-xl font-semibold">Tags</h3>
              </div>
              <div className="flex text-[#3E3232] opacity-70 text-xs flex-wrap gap-2 font-medium mt-3">
                <li>Montenegro</li>
                <li>Visit Croatia</li>
                <li>Luxury Travel</li>
                <li>Travel Log</li>
                <li>Paradise Island</li>
                <li>Travel Info</li>
              </div>
            </ul>

            <ul className="p-5 bg-bgSecondary rounded-[12px]">
              <div className="flex items-center justify-start gap-2">
                <span className="bg-[#F81539] h-2 w-[4px] rounded-full"></span>
                <h3 className="text-xl font-semibold">Top Post</h3>
              </div>
              <div className=" text-[#3E3232] flex flex-col gap-4 mt-3">
                <li className="gap-2 flex-center">
                  <img src="/images/news-read/car.png" className="w-[87px] h-auto rounded-[12px]" />
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold text-[#3E3232]">
                      How to Spend the Perfect Day on Croatia’s Most Magical Island
                    </h4>
                    <p className="text-xs text-[#3E3232] opacity-70 font-normal">Subhead</p>
                  </div>
                </li>
                <li className="gap-2 flex-center">
                  <img src="/images/news-read/car.png" className="w-[87px] h-auto rounded-[12px]" />
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold text-[#3E3232]">
                      How to Spend the Perfect Day on Croatia’s Most Magical Island
                    </h4>
                    <p className="text-xs text-[#3E3232] opacity-70 font-normal">Subhead</p>
                  </div>
                </li>{' '}
                <li className="gap-2 flex-center">
                  <img src="/images/news-read/car.png" className="w-[87px] h-auto rounded-[12px]" />
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold text-[#3E3232]">
                      How to Spend the Perfect Day on Croatia’s Most Magical Island
                    </h4>
                    <p className="text-xs text-[#3E3232] opacity-70 font-normal">Subhead</p>
                  </div>
                </li>{' '}
                <li className="gap-2 flex-center">
                  <img src="/images/news-read/car.png" className="w-[87px] h-auto rounded-[12px]" />
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold text-[#3E3232]">
                      How to Spend the Perfect Day on Croatia’s Most Magical Island
                    </h4>
                    <p className="text-xs text-[#3E3232] opacity-70 font-normal">Subhead</p>
                  </div>
                </li>
              </div>
            </ul>
            <ul className="flex flex-col gap-5 mt-5">
              <li className="w-full rounded-[12px] overflow-hidden">
                <img src="/images/news-read/Advertising.png" className="w-full h-auto" />
              </li>
              <li className="w-full rounded-[12px] overflow-hidden">
                <img src="/images/news-read/top-news.png" className="w-full h-auto" />
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-between pt-5 md:pt-10 mb-10 md:mb-20 w-full md:w-[85%] mx-auto border-t-2 border-[#E6E6E6] px-5 md:px-0">
        <button
          className="py-1 mt-5 font-semibold text-black transition-all border-2 border-black rounded-full cursor-pointer w-36 md:w-64 md:py-2 hover:bg-primary hover:text-white hover:border-primary"
          onClick={handleReturn}
        >
          Return
        </button>
        <button
          className="w-32 py-1 mt-5 font-semibold border-2 rounded-full cursor-pointer md:w-64 md:py-2 button-primary text-primary border-primary"
          onClick={handleNext}
        >
          Next Article
        </button>
      </div>
    </>
  )
}

export default NewsRead
