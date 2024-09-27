import React, { useEffect, useState } from 'react'
import LocationInfo from '../molecules/LocationInfo'
import { FaEnvelope, FaFacebook,FaYoutube, FaInstagram, FaPhoneVolume, FaTiktok, FaTwitter } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import Home from '../../services/home'
import { Carousel } from 'react-responsive-carousel'
import { BASE_API } from '../../config/env'
import { Link } from 'react-router-dom'
import { ICategoryOwner } from '../../types/IMapView'
import { IOwner } from '../../types/IMapView'

const MapView: React.FC = () => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [isModalOpenVersiWeb, setIsModalOpenVersiWeb] = useState<boolean>(false)
  const [isModalOpenVersiMobile, setIsModalOpenVersiMobile] = useState<boolean>(false)
  const [dataCategoryOwner, setDataCategoryOwner] = useState<ICategoryOwner[]>([])
  const [dataOwner, setDataOwner] = useState<IOwner[]>([])
  const [currentData, setCurrentData] = useState<IOwner[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  // console.log(currentData);
  
  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : (currentData.length || 1) - 1))
  }

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < (currentData.length || 1) - 1 ? prevIndex + 1 : 0))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mapBackgroundStyle, setMapBackgroundStyle] = useState<any>({
    transform: 'translate(0%, 0%) scale(1)',
    transition: 'transform 0.5s ease-in-out'
  })
  // base location owner
  const locations = [
    { name: 'Jabodetabek', top: { md: 63, xs: 61.5 }, left: { md: 27.5, xs: 31 } },
    { name: 'Jogjakarta', top: { md: 71, xs: 71.5 }, left: { md: 33, xs: 41 } },
    { name: 'Surabaya', top: { md: 67.5, xs: 66 }, left: { md: 38.5, xs: 56 } },
    { name: 'Bali', top: { md: 72, xs: 70 }, left: { md: 44.5, xs: 69 } },
    {name : 'Manado' , top : {md: 28,xs : 26}, left : {md : 64.5, xs : 100}},
    {name : 'Samarinda' , top : {md: 38,xs : 39}, left : {md : 48, xs :75}}
  ]

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

  const setModal = (name: string) => {
    setCity(name)
    setIsModalOpenVersiWeb(true)
    setMapBackgroundStyle({
      transform: 'translate(-10%, -10%) scale(1.2)',
      transition: 'transform 0.5s ease-in-out'
    })
  }

  const handleMouseLeave = (location: string) => {
    const filterData = dataOwner.filter((data) => data.categoryYestechOwner.name === location)
    setCurrentData(filterData)
    setHoveredLocation(null)
  }

  const selectPartner = (name: string) => {
    setCity(name)
    const filterData = dataOwner.filter((data) => data.categoryYestechOwner.name === name)
    setCurrentData(filterData)
    setIsModalOpenVersiMobile(true)
  }

  return (
    <section className="h-min mt-10 pb-20 bg-[#10121D] overflow-hidden">
      <div className="relative   md:w-[90%] mx-auto xs:w-full">
        <h2 className="relative z-20 pt-20 xs:text-xl md:text-2xl font-bold text-center xs:text-white md:text-[#CCCCCC] flex flex-col md:mb-0 xs:mb-5">
          Yes Tech Strategic Partners
        </h2>
        <p className="text-[#565E93] text-xs font-normal text-center md:hidden relative z-20 ">
          * Tap on location to discover partner
        </p>

        {/* bg liner peta versi mobile */}
        <img
          src="/images/home/gradient.svg"
          className="top-0 w-full h-[25%]  z-10 left-0 right-0 md:hidden absolute object-cover"
          alt="image [peta]:"
        />

        <div className="relative h-full " style={mapBackgroundStyle}>
          <img src="/images/home/peta.svg" className="object-cover w-full h-full md:block xs:hidden" alt="image" />

          {/* bg peta versi mobile */}
          <img
            src="/images/home/peta-versi-mobile.svg"
            className="relative z-0 object-cover w-full h-full -mt-[7.5rem] md:hidden xs:block"
            alt="image [peta]:"
          />

          {/* tampilan web */}
          {dataCategoryOwner.map((location) => (
            <div
              key={location.name}
              className={`absolute xs:hidden md:flex flex-col items-center justify-center transform -translate-x-[50%] -translate-y-[50%] cursor-pointer
                `}
              style={{
                top: `${location.top.md}%`,
                left: `${location.left.md}%`
              }}
              onMouseEnter={() => handleMouseEnter(location.name)}
              onMouseLeave={() => handleMouseLeave(location.name)}
              onClick={() => setModal(location.name)}
            >
              <h3 className="font-semibold text-white xs:text-xs md:text-sm">{location.name}</h3>

              <img src="/images/home/location.svg" className="h-auto xs:w-10 md:w-14" alt="Icon Location" />

              <LocationInfo
                currentData={currentData}
                name={location.name}
                isHovered={hoveredLocation === location.name}
                handleMouseEnter={handleMouseEnter}
              />
            </div>
          ))}

          {/* Tampilan Mobil */}
          {dataCategoryOwner.map((location) => (
            <div
              key={location.name}
              className={`absolute z-50 md:hidden flex flex-col items-center justify-center transform -translate-x-[50%] -translate-y-[50%] cursor-pointer
                `}
              style={{
                top: `${location.top.xs}%`,
                left: `${location.left.xs}%`
              }}
              onClick={() => selectPartner(location.name)}
            >
              {location.name === 'Jogjakarta' ? (
                <h3 className="font-semibold text-white xs:text-xs md:text-sm md:block xs:hidden">{location.name}</h3>
              ) : (
                <h3 className="font-semibold text-white xs:text-xs md:text-sm">{location.name}</h3>
              )}

              {location.name == city ? (
                <div className="relative xs:w-10 md:w-14">
                  <div className="absolute inset-0 bg-primary blur-xl"></div>
                  <img src="/images/home/location.svg" className="relative w-full" alt="Icon Location" />
                </div>
              ) : (
                <img src="/images/home/location.svg" className="h-auto xs:w-10 md:w-14" alt="Icon Location" />
              )}
              {location.name === 'Jogjakarta' ? (
                <h3 className="-mt-2 font-semibold text-white xs:text-xs md:text-sm md:hidden">{location.name}</h3>
              ) : null}

              <LocationInfo
                currentData={currentData}
                name={location.name}
                isHovered={hoveredLocation === location.name}
                handleMouseEnter={handleMouseEnter}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Versi Web */}
      {isModalOpenVersiWeb ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-end bg-black bg-opacity-50 p-10 ">
          <div className="flex items-start gap-5">
            <button onClick={onClose} className="p-3 text-white focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-[456px] h-[90vh] overflow-y-auto bg-white rounded-lg flex flex-col ">
              <Carousel
                selectedItem={currentImageIndex}
                showThumbs={false}
                showStatus={false}
                renderArrowPrev={() => null}
                renderArrowNext={() => null}
                className="w-full h-full mx-auto "
              >
                {currentData?.map((item, index) => (
                  <div key={index} className="w-full h-auto p-5 text-left">
                    <h2 className="text-lg  text-[#9F9F9F]">{item.categoryYestechOwner.name}</h2>
                    <div className="flex items-center justify-between">
                      <div className="cursor-pointer flex-center" onClick={handlePrevClick}>
                        <img src="/icons/polygon-right.svg" alt="icon polygon right" className="w-full" />
                      </div>
                      <div className="w-[87px] h-[84px] flex-center overflow-hidden">
                        <img src={`${BASE_API}/${item.image}`} alt={item.name} className="object-cover" />
                      </div>
                      <div className="cursor-pointer flex-center " onClick={handleNextClick}>
                        <img src="/icons/polygon-left.svg" alt="icon polygon left" className="w-full" />
                      </div>
                    </div>
                    <div className="border-t border-[#EAEAEA] px-5 mt-3 pt-3 flex flex-col gap-3 ">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="text-sm font-normal">{item.details}</p>
                    </div>
                    <div className="flex flex-col gap-0 pt-5 pr-10 ps-5">
                      <h3 className="mb-2 text-xl font-bold">Contact Information</h3>
                      <ul className="flex flex-col gap-5">
                        <li className="flex items-center justify-start gap-8">
                          <FaPhoneVolume className="w-5 h-5 -rotate-45" />
                          <p className="w-full text-sm font-medium">{item.noHp}</p>
                        </li>
                        <li className="flex items-center justify-start gap-8">
                          <FaEnvelope className="w-5 h-5 font-bold" />
                          <p className="w-full text-sm font-medium">{item.email}</p>
                        </li>
                        <li className="flex items-start justify-start gap-8">
                          <FaLocationDot className="w-5 h-5" />
                          <p className="w-full text-sm font-medium ">{item.alamat}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3 mt-3 flex-center">
                      <Link target="_blank" to={item.linkWeb} className="text-sm text-primary">
                        {item.linkWeb}
                      </Link>
                      <ul className="w-full gap-8 flex-center ">
                        <Link target="_blank" to={item.instagram}>
                          <FaInstagram className="w-7 h-7" />
                        </Link>
                        <Link target="_blank" to={item.youtube}>
                          <FaYoutube className="w-7 h-7" />
                        </Link>
                        {/* <Link target="_blank" to={item.facebook}>
                          <FaFacebook className="w-7 h-7" />
                        </Link> */}
                        <Link target="_blank" to={item.tiktok}>
                          <FaTiktok className="w-7 h-7" />
                        </Link>
                      </ul>
                    </div>
                    {/* <img src={`${BASE_API}/${image.link}`} alt={data?.name} className="w-full h-auto" /> */}
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      ) : null}

      {/* Modal Versi Mobile */}
      {isModalOpenVersiMobile ? (
        <div className="w-[92%] mx-auto flex items-center justify-end  md:hidden ">
          <Carousel
            selectedItem={currentImageIndex}
            showThumbs={false}
            showStatus={false}
            renderArrowPrev={() => null}
            renderArrowNext={() => null}
            className="w-full h-full "
          >
            {currentData?.map((item) => {
              return (
                <div key={item.id} className="flex flex-col items-start w-full gap-5">
                  <div className="w-full flex-between">
                    <h2 className="text-2xl font-bold text-white line-clamp-1">{item.categoryYestechOwner.name}</h2>
                    <p className="text-xs font-normal text-[#565E93]">*tap the logo for information</p>
                  </div>
                  <div className="flex flex-col w-full p-5 overflow-auto bg-white rounded-lg h-min ">
                    <div className="flex items-center justify-between">
                      <div className="cursor-pointer flex-center" onClick={handlePrevClick}>
                        <img src="/icons/polygon-right.svg" alt="icon polygon right" className="w-full" />
                      </div>
                      <div className="w-[87px] h-[87px] overflow-hidden">
                        <img src={`${BASE_API}/${item.image}`} alt={item.name} className="object-cover" />
                      </div>
                      <div className="cursor-pointer flex-center" onClick={handleNextClick}>
                        <img src="/icons/polygon-left.svg" alt="icon polygon left" className="w-full" />
                      </div>
                    </div>

                    <div className="border-t border-[#EAEAEA] text-left px-3 md:px-5 mt-5 pt-5 flex flex-col gap-1 md:gap-3 ">
                      <h3 className="text-lg font-bold md:text-xl">{item.name}</h3>
                      <p className="text-xs font-normal leading-4 md:text-sm md:leading-5">{item.details}</p>
                    </div>
                    <div className="flex flex-col gap-0 pt-3 pr-5 text-left md:pr-10 md:pt-5 md:ps-5 ps-3">
                      <h3 className="mb-2 text-lg font-bold md:text-xl">Contact Information</h3>
                      <ul className="flex flex-col gap-3 md:gap-5">
                        <li className="flex items-center justify-start gap-5 md:gap-8">
                          <FaPhoneVolume className="w-5 h-5 -rotate-45" />
                          <p className="w-full text-xs font-medium md:text-sm">{item.noHp}</p>
                        </li>
                        <li className="flex items-center justify-start gap-5">
                          <FaEnvelope className="w-5 h-5 font-bold" />
                          <p className="w-full text-xs font-medium md:text-sm">{item.email}</p>
                        </li>
                        <li className="flex items-start justify-start gap-5">
                          <FaLocationDot className="w-5 h-5" />
                          <p className="w-full text-xs font-medium leading-4 line-clamp-2 md:leading-5 md:text-sm">
                            {item.alamat}
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3 mt-5 flex-center md:mt-3">
                      <Link target="_blank" to={item.linkWeb} className="text-xs md:text-sm text-primary">
                        {item.linkWeb}
                      </Link>
                      <ul className="w-full gap-3 md:gap-8 flex-center ">
                        <Link target="_blank" to={item.instagram}>
                          <FaInstagram className="w-4 h-4 md:w-7 md:h-7" />
                        </Link>
                        <Link target="_blank" to={item.tiktok}>
                          <FaTwitter className="w-4 h-4 md:w-7 md:h-7" />
                        </Link>
                        <Link target="_blank" to={item.facebook}>
                          <FaFacebook className="w-4 h-4 md:w-7 md:h-7" />
                        </Link>
                        <Link target="_blank" to={item.tiktok}>
                          <FaTiktok className="w-4 h-4 md:w-7 md:h-7" />
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
