import React, { useEffect, useRef, useState } from 'react'
import LocationInfo from '../molecules/LocationInfo'
import { FaEnvelope, FaFacebook, FaYoutube, FaInstagram, FaPhoneVolume, FaTiktok, FaTwitter } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import Home from '../../services/home'
import { Carousel } from 'react-responsive-carousel'
import { BASE_API } from '../../config/env'
import { Link } from 'react-router-dom'
import { ICategoryOwner } from '../../types/IMapView'
import { IOwner } from '../../types/IMapView'
type LocationPoint = {
  name: string
  top: {
    md: number
    xs: number
  }
  left: {
    md: number
    xs: number
  }
}

const locations: LocationPoint[] = [
  {
    name: 'Jabodetabek',
    top: { md: 63, xs: 61 },
    left: { md: 27.5, xs: 26.5 }
  },
  {
    name: 'Jogjakarta',
    top: { md: 71, xs: 66 },
    left: { md: 33, xs: 32 }
  },
  {
    name: 'Surabaya',
    top: { md: 67.5, xs: 69 },
    left: { md: 38.5, xs: 38 }
  },
  {
    name: 'Bali',
    top: { md: 72, xs: 70 },
    left: { md: 44.5, xs: 47 }
  },
  {
    name: 'Manado',
    top: { md: 28, xs: 26 },
    left: { md: 64.5, xs: 62 }
  },
  {
    name: 'Samarinda',
    top: { md: 38, xs: 36.5 },
    left: { md: 48, xs: 46.6 }
  }
]
const MapView: React.FC = () => {
  const mapSectionRef = useRef<HTMLElement | null>(null)

  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [isMapVisible, setIsMapVisible] = useState(false)
  const [isModalOpenVersiWeb, setIsModalOpenVersiWeb] = useState<boolean>(false)
  const [isModalOpenVersiMobile, setIsModalOpenVersiMobile] = useState<boolean>(false)
  const [dataCategoryOwner, setDataCategoryOwner] = useState<ICategoryOwner[]>([])
  const [dataOwner, setDataOwner] = useState<IOwner[]>([])
  const [currentData, setCurrentData] = useState<IOwner[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [mapBackgroundStyle, setMapBackgroundStyle] = useState<React.CSSProperties>({
    transform: 'translate(0%, 0%) scale(1)',
    transition: 'transform 0.5s ease-in-out'
  })

  useEffect(() => {
    const section = mapSectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMapVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.35
      }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Home.getCategoryOwner()
        const categoryOwners = await response

        const updatedCategoryOwners = categoryOwners.map((owner: ICategoryOwner) => {
          const location = locations.find((loc) => loc.name === owner.name)

          return {
            ...owner,
            top: location ? location.top : { md: 0, xs: 0 },
            left: location ? location.left : { md: 0, xs: 0 }
          }
        })

        setDataCategoryOwner(updatedCategoryOwners)
      } catch (error) {
        console.log('🚀 ~ error:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const getDataOwner = async () => {
      try {
        const response = await Home.getOwner()
        const data = await response
        setDataOwner(data)
      } catch (error) {
        console.log('🚀 ~ error:', error)
      }
    }

    getDataOwner()
  }, [])

  const getMainHub = () => {
    return locations.find((item) => item.name === 'Jabodetabek')
  }

  const renderConnectionLines = (device: 'md' | 'xs') => {
    const hub = getMainHub()
    if (!hub) return null

    const targetLocations = locations.filter((item) => item.name !== 'Jabodetabek')

    return (
      <svg
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`lineGradient-${device}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#007BFF" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#00AEEF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.45" />
          </linearGradient>

          <filter id={`glow-${device}`}>
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {targetLocations.map((target, index) => {
          const startX = hub.left[device]
          const startY = hub.top[device]
          const endX = target.left[device]
          const endY = target.top[device]

          const controlX = (startX + endX) / 2
          const controlY = Math.min(startY, endY) - 9

          const path = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`
          const delay = index * 0.28

          return (
            <g key={`${device}-${target.name}`}>
              {/* Glow besar di belakang garis */}
              <path
                d={path}
                fill="none"
                stroke="#00AEEF"
                strokeOpacity="0.12"
                strokeWidth={device === 'md' ? 1.7 : 2}
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset="120"
                className={isMapVisible ? 'animate-[drawLineSmooth_1.9s_cubic-bezier(0.22,1,0.36,1)_forwards]' : ''}
                style={{
                  animationDelay: `${delay}s`
                }}
              />

              {/* Garis utama dari Jabodetabek ke kota */}
              <path
                d={path}
                fill="none"
                stroke={`url(#lineGradient-${device})`}
                strokeWidth={device === 'md' ? 0.5 : 0.62}
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset="120"
                filter={`url(#glow-${device})`}
                className={isMapVisible ? 'animate-[drawLineSmooth_1.9s_cubic-bezier(0.22,1,0.36,1)_forwards]' : ''}
                style={{
                  animationDelay: `${delay}s`
                }}
              />

              {/* Garis putih putus-putus halus */}
              <path
                d={path}
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.28"
                strokeWidth={device === 'md' ? 0.22 : 0.3}
                strokeLinecap="round"
                strokeDasharray="1.2 1.5"
                strokeDashoffset="0"
                className={isMapVisible ? 'animate-[dashMove_4s_linear_infinite]' : ''}
                style={{
                  animationDelay: `${2 + delay}s`
                }}
              />

              {/* Titik cahaya bergerak */}
              <circle r={device === 'md' ? 0.58 : 0.72} fill="#00AEEF" filter={`url(#glow-${device})`} opacity="0">
                {isMapVisible && (
                  <>
                    <animate
                      attributeName="opacity"
                      from="0"
                      to="1"
                      begin={`${1.35 + delay}s`}
                      dur="0.45s"
                      fill="freeze"
                    />

                    <animateMotion dur="4.2s" begin={`${1.8 + delay}s`} repeatCount="indefinite" path={path} />
                  </>
                )}
              </circle>

              {/* Pulse kecil di kota tujuan */}
              <circle
                cx={endX}
                cy={endY}
                r={device === 'md' ? 0.45 : 0.58}
                fill="#FFFFFF"
                opacity="0"
                filter={`url(#glow-${device})`}
              >
                {isMapVisible && (
                  <>
                    <animate
                      attributeName="opacity"
                      from="0"
                      to="1"
                      begin={`${1.55 + delay}s`}
                      dur="0.45s"
                      fill="freeze"
                    />

                    <animate
                      attributeName="r"
                      values={device === 'md' ? '0.35;0.75;0.45' : '0.45;0.9;0.58'}
                      begin={`${1.55 + delay}s`}
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </>
                )}
              </circle>
            </g>
          )
        })}
      </svg>
    )
  }

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : (currentData.length || 1) - 1))
  }

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < (currentData.length || 1) - 1 ? prevIndex + 1 : 0))
  }

  const onClose = () => {
    setIsModalOpenVersiWeb(false)

    setMapBackgroundStyle({
      transform: 'translate(0%, 0%) scale(1)',
      transition: 'transform 0.5s ease-in-out'
    })
  }

  const handleMouseEnter = (location: string) => {
    const filterData = dataOwner.filter((data) => data.categoryYestechOwner.name === location)

    setCurrentData(filterData)
    setHoveredLocation(location)
  }

  const handleMouseLeave = (location: string) => {
    const filterData = dataOwner.filter((data) => data.categoryYestechOwner.name === location)

    setCurrentData(filterData)
    setHoveredLocation(null)
  }

  const setModal = (name: string) => {
    setCity(name)

    const filterData = dataOwner.filter((data) => data.categoryYestechOwner.name === name)

    setCurrentData(filterData)
    setCurrentImageIndex(0)
    setIsModalOpenVersiWeb(true)

    setMapBackgroundStyle({
      transform: 'translate(-10%, -10%) scale(1.2)',
      transition: 'transform 0.5s ease-in-out'
    })
  }

  const selectPartner = (name: string) => {
    setCity(name)

    const filterData = dataOwner.filter((data) => data.categoryYestechOwner.name === name)

    setCurrentData(filterData)
    setCurrentImageIndex(0)
    setIsModalOpenVersiMobile(true)
  }

  return (
    <section ref={mapSectionRef} className="h-min overflow-hidden bg-[#10121D] pb-20">
      <div className="relative mx-auto md:w-[90%] xs:w-full">
        <div className="mb-0 flex flex-col md:mb-0 xs:mb-10 xs:pb-10">
          <h2 className="relative z-20 pt-10 text-center font-bold xs:text-xl xs:text-white md:text-2xl md:text-[#CCCCCC]">
            Yes Tech Strategic Partners
          </h2>

          <p className="z-20 text-center text-xs font-normal text-[#565E93] md:hidden">
            * Tap on location to discover partner
          </p>
        </div>

        {/* Background linear peta versi mobile */}
        <img
          src="/images/home/gradient.svg"
          className="absolute left-0 right-0 top-0 z-10 h-[25%] w-full object-cover md:hidden"
          alt="gradient map"
        />

        <div className="relative mt-8 h-full xs:mt-16" style={mapBackgroundStyle}>
          {/* Peta versi desktop */}
          <img
            src="/images/home/peta.svg"
            className="relative z-0 h-full w-full object-cover xs:hidden md:block"
            alt="map indonesia"
          />

          {/* Garis koneksi desktop */}
          <div className="absolute inset-0 hidden md:block">{renderConnectionLines('md')}</div>

          {/* Peta versi mobile */}
          <img
            src="/images/home/peta.svg"
            className="relative z-0 h-full w-full object-cover -mt-[6.5rem] xs:block md:hidden"
            alt="map indonesia mobile"
          />

          {/* Garis koneksi mobile */}
          <div className="absolute inset-0 block md:hidden">{renderConnectionLines('xs')}</div>

          {/* Tampilan web marker */}
          {dataCategoryOwner.map((location) => (
            <div
              key={location.name}
              className="absolute z-20 flex-col items-center justify-center -translate-x-[50%] -translate-y-[50%] transform cursor-pointer xs:hidden md:flex"
              style={{
                top: `${location.top.md}%`,
                left: `${location.left.md}%`
              }}
              onMouseEnter={() => handleMouseEnter(location.name)}
              onMouseLeave={() => handleMouseLeave(location.name)}
              onClick={() => setModal(location.name)}
            >
              <h3 className="font-semibold text-white xs:text-xs md:text-sm">{location.name}</h3>

              <div className="relative">
                {location.name === 'Jabodetabek' && (
                  <div className="absolute inset-0 rounded-full bg-primary blur-xl" />
                )}

                <img src="/images/home/location.svg" className="relative h-auto xs:w-10 md:w-14" alt="Icon Location" />
              </div>

              <LocationInfo
                currentData={currentData}
                name={location.name}
                isHovered={hoveredLocation === location.name}
                handleMouseEnter={handleMouseEnter}
              />
            </div>
          ))}

          {/* Tampilan mobile marker */}
          {dataCategoryOwner.map((location) => (
            <div
              key={location.name}
              className="absolute z-50 flex -translate-x-[50%] -translate-y-[50%] transform cursor-pointer flex-col items-center justify-center md:hidden"
              style={{
                top: `${location.top.xs}%`,
                left: `${location.left.xs}%`
              }}
              onClick={() => selectPartner(location.name)}
            >
              <h3 className="font-semibold text-white xs:text-[9px] md:text-sm">{location.name}</h3>

              {location.name === city || location.name === 'Jabodetabek' ? (
                <div className="relative xs:w-8 md:w-14">
                  <div className="absolute inset-0 bg-primary blur-xl" />

                  <img src="/images/home/location.svg" className="relative w-full" alt="Icon Location" />
                </div>
              ) : (
                <img src="/images/home/location.svg" className="h-auto xs:w-8 md:w-14" alt="Icon Location" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Versi Web */}
      {isModalOpenVersiWeb ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-end bg-black bg-opacity-50 p-10">
          <div className="flex items-start gap-5">
            <button onClick={onClose} className="p-3 text-white focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex h-[90vh] w-[456px] flex-col overflow-y-auto rounded-lg bg-white">
              <Carousel
                selectedItem={currentImageIndex}
                showThumbs={false}
                showStatus={false}
                renderArrowPrev={() => null}
                renderArrowNext={() => null}
                className="mx-auto h-full w-full"
              >
                {currentData?.map((item, index) => (
                  <div key={index} className="h-auto w-full p-5 text-left">
                    <h2 className="text-lg text-[#9F9F9F]">{item.categoryYestechOwner.name}</h2>

                    <div className="flex items-center justify-between">
                      <div className="cursor-pointer flex-center" onClick={handlePrevClick}>
                        <img src="/icons/polygon-right.svg" alt="icon polygon right" className="w-full" />
                      </div>

                      <div className="h-[84px] w-[87px] overflow-hidden flex-center">
                        <img src={`${BASE_API}/${item.image}`} alt={item.name} className="object-cover" />
                      </div>

                      <div className="cursor-pointer flex-center" onClick={handleNextClick}>
                        <img src="/icons/polygon-left.svg" alt="icon polygon left" className="w-full" />
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col gap-3 border-t border-[#EAEAEA] px-5 pt-3">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="text-sm font-normal">{item.details}</p>
                    </div>

                    <div className="flex flex-col gap-0 pt-5 pr-10 ps-5">
                      <h3 className="mb-2 text-xl font-bold">Contact Information</h3>

                      <ul className="flex flex-col gap-5">
                        <li className="flex items-center justify-start gap-8">
                          <FaPhoneVolume className="h-5 w-5 -rotate-45" />
                          <p className="w-full text-sm font-medium">{item.noHp}</p>
                        </li>

                        <li className="flex items-center justify-start gap-8">
                          <FaEnvelope className="h-5 w-5 font-bold" />
                          <p className="w-full text-sm font-medium">{item.email}</p>
                        </li>

                        <li className="flex items-start justify-start gap-8">
                          <FaLocationDot className="h-5 w-5" />
                          <p className="w-full text-sm font-medium">{item.alamat}</p>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-3 flex flex-col gap-3 flex-center">
                      <Link target="_blank" to={item.linkWeb} className="text-sm text-primary">
                        {item.linkWeb}
                      </Link>

                      <ul className="w-full gap-8 flex-center">
                        <Link target="_blank" to={item.instagram}>
                          <FaInstagram className="h-7 w-7" />
                        </Link>

                        <Link target="_blank" to={item.youtube}>
                          <FaYoutube className="h-7 w-7" />
                        </Link>

                        <Link target="_blank" to={item.tiktok}>
                          <FaTiktok className="h-7 w-7" />
                        </Link>
                      </ul>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      ) : null}

      {/* Modal Versi Mobile */}
      {isModalOpenVersiMobile ? (
        <div className="mx-auto flex w-[92%] items-center justify-end md:hidden">
          <Carousel
            selectedItem={currentImageIndex}
            showThumbs={false}
            showStatus={false}
            renderArrowPrev={() => null}
            renderArrowNext={() => null}
            className="h-full w-full"
          >
            {currentData?.map((item) => {
              return (
                <div key={item.id} className="flex w-full flex-col items-start gap-5">
                  <div className="w-full flex-between">
                    <h2 className="line-clamp-1 text-2xl font-bold text-white">{item.categoryYestechOwner.name}</h2>

                    <p className="text-xs font-normal text-[#565E93]">*tap the logo for information</p>
                  </div>

                  <div className="flex h-min w-full flex-col overflow-auto rounded-lg bg-white p-5">
                    <div className="flex items-center justify-between">
                      <div className="cursor-pointer flex-center" onClick={handlePrevClick}>
                        <img src="/icons/polygon-right.svg" alt="icon polygon right" className="w-full" />
                      </div>

                      <div className="h-[87px] w-[87px] overflow-hidden">
                        <img src={`${BASE_API}/${item.image}`} alt={item.name} className="object-cover" />
                      </div>

                      <div className="cursor-pointer flex-center" onClick={handleNextClick}>
                        <img src="/icons/polygon-left.svg" alt="icon polygon left" className="w-full" />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-1 border-t border-[#EAEAEA] px-3 pt-5 text-left md:gap-3 md:px-5">
                      <h3 className="text-lg font-bold md:text-xl">{item.name}</h3>

                      <p className="text-xs font-normal leading-4 md:text-sm md:leading-5">{item.details}</p>
                    </div>

                    <div className="flex flex-col gap-0 pt-3 pr-5 text-left md:pr-10 md:pt-5 md:ps-5 ps-3">
                      <h3 className="mb-2 text-lg font-bold md:text-xl">Contact Information</h3>

                      <ul className="flex flex-col gap-3 md:gap-5">
                        <li className="flex items-center justify-start gap-5 md:gap-8">
                          <FaPhoneVolume className="h-5 w-5 -rotate-45" />
                          <p className="w-full text-xs font-medium md:text-sm">{item.noHp}</p>
                        </li>

                        <li className="flex items-center justify-start gap-5">
                          <FaEnvelope className="h-5 w-5 font-bold" />
                          <p className="w-full text-xs font-medium md:text-sm">{item.email}</p>
                        </li>

                        <li className="flex items-start justify-start gap-5">
                          <FaLocationDot className="h-5 w-5" />
                          <p className="line-clamp-2 w-full text-xs font-medium leading-4 md:text-sm md:leading-5">
                            {item.alamat}
                          </p>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 flex-center md:mt-3">
                      <Link target="_blank" to={item.linkWeb} className="text-xs text-primary md:text-sm">
                        {item.linkWeb}
                      </Link>

                      <ul className="w-full gap-3 flex-center md:gap-8">
                        <Link target="_blank" to={item.instagram}>
                          <FaInstagram className="h-4 w-4 md:h-7 md:w-7" />
                        </Link>

                        <Link target="_blank" to={item.tiktok}>
                          <FaTwitter className="h-4 w-4 md:h-7 md:w-7" />
                        </Link>

                        <Link target="_blank" to={item.facebook}>
                          <FaFacebook className="h-4 w-4 md:h-7 md:w-7" />
                        </Link>

                        <Link target="_blank" to={item.tiktok}>
                          <FaTiktok className="h-4 w-4 md:h-7 md:w-7" />
                        </Link>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
      ) : null}
    </section>
  )
}

export default MapView
