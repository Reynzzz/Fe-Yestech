import React, { useEffect, useRef, useState } from 'react'
import Home from '../../services/home'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BASE_API } from '../../config/env'
import { Link } from 'react-router-dom'
import Skeleton from '../../components/atoms/Skeleton'
import { IBannerHome } from '../../types/IBannerHome'

const Banner = () => {
  const [data, setData] = useState<IBannerHome[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const mainSliderRef = useRef<Slider>(null)
  const thumbSliderRef = useRef<Slider>(null)
  const thumbSliderMobileRef = useRef<Slider>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await Home.getBanner()
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
  }

  const previous = () => {
    mainSliderRef.current?.slickPrev()
  }

  const goTo = (index: number) => {
    mainSliderRef.current?.slickGoTo(index)
  }

  // thumbuil for dekstop
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentProductIndex(index),
    customPaging: (i: number) => (
      <div className={`custom-dot ${i === currentProductIndex ? 'active' : ''}`} onClick={() => goTo(i)}></div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="custom-dots-container">
        <ul>{dots}</ul>
      </div>
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
      console.log('🚀 ~ Banner ~ current:', current)
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
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentProductIndex(index),
    customPaging: (i: number) => (
      <div className={`custom-dot ${i === currentProductIndex ? 'active' : ''}`} onClick={() => goTo(i)}></div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="custom-dots-container">
        <ul>{dots}</ul>
      </div>
    )
  }

  return (
    <section>
      {isLoading ? (
        <>
          <Skeleton />
        </>
      ) : (
        <>
          <div
            id="home"
            className="relative w-full h-screen xs:bg-[url('/images/home/bg-banner-mobile.svg')] md:bg-[url('/images/banner-home.svg')] bg-cover rounded-br-[50px] md:mb-0 mb-5"
          >
            <Slider ref={mainSliderRef} {...settingsContainer} className="container relative flex">
              {data?.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-start w-full h-full gap-14 md:gap-0 md:justify-between md:flex-row"
                >
                  <div className="flex w-[100%] md:w-[60%]  items-center justify-center md:justify-start mt-0  md:mt-44 ">
                    <div className="flex flex-col gap-0 pt-20 md:gap-2 xs:items-center md:items-start md:pt-0">
                      <h2 className="font-bold text-white xs:text-[2rem] md:text-[4.5rem]  line-clamp-1">
                        {item?.title}
                      </h2>
                      <p className="font-normal text-white xs:text-xs md:text-2xl">{item?.details}</p>
                      <Link
                        to={item.link}
                        target="_blank"
                        className="py-[5px] md:py-2 mt-5 font-semibold border-2 border-white rounded-full md:mt-10 button-secondary px-9"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>

                  <div className="md:w-[40%] mt-10 md:mt-0 top-0  px-5 md:px-0 md:-top-80 w-full  relative md:left-[60%]   flex-center pt-0">
                    <img
                      src={`${BASE_API}/${item?.imageBanner}`}
                      alt={item.title}
                      className="object-cover object-center w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Thumbnail for dekstop */}
          <div className="left-0 w-[75%]  gap-8 -mt-24 ps-20 md:left-20 bottom-16 hidden md:flex">
            <div className="absolute cursor-pointer bottom-[4.7rem] text-5xl left-8 flex-center" onClick={previous}>
              <img src="/icons/arrow-left.svg" alt="icon left" className="hidden w-full text-white md:block" />
            </div>
            <Slider ref={thumbSliderRef} {...settings} className="flex w-full gap-0">
              {data?.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex font-semibold outline-none card  ${
                    index === currentProductIndex ? 'text-primary' : 'text-white'
                  }`}
                >
                  <span className="w-6 h-6 text-xs font-bold border-2 rounded-full flex-center">{index + 1}</span>
                  <h3 className="-mt-6 text-sm w-44 text-start ms-10 line-clamp-2">{item?.title}</h3>
                  <p className="text-xs font-medium text-start ms-10 line-clamp-1">{item?.details}</p>
                </div>
              ))}
            </Slider>
            <div className="absolute cursor-pointer text-3xl left-[20.5rem] bottom-[4.7rem] flex-center" onClick={next}>
              <img src="/icons/arrow-right.svg" alt="icon-right" className="hidden w-full text-white md:block" />
            </div>
          </div>

          {/* thumbnuil for mobile  */}
          <div className="left-0 w-[100%]  gap-8 -mt-32 mb-10 ps-5  flex md:hidden">
            <Slider ref={thumbSliderMobileRef} {...settingsMobile} className="flex w-full gap-0">
              {data.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex font-semibold outline-none card ${
                    index === currentProductIndex ? 'text-white' : 'text-white'
                  }`}
                >
                  <span className="w-6 h-6 text-xs font-bold border-2 rounded-full flex-center">{index + 1}</span>
                  <h3 className="-mt-6 text-sm text-start ms-10 line-clamp-2">{item?.title}</h3>
                  <p className="text-xs font-medium text-start ms-10 line-clamp-1">{item?.details}</p>
                </div>
              ))}
            </Slider>
            <div
              className="absolute text-5xl cursor-pointer top-[50%] left-[8%] -translate-x-[50%] -translate-y-[50%] flex-center"
              onClick={previous}
            >
              <img src="/icons/arrow-left.svg" alt="icon left" className="w-full text-white " />
            </div>
            <div
              className="absolute text-3xl cursor-pointer top-[50%] right-[0%] -translate-x-[50%] -translate-y-[50%] flex-center"
              onClick={next}
            >
              <img src="/icons/arrow-right.svg" alt="icon-right" className="w-full text-white " />
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Banner
