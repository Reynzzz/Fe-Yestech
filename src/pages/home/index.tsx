import MapView from '../../components/organisms/MapView'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import CaseList from './CaseList'
import ProductBanner from './ProductBanner'
const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <ProductBanner />

      <section className=" w-full h-min bg-[#F9F9FB] relative top-10 overflow-hidden md:my-5 md:pb-5">
        <button className="font-bold bg-[#F4F4F4] rounded-md p-2 mt-8 md:ml-10 ml-[6.5rem] mb-3 md:mb-0">
          Welcome to YesTech
        </button>
        <div className="w-full md:w-[85%] m-auto flex-between flex-col-reverse md:flex-row">
          <div className="flex flex-col items-start justify-center w-[90%] mx-auto  md:w-[60%] gap-4 md:gap-8 mt-10">
            <h2 className="text-4xl font-bold md:text-6xl">About Us</h2>
            <p className="md:text-lg text-sm font-normal w-full md:w-[80%]">
              YES TECH Team was founded in 2001, which specializes in LED screen manufacturing and solution providing.
              Our LED display solutions and products have gained global recognition, reaching 100+ countries and
              regions. YES TECH LED display solutions have showcased exceptional performance in prestigious events such
              as the 19th Asian Games, and iconic venues like the main stage of U2’s Tour at MSG Sphere, the super bowl
              LVIII, India, Indonesia, Japan G20 Summit, Qatar World Cup, Beijing Winter Olympics, Dubai World Expo,
              Russia World Cup, Brazil World Cup, and the London Olympics, etc.
            </p>
            <ul className="flex flex-col justify-start w-full gap-3 mt-4 md:gap-8">
              <div className="flex items-start justify-start w-full gap-5 ">
                <li className="text-[12px] list-about-us gap-5 md:gap-2 md:text-lg">
                  <img src="/icons/check-box.svg" className="list-item-about-us w-5 h-5 p-1 md:w-7 md:h-7 md:p-[7px]" />
                  Enterprise Tenet
                </li>
                <li className="text-[12px] list-about-us gap-5 md:gap-2 md:text-lg">
                  <img src="/icons/check-box.svg" className="list-item-about-us w-5 h-5 p-1 md:w-7 md:h-7 md:p-[7px]" />
                  Enterprise Aim
                </li>
              </div>
              <div className="flex items-start justify-start w-full gap-5 ">
                <li className="text-[12px] list-about-us gap-5 md:gap-2 md:text-lg">
                  <img src="/icons/check-box.svg" className="list-item-about-us w-5 h-5 p-1 md:w-7 md:h-7 md:p-[7px]" />
                  Enterprise Spirit
                </li>
                <li className="text-[12px] list-about-us gap-5 md:gap-2 md:text-lg">
                  <img src="/icons/check-box.svg" className="list-item-about-us w-5 h-5 p-1 md:w-7 md:h-7 md:p-[7px]" />
                  New Journey New Version
                </li>
              </div>
            </ul>
            <div className="flex items-start justify-start w-full ">
              <Link
                to="/about-us"
                className="w-[90%] mx-auto md:mx-0 py-2 mt-5 font-semibold text-center border-2 rounded-full md:w-60 md:px-12 button-primary border-primary"
              >
                About Us
              </Link>
            </div>
          </div>
          <div className="relative flex justify-end w-full md:w-[40%] ">
            <img
              src="/images/square-graphic-about-us.svg"
              alt="square graphic top"
              className="absolute md:block hidden -left-[5.3rem] -top-[4.3rem] "
            />

            <img
              src="/icons/mobile/corak-square-about.svg"
              alt="square graphic top"
              className="absolute md:hidden -left-1 -top-[2rem] "
            />
            <img src="/images/about-us.png" alt="about us image" className="relative z-20 w-full h-full px-5 md:px-0" />
            <img
              src="/images/sguare-graphic-bottom-about-us.svg"
              alt="square graphic bottom"
              className="absolute right-0 -bottom-8 md:-bottom-3 md:-right-16 "
            />
          </div>
        </div>
      </section>
      <CaseList />

      <MapView />
    </>
  )
}

export default Home
