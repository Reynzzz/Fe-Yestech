import React, { useEffect, useRef, useState } from 'react'
import ABOUTUS from '../../services/about-us'
import { IHistory } from '../../types/IHistory'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Skeleton from '../../components/atoms/Skeleton'
const History = () => {
  const [data, setData] = useState<IHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const mainSliderRef = useRef<Slider>(null)
  const thumbSliderRef = useRef<Slider>(null)
  const thumbSliderMobileRef = useRef<Slider>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await ABOUTUS.getHistory()
      const data = await response
      setData(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('🚀 ~ error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const next = () => {
    mainSliderRef.current?.slickNext()
    thumbSliderMobileRef.current?.slickNext()
  }

  const previous = () => {
    mainSliderRef.current?.slickPrev()
    thumbSliderMobileRef.current?.slickPrev()
  }

  const goTo = (index: number) => {
    mainSliderRef.current?.slickGoTo(index)
    thumbSliderMobileRef.current?.slickGoTo(index)
  }

  // thumbuil for dekstop
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentProductIndex(index),
    customPaging: (i: number) => (
      <div className={`custom-dot ${i === currentProductIndex ? 'active' : ''}`} onClick={() => goTo(i)}></div>
    )
  }

  const settingsContainer = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current: number, next: number) => {
      console.log('🚀 ~ History ~ current:', current)
      setCurrentProductIndex(next)
      thumbSliderRef.current?.slickGoTo(next)
      thumbSliderMobileRef.current?.slickGoTo(next)
    }
  }

  // thumnuil for mobile
  const settingsMobile = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentProductIndex(index),
    customPaging: (i: number) => (
      <div className={`custom-dots-about-us-history ${i === currentProductIndex ? 'active' : ''}`}></div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="relative top-50">
        <ul className="absolute carousel-dots-about-us-history">{dots}</ul>
      </div>
    )
    // hidden event onclick slider dots
    // customPaging: () => <div className="custom-dots-about-us-history"></div>
  }

  if (isLoading) {
    return <Skeleton />
  }
  return (
    <div id="history" className="w-full h-min pb-0 md:pb-10 relative bg-[#10121D]">
      <div className="w-full h-[48px] lg:h-[70px]  flex justify-start items-center bg-white">
        <button className="h-full px-8 text-xl font-bold text-white md:px-16 flex-center bg-primary tect-white">
          History
        </button>

        {/* versi dekstop */}
        <div className="hidden w-full md:flex ">
          <Slider
            ref={thumbSliderRef}
            {...settings}
            className="md:flex w-[100%] gap-3 mt-[2.5rem] md:gap-5 ps-3  hidden "
          >
            {data?.map((item, index) => (
              <div
                key={item.id}
                className={`flex  justify-center items-center   font-semibold outline-none card text-secondary`}
              >
                <p
                  className={`relative text-center pb-4 w-[2.7rem] ${index === currentProductIndex ? ' border-b-[6px]  border-primary' : 'border-b-[6px] border-transparent'}`}
                >
                  {item.year}
                </p>
                <div className="relative flex-center ms-5 -top-9">
                  <span className="block w-2 h-2 rounded-full bg-primary"></span>
                  <span className="block w-8 md:w-28 h-[1px] bg-secondary "></span>
                  <span className="block w-2 h-2 rounded-full bg-primary"></span>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* versi mobile */}
        <div className="flex w-full md:hidden ">
          <Slider ref={thumbSliderMobileRef} {...settingsMobile} className=" w-full gap-3 mt-[1.8rem] ps-3">
            {data?.map((item, index) => (
              <div key={item.id} className={`flex     font-semibold outline-none  `}>
                <p
                  className={`relative  text-center pb-1 w-[2.7rem] ${index === currentProductIndex ? ' border-b-[6px]  border-primary text-secondary' : 'text-[#C5C5C5] border-b-[6px] border-transparent'}`}
                >
                  {item.year}
                </p>
                <div className="relative left-5 flex-center -top-6">
                  <span className="block w-2 h-2 rounded-full bg-primary"></span>
                  <span className="block w-8 h-[1px] bg-secondary "></span>
                  <span className="block w-2 h-2 rounded-full bg-primary"></span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* icon prev mobile */}
      <div className="absolute z-50 flex items-center justify-center bottom-9 left-5 md:hidden" onClick={previous}>
        <img src="/icons/arrow-right-grey.svg" alt="icon right grey" className="w-8 h-8" />
      </div>
      {/* icon prev dekstop */}
      <div
        onClick={previous}
        className="cursor-pointer z-50 items-center  absolute right-5 top-[50%] justify-center hidden w-5 h-5 lg:flex"
      >
        <img src="/icons/kerucut-left.svg" alt="icon kerucut left" className="w-full" />
      </div>

      <Slider ref={mainSliderRef} {...settingsContainer} className="w-full ">
        {data?.map((item) => {
          return (
            <div
              key={item.id}
              className="relative z-10 flex items-center justify-between w-full gap-10 px-5 pt-16 pb-0 border border-transparent md:pt-16 md:pb-16 md:px-16 md:h-min h-[68vh]"
            >
              <div className="flex flex-col w-full gap-5 md:gap-8 lg:flex-row">
                <div className="md:w-[50%] w-full flex-center">
                  <img src={item?.image} className="object-cover w-full h-auto " />
                </div>
                <p className="pt-0 w-full md:w-[40%] overflow-hidden text-lg font-normal text-white md:pt-5 line-clamp-4">
                  {item?.name}
                </p>
              </div>

              <p className="absolute  top-[85%] md:top-[72%] left-[45%] md:left-[63%] z-[-1] -translate-x-[50%] -translate-y-[50%] text-[#20243A] text-[10rem] md:text-[20rem] font-bold">
                {item?.year}
              </p>
            </div>
          )
        })}
      </Slider>
      {/*  */}
      {/* icon next dekstop */}
      <div
        className="items-center cursor-pointer absolute top-[50%] left-5 justify-center hidden w-5 h-5  lg:flex"
        onClick={next}
      >
        <img src="/icons/kerucut-left.svg" alt="icon kerucut left" className="w-full rotate-180" />
      </div>
      {/* icon next mobile */}
      <div className="absolute flex items-center justify-center right-5 md:hidden bottom-9" onClick={next}>
        <img src="/icons/arrow-right-grey.svg" alt="icon right grey" className="w-8 h-8 rotate-180" />
      </div>
    </div>
  )
}

export default History
