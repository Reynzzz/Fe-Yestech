import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ABOUTUS from '../../services/about-us'
import { IWarehouse } from '../../types/IWarehouse'
import { Carousel } from 'react-responsive-carousel'
import { BASE_API } from '../../config/env'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Skeleton from '../../components/atoms/Skeleton'

const Warehouse = () => {
  const [data, setData] = useState<IWarehouse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await ABOUTUS.getWarehouse()
      const data = await response
      setData(data[0])
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
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : (data?.image.length || 1) - 1))
  }

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < (data?.image.length || 1) - 1 ? prevIndex + 1 : 0))
  }

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <div
      id="warehouse"
      className="relative flex flex-col items-start justify-center w-full gap-10 px-5 py-10 bg-white lg:py-32 h-min lg:flex-row lg:px-14"
    >
      <div className="w-full lg:w-[30%] flex flex-col gap-5 lg:pt-10">
        <h3 className="text-3xl font-bold leading-10 text-secondary">
          Warehouse <br /> and Services Center
        </h3>
        <p className="text-[16px] font-normal text-[#444444]">{data?.alamat}</p>
        <Link to={'/'} target="_blank" className="flex items-center gap-3 text-[16px] font-norma text-primary ">
          See on Google Maps
          <div className="flex-center">
            <img src="/icons/arrow-right-long-blue.svg" alt="icon right right blue" className="w-full " />
          </div>
        </Link>
      </div>

      <div className="w-full lg:w-[70%] flex items-center justify-between px-0 md:px-5 gap-5">
        <div className="items-center justify-center hidden mb-24 cursor-pointer md:flex" onClick={handlePrevClick}>
          <img src="/icons/arrow-right-grey.svg" alt="icon right right grey" className="w-full " />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Carousel
            selectedItem={currentImageIndex}
            showThumbs={false}
            showStatus={false}
            renderArrowPrev={() => null}
            renderArrowNext={() => null}
            className="w-full h-full mx-auto overflow-hidden "
          >
            {data?.image.map((image, index) => (
              <div key={index} className="w-full h-auto overflow-hidden">
                <img src={`${BASE_API}/${image.link}`} alt={data?.name} className="w-full h-auto" />
              </div>
            ))}
          </Carousel>
          <ul className="flex items-center justify-start w-full gap-3 overflow-x-auto">
            {data?.image.map((image, index) => (
              <li
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`cursor-pointer rounded-xl ${index === currentImageIndex ? 'border-2 border-primary' : ''}`}
              >
                <img
                  src={`${BASE_API}/${image.link}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="md:w-[50px] w-[35px] h-[35px]  md:h-[50px] rounded-md md:rounded-xl object-cover"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="items-center justify-center hidden mb-24 cursor-pointer md:flex" onClick={handleNextClick}>
          <img src="/icons/arrow-right-grey.svg" alt="icon right right grey" className="w-full rotate-180" />
        </div>
      </div>
    </div>
  )
}

export default Warehouse
