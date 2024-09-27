import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-[#10121D] relative z-40  overflow-hidden -mt-2 pt-5 mb:pt-0">
      <div className="container flex flex-col gap-3 p-0 md:p-5">
        <div className="flex flex-col items-center justify-between w-full md:flex-row">
          <div className="w-full md:w-[45%] flex justify-between md:justify-start items-center ">
            <img src="/images/logo.svg" className="w-32 md:w-56" alt="Logo" />
            <h4 className="text-sm text-white opacity-70 md:hidden">Yes Tech Indonesia</h4>
          </div>
          <span className="block w-full border-[1px] border-slate-800 my-5 md:hidden"></span>

          <div className="flex w-full my-2 md:my-0 gap-3 md:gap-0 md:w-[55%] items-center justify-between ">
            <h4 className="text-xs font-normal text-white lg:text-xl">We are looking for more strategic partner</h4>
            <div className="flex items-center justify-center">
              <button className="py-2 text-sm font-semibold text-white transition-all border-2 rounded-full cursor-pointer w-36 md:text-lg md:w-56 hover:bg-primary hover:text-white border-primary">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <span className="md:block w-full border-[1px] border-slate-800 my-5 hidden"></span>
        <div className="flex flex-col-reverse items-center justify-between mb-5 md:flex-row md:mb-0">
          <div className="text-white w-full md:w-[45%]">
            <h4 className="hidden mb-5 text-lg font-normal md:block">Yes Tech Indonesia</h4>
            <ul className="flex items-center justify-start gap-4 my-4 md:gap-8 md:my-0">
              <li>
                <FaInstagram className="w-5 h-5 md:w-7 md:h-7" />
              </li>
              <li>
                <FaFacebook className="w-4 h-4 md:w-6 md:h-6" />
              </li>
              <li>
                <FaTiktok className="w-4 h-4 md:w-6 md:h-6" />
              </li>
              <li>
                <FaYoutube className="w-4 h-4 md:w-6 md:h-6" />
              </li>
            </ul>
          </div>

          <ul className="gap-2 md:gap-5 text-white flex justify-start md:justify-between items-center w-full flex-wrap md:flex-nowrap md:w-[55%]">
            <li>
              <Link to="/" className="text-xs menu-footer lg:text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="text-xs menu-footer lg:text-sm">
                Products
              </Link>
            </li>
            <li>
              <Link to="/" className="text-xs menu-footer lg:text-sm">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/" className="text-xs menu-footer lg:text-sm">
                Company Profile
              </Link>
            </li>
            <li>
              <Link to="/" className="text-xs menu-footer lg:text-sm">
                Case List
              </Link>
            </li>
            <li>
              <Link to="/" className="text-xs menu-footer lg:text-sm">
                YesTech Strategic Partners
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="w-full p-3 text-xs font-normal text-center text-white md:text-sm bg-primary">
        Copyright © 2020. YesTech. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
