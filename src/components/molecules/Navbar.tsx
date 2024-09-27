import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY
    if (scrollTop > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const classBgScrolled = isScrolled ? 'bg-white' : 'bg-transparent'
  const classTextScrolled = isScrolled ? 'text-secondary' : 'text-white'
  const ImageScrolled = () => {
    if (isScrolled) {
      return <img src="/images/logo-bg-white.png" className="md:w-56 xs:w-40 -ms-4 md:-ms-0" alt="Logo" />
    } else {
      return <img src="/images/logo.svg" className="md:w-56 xs:w-40 -ms-4 md:-ms-0" alt="Logo" />
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${classBgScrolled}`}>
      <div className="container flex items-center justify-between py-5 ">
        <ImageScrolled />

        {/* Menu untuk desktop */}
        <ul className="items-center hidden gap-5 md:flex">
          <li>
            <Link
              to="/"
              className={`pb-2 transition-all hover:border-b-4 border-primary menu-navbar ${classTextScrolled}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={`pb-2 transition-all hover:border-b-4 border-primary menu-navbar ${classTextScrolled}`}
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className={`pb-2 transition-all hover:border-b-4 border-primary menu-navbar ${classTextScrolled}`}
            >
              News
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              className={`pb-2 transition-all hover:border-b-4 border-primary menu-navbar ${classTextScrolled}`}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Hamburger menu untuk mobile */}
        <FaBars
          className="block w-6 h-6 md:hidden"
          style={{ color: isScrolled ? 'black' : 'white' }}
          onClick={toggleMenu}
        />

        {/* Menu untuk mobile */}
        <div
          className={`md:hidden fixed top-0 left-0 right-0 h-screen w-screen bg-black bg-opacity-90 bg-[url('/images/bg-navbar-mobile.svg')]  bg-cover bg-no-repeat  z-50 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <ul className="flex flex-col items-end w-full gap-4 px-2 pt-16">
            <li>
              <Link to="/" className="px-4 py-2 text-white menu-navbar" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="px-4 py-2 text-white menu-navbar" onClick={toggleMenu}>
                Product
              </Link>
            </li>
            <li>
              <Link to="/news" className="px-4 py-2 text-white menu-navbar" onClick={toggleMenu}>
                News
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="px-4 py-2 text-white menu-navbar" onClick={toggleMenu}>
                Contact Us
              </Link>
            </li>
          </ul>
          <FaTimes className="absolute w-6 h-6 text-white cursor-pointer top-5 right-5" onClick={toggleMenu} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
