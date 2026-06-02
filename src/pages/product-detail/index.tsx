import RelatedProduct from './related-product'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IItemProduct, IProduct } from '../../types/IProduct'
import PRODUCT from '../../services/product'
import Skeleton from '../../components/atoms/Skeleton'
import { BASE_API } from '../../config/env'
import DownloadTable from './DownloadTable'
import { IParameters } from '../../types/IWarehouse'

gsap.registerPlugin(ScrollTrigger)

type RenderContentProps = {
  layout: string
  item: IItemProduct
  index: number
}

const LIMIT_PAGE = 3

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0
  }
}

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40
  },
  visible: {
    opacity: 1,
    x: 0
  }
}

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40
  },
  visible: {
    opacity: 1,
    x: 0
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
}

const getImageUrl = (url?: string) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${BASE_API}/${url}`
}

const getSectionTheme = (index: number) => {
  const isDark = index % 2 === 0

  return {
    wrapper: isDark ? 'bg-[#070b14] text-white border-white/10' : 'bg-[#f5f7fb] text-[#111827] border-black/5',
    title: isDark ? 'text-white' : 'text-[#111827]',
    text: isDark ? 'text-white/70' : 'text-gray-600',
    line: isDark ? 'from-primary to-cyan-300' : 'from-primary to-blue-500',
    imageCard: isDark
      ? 'bg-white/[0.04] border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.45)]'
      : 'bg-white border-black/5 shadow-[0_30px_80px_rgba(15,23,42,0.12)]',
    glow: isDark ? 'bg-primary/20' : 'bg-primary/10'
  }
}

const DetailProduct = () => {
  const { id } = useParams()
  const [data, setdata] = useState<IProduct | null>(null)
  const [parameters, setParameters] = useState<IParameters[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const pageRef = useRef<HTMLDivElement | null>(null)
  const heroImageRef = useRef<HTMLDivElement | null>(null)

  const [params, setParams] = useState({
    category: '',
    search: '',
    page: 1,
    limit: LIMIT_PAGE,
    type: 'all'
  })

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-section',
        {
          opacity: 0,
          y: 80,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.content-wrapper',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo(
        '.gsap-reveal',
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.content-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.to('.hero-glow-one', {
        x: 60,
        y: -40,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('.hero-glow-two', {
        x: -50,
        y: 50,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to(heroImageRef.current, {
        y: -18,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }, pageRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isLoading, data])

  const fetchData = async (id: number) => {
    setIsLoading(true)

    try {
      const response = await PRODUCT.getDetailProduct(id)
      const result = await response

      setdata(result.data)
      setParameters(result?.data?.parameters || [])

      setParams((prev) => ({
        ...prev,
        category: result?.data?.categoryId || '',
        type: 'all'
      }))
    } catch (error) {
      console.log('🚀 ~ error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchData(Number(id))
  }, [id])

  if (isLoading) {
    return <Skeleton />
  }

  const RenderImages = ({ item, index }: { item: IItemProduct; index: number }) => {
    const theme = getSectionTheme(index)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`relative w-full overflow-hidden rounded-[28px] border p-3 md:p-5 ${theme.imageCard}`}
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl ${theme.glow}`}
        />

        <div className="relative grid gap-4">
          {item?.images?.map((image, imgIndex) => (
            <motion.img
              key={imgIndex}
              src={image?.url}
              alt={item?.title || 'product detail'}
              className="h-auto w-full rounded-2xl object-cover"
              whileHover={{
                scale: 1.03
              }}
              transition={{
                duration: 0.4,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      </motion.div>
    )
  }

  const RenderText = ({ item, index }: { item: IItemProduct; index: number }) => {
    const theme = getSectionTheme(index)

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="relative z-10 flex w-full flex-col gap-4"
      >
        <motion.div variants={fadeUp} className={`h-1 w-20 rounded-full bg-gradient-to-r ${theme.line}`} />

        <motion.h3
          variants={fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`text-2xl font-bold leading-tight md:text-4xl ${theme.title}`}
        >
          {item?.title}
        </motion.h3>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`text-sm leading-7 md:text-base ${theme.text}`}
        >
          {item?.description}
        </motion.p>
      </motion.div>
    )
  }

  const RenderContentSection: React.FC<RenderContentProps> = ({ layout, item, index }) => {
    const theme = getSectionTheme(index)

    const sectionBaseClass = `
      gsap-section relative mx-auto w-full overflow-hidden
      px-4 py-12 md:px-10 md:py-16 lg:px-14
      ${theme.wrapper}
    `

    switch (layout) {
      case 'teks-details-left-and-image-right':
        return (
          <section className={sectionBaseClass}>
            <motion.div
              animate={{
                x: [0, 40, 0],
                y: [0, -30, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
            />

            <motion.div
              animate={{
                x: [0, -40, 0],
                y: [0, 30, 0]
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
              <RenderText item={item} index={index} />
              <RenderImages item={item} index={index} />
            </div>
          </section>
        )

      case 'teks-details-right-and-image-left':
        return (
          <section className={sectionBaseClass}>
            <motion.div
              animate={{
                x: [0, 45, 0],
                y: [0, 30, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
            />

            <motion.div
              animate={{
                x: [0, -45, 0],
                y: [0, -30, 0]
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
            />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
              <RenderImages item={item} index={index} />
              <RenderText item={item} index={index} />
            </div>
          </section>
        )

      case 'teks-details-and-image-center':
        return (
          <section className={sectionBaseClass}>
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
            />

            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="flex max-w-3xl flex-col items-center gap-4"
              >
                <motion.div variants={fadeUp} className={`h-1 w-20 rounded-full bg-gradient-to-r ${theme.line}`} />

                <motion.h3
                  variants={fadeUp}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`text-2xl font-bold leading-tight md:text-4xl ${theme.title}`}
                >
                  {item?.title}
                </motion.h3>

                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`text-sm leading-7 md:text-base ${theme.text}`}
                >
                  {item?.description}
                </motion.p>
              </motion.div>

              <div className="w-full">
                <RenderImages item={item} index={index} />
              </div>
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="hero-glow-one absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="hero-glow-two absolute right-[-10%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative min-h-[720px] overflow-hidden rounded-br-[60px] bg-[#050816] md:min-h-[660px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(59,130,246,0.28),transparent_30%),radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_28%),linear-gradient(120deg,#050816_0%,#07111f_50%,#020617_100%)]" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:72px_72px]"
          />

          <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute left-0 top-0 hidden h-full w-[45%] bg-gradient-to-r from-primary/20 to-transparent md:block"
          />

          <div className="container relative z-10 flex min-h-[720px] w-full flex-col justify-center gap-10 py-20 md:min-h-[660px] md:flex-row md:items-center md:justify-between md:py-10">
            <motion.div variants={fadeLeft} className="flex w-full flex-col gap-6 md:w-[52%] md:ps-10">
              <motion.div
                variants={fadeUp}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 backdrop-blur-md"
              >
                Rental & Staging LED Display
              </motion.div>

              <motion.div variants={fadeUp}>
                <h2 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl lg:text-[4.7rem]">
                  {data?.name}
                </h2>

                <div className="mt-6 flex items-center justify-start">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: 160 }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                    className="h-[6px] rounded-full bg-primary"
                  />

                  <span className="h-[1px] flex-1 bg-white/20" />
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="description-content max-w-2xl text-sm leading-7 text-white/70 md:text-base [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: data?.detailsHome || '' }}
              />

              <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative w-full overflow-hidden rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all hover:shadow-[0_18px_50px_rgba(59,130,246,0.35)] sm:w-64"
                >
                  <span className="relative z-10">Request a Solution</span>
                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                </motion.button>
              </motion.div>

              <motion.div variants={staggerContainer} className="grid max-w-xl grid-cols-3 gap-3 pt-4">
                {[
                  {
                    label: 'Category',
                    value: 'LED Display'
                  },
                  {
                    label: 'Usage',
                    value: 'Indoor / Event'
                  },
                  {
                    label: 'Support',
                    value: 'Rental'
                  }
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-white/40">{item.label}</p>
                    <p className="mt-1 truncate text-sm font-semibold text-white">{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              className="relative mx-auto flex w-[88%] items-center justify-center md:mx-0 md:w-[40%]"
            >
              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute h-[340px] w-[340px] rounded-full bg-primary/25 blur-[90px] md:h-[460px] md:w-[460px]"
              />

              <div
                ref={heroImageRef}
                className="relative rounded-[36px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-md"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="absolute -right-6 -top-6 rounded-full border border-white/10 bg-white/[0.08] px-5 py-3 text-xs font-semibold text-white/70 backdrop-blur-md"
                >
                  New Upgrade
                </motion.div>

                <img
                  src={getImageUrl(data?.mainImg?.[0]?.link)}
                  alt={data?.name}
                  className="relative z-10 h-auto w-full object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.45)]"
                />
              </div>
            </motion.div>
          </div>
        </motion.header>

        <main className="content-wrapper relative mx-auto w-full">
          {data?.sections?.map((item, index) => {
            return <RenderContentSection key={index} layout={item?.layout} item={item} index={index} />
          })}

          <motion.section
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="gsap-reveal overflow-hidden border border-white/10 bg-white px-4 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.18)] md:px-8 md:py-10"
          >
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Technical Data</p>
                <h3 className="mt-3 text-3xl font-bold text-[#111827] md:text-4xl">Parameters</h3>
              </div>

              <p className="max-w-xl text-sm leading-7 text-gray-500">
                Informasi spesifikasi produk untuk membantu customer memilih LED display sesuai kebutuhan event, rental,
                indoor, maupun staging.
              </p>
            </div>

            <DownloadTable parameters={parameters} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="gsap-reveal mt-14 overflow-hidden border border-white/10 px-4 py-8 md:px-8 md:py-10"
          >
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Explore More</p>
              <h3 className="mt-3 text-3xl font-bold text-[#070b14] md:text-4xl">Related Products</h3>
            </div>

            <RelatedProduct paramsProduct={params} />
          </motion.section>
        </main>
      </div>
    </div>
  )
}

export default DetailProduct
