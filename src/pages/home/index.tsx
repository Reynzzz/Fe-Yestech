import { ReactLenis } from 'lenis/react'
import { motion, Variants } from 'framer-motion'
import MapView from '../../components/organisms/MapView'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import CaseList from './CaseList'
import ProductBanner from './ProductBanner'
import VirtualTour from './virtual_tour'

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: 'easeOut'
    }
  }
}

const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: 'easeOut'
    }
  }
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
}

const Home: React.FC = () => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.35,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2
      }}
    >
      <main className="overflow-hidden bg-white">
        <motion.section initial="hidden" animate="visible" variants={fadeUp}>
          <Banner />
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
        >
          <ProductBanner />
        </motion.section>

        <section className="relative top-10 w-full overflow-hidden bg-[#F9F9FB] pb-14 pt-10 md:my-5 md:pb-16">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <motion.div
            className="relative z-10 mx-auto w-[90%] md:w-[85%]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer}
          >
            <motion.button
              variants={fadeUp}
              whileHover={{
                y: -3,
                scale: 1.03
              }}
              whileTap={{
                scale: 0.97
              }}
              className="mb-8 rounded-full bg-white px-5 py-2 text-sm font-bold text-[#202335] shadow-sm ring-1 ring-black/5 md:mb-10"
            >
              Welcome to YesTech
            </motion.button>

            <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row md:gap-14">
              <motion.div
                variants={fadeLeft}
                className="flex w-full flex-col items-start justify-center gap-4 md:w-[58%] md:gap-8"
              >
                <motion.div variants={fadeUp}>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">About Company</p>

                  <h2 className="text-4xl font-bold leading-tight text-[#111827] md:text-6xl">About Us</h2>
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  className="w-full text-sm font-normal leading-7 text-gray-600 md:w-[88%] md:text-lg md:leading-8"
                >
                  YES TECH Team was founded in 2001, which specializes in LED screen manufacturing and solution
                  providing. Our LED display solutions and products have gained global recognition, reaching 100+
                  countries and regions. YES TECH LED display solutions have showcased exceptional performance in
                  prestigious events such as the 19th Asian Games, and iconic venues like the main stage of U2’s Tour at
                  MSG Sphere, the super bowl LVIII, India, Indonesia, Japan G20 Summit, Qatar World Cup, Beijing Winter
                  Olympics, Dubai World Expo, Russia World Cup, Brazil World Cup, and the London Olympics, etc.
                </motion.p>

                <motion.ul
                  variants={staggerContainer}
                  className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-4"
                >
                  {['Enterprise Tenet', 'Enterprise Aim', 'Enterprise Spirit', 'New Journey New Version'].map(
                    (item) => (
                      <motion.li
                        key={item}
                        variants={fadeUp}
                        whileHover={{
                          y: -4,
                          scale: 1.02
                        }}
                        className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#202335] shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg md:text-base"
                      >
                        <img
                          src="/icons/check-box.svg"
                          className="h-6 w-6 rounded-md p-1 md:h-7 md:w-7 md:p-[7px]"
                          alt="check"
                        />
                        {item}
                      </motion.li>
                    )
                  )}
                </motion.ul>

                <motion.div variants={fadeUp} className="w-full">
                  <motion.div
                    whileHover={{
                      y: -4,
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.97
                    }}
                    className="w-full md:w-fit"
                  >
                    <Link
                      to="/about-us"
                      className="mt-3 block w-full rounded-full border-2 border-primary px-8 py-3 text-center font-semibold transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_16px_40px_rgba(0,122,255,0.25)] md:w-60"
                    >
                      About Us
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeRight}
                className="relative flex w-full justify-center md:w-[42%] md:justify-end"
              >
                <motion.div
                  animate={{
                    y: [0, -12, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute -left-8 top-10 h-36 w-36 rounded-full bg-primary/10 blur-3xl"
                />

                <motion.div
                  animate={{
                    y: [0, 14, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl"
                />

                <motion.img
                  src="/images/square-graphic-about-us.svg"
                  alt="square graphic top"
                  className="absolute -left-[5.3rem] -top-[4.3rem] hidden md:block"
                  animate={{
                    rotate: [0, 4, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />

                <motion.img
                  src="/icons/mobile/corak-square-about.svg"
                  alt="square graphic top"
                  className="absolute -left-1 -top-[2rem] md:hidden"
                  animate={{
                    rotate: [0, 4, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />

                <motion.div
                  whileHover={{
                    y: -8,
                    scale: 1.02
                  }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeOut'
                  }}
                  className="relative z-20 overflow-hidden rounded-[32px] bg-white/60 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)] ring-1 ring-black/5 backdrop-blur-md"
                >
                  <img
                    src="/images/about-us.png"
                    alt="about us image"
                    className="h-full w-full rounded-[24px] object-cover"
                  />
                </motion.div>

                <motion.img
                  src="/images/sguare-graphic-bottom-about-us.svg"
                  alt="square graphic bottom"
                  className="absolute -bottom-8 right-0 md:-bottom-3 md:-right-16"
                  animate={{
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={fadeUp}
        >
          <CaseList />
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={fadeUp}
        >
          <VirtualTour />
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={fadeUp}
        >
          <MapView />
        </motion.section>
      </main>
    </ReactLenis>
  )
}

export default Home
