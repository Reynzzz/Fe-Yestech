import React, { useRef, useState } from 'react'
import Slider from 'react-slick'

const Certificate: React.FC = () => {
  const certificates: string[] = [
    '/images/certificate/list-1.png',
    '/images/certificate/list-2.png',
    '/images/certificate/list-3.png'
  ]
  const [tempUrl, setTempUrl] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const sliderRef = useRef<Slider>(null)

  const settingsMobile = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentImageIndex,
    beforeChange: (oldIndex: number, newIndex: number) => {
      console.log('🚀 ~ oldIndex:', oldIndex)
      return setCurrentImageIndex(newIndex)
    },
    customPaging: (i: number) => (
      <div className={`custom-dots-about-us-history ${i === currentImageIndex ? 'active' : ''}`}></div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="relative ">
        <ul className="absolute top-0  left-[50%]">{dots}</ul>
      </div>
    )
  }

  const next = () => {
    sliderRef.current?.slickNext()
  }

  const previous = () => {
    sliderRef.current?.slickPrev()
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="relative items-center justify-start w-full h-[80vh] md:h-[70vh]  lg:h-screen px-5 lg:px-14">
      <div className="w-full ">
        <h3 className="text-3xl font-bold leading-10 text-secondary">CERTIFICATES</h3>
        {/* tampilan di dekstop */}
        <ul className="relative hidden w-full h-full lg:block">
          {certificates.map((src, index) => (
            <li
              key={index}
              className={`absolute cursor-pointer certificate-list-item  bottom-0 left-0 ps-20 pt-20`}
              style={{
                zIndex: 20 + index,
                top: `${index * 40}px`,
                left: `${index * -40}px`,
                transition: 'all 0.5s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.stopPropagation()
                // setHoveredIndex(index)
                setTempUrl(src)
              }}
              onMouseLeave={(e) => {
                e.stopPropagation()
                // setHoveredIndex(null)
                setTempUrl('')
              }}
            >
              {tempUrl === src ? (
                <div className="relative">
                  <img
                    src={src}
                    alt={`Certificate ${index + 1}`}
                    className={` duration-300 transition-transform `}
                    style={{
                      transform:
                        tempUrl === src
                          ? `translateY(${index == 0 ? -80 : index === 1 ? -120 : index * -80}px)
                          
                  
                          translateX(${index == 0 ? 35 : index === 1 ? 37 : index >= 2 ? 39 : 0}rem)  scale(1.3)`
                          : 'duration-300 transition-transform'
                    }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={src}
                    alt={`Certificate ${index + 1}`}
                    className={` w-[258px] h-auto duration-300 transition-transform`}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* tampilan di mobile dan tab */}
        <ul className="relative w-full h-full lg:hidden">
          {certificates.map((src, index) => (
            <li
              key={index}
              className={`absolute cursor-pointer certificate-list-item  bottom-0 left-0 ps-28 pt-20`}
              style={{
                zIndex: 20 + index,
                top: `${index * 40}px`,
                left: `${index * -40}px`,
                transition: 'all 0.5s ease-in-out'
              }}
              onClick={() => handleImageClick(index)}
            >
              <div>
                <img
                  src={src}
                  alt={`Certificate ${index + 1}`}
                  className={` w-[208px] md:w-[308px] h-auto duration-300 transition-transform`}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* modal box certificate */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 md:hidden">
            <div className="relative w-full max-w-lg">
              <button className="absolute p-2 text-3xl text-white -top-20 right-11" onClick={closeModal}>
                &times;
              </button>
              <Slider ref={sliderRef} {...settingsMobile}>
                {certificates.map((src, index) => (
                  <div key={index}>
                    <img src={src} alt={`Certificate ${index + 1}`} className="w-[70%] mx-auto h-auto" />
                  </div>
                ))}
              </Slider>
            </div>
            <div
              className="absolute z-50 flex items-center justify-center bottom-[18%] left-16 md:hidden"
              onClick={previous}
            >
              <img src="/icons/arrow-right-grey.svg" alt="icon right grey" className="w-6 h-6" />
            </div>
            <div className="absolute flex items-center justify-center right-16 md:hidden bottom-[18%]" onClick={next}>
              <img src="/icons/arrow-right-grey.svg" alt="icon right grey" className="w-6 h-6 rotate-180" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Certificate
