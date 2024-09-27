import { ReactNode } from 'react'
import Navbar from '../components/molecules/Navbar'
import Footer from '../components/molecules/Footer'
import IconHome from '../components/molecules/IconHome'

interface IMainLayout {
  children: ReactNode
}
const MainLayout = ({ children }: IMainLayout) => {
  return (
    <>
      <main>
        <Navbar />
        <IconHome />
        {children}
        <Footer />
      </main>
    </>
  )
}

export default MainLayout
