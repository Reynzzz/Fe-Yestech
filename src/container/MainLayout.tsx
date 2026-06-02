import { ReactNode } from 'react'
import Navbar from '../components/molecules/Navbar'
import Footer from '../components/molecules/Footer'
import IconHome from '../components/molecules/IconHome'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

interface IMainLayout {
  children: ReactNode
}

const MainLayout = ({ children }: IMainLayout) => {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <IconHome />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} style={{ height: '100%' }}>
          {children}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default MainLayout
