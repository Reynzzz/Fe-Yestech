import RelatedProduct from './related-product'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IItemProduct, IProduct } from '../../types/IProduct'
import PRODUCT from '../../services/product'
import Skeleton from '../../components/atoms/Skeleton'
import { BASE_API } from '../../config/env'
import DownloadTable from './DownloadTable'
import { IParameters } from '../../types/IWarehouse'

type RenderContentProps = {
  layout: string
  item: IItemProduct
  index: number
}

const LIMIT_PAGE = 3

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

  const [params, setParams] = useState({
    category: '',
    search: '',
    page: 1,
    limit: LIMIT_PAGE,
    type: 'all'
  })

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
      <div className={`relative w-full overflow-hidden rounded-[28px] border p-3 md:p-5 ${theme.imageCard}`}>
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl ${theme.glow}`}
        />

        <div className="relative grid gap-4">
          {item?.images?.map((image, imgIndex) => (
            <img
              key={imgIndex}
              src={image?.url}
              alt={item?.title || 'product detail'}
              className="h-auto w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      </div>
    )
  }

  const RenderText = ({ item, index }: { item: IItemProduct; index: number }) => {
    const theme = getSectionTheme(index)

    return (
      <div className="relative z-10 flex w-full flex-col gap-4">
        <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${theme.line}`} />

        <h3 className={`text-2xl font-bold leading-tight md:text-4xl ${theme.title}`}>{item?.title}</h3>

        <p className={`text-sm leading-7 md:text-base ${theme.text}`}>{item?.description}</p>
      </div>
    )
  }

  const RenderContentSection: React.FC<RenderContentProps> = ({ layout, item, index }) => {
    const theme = getSectionTheme(index)

    const sectionBaseClass = `
      relative mx-auto  w-full overflow-hidden
       md:px-10 md:py-16 lg:px-14
      ${theme.wrapper}
    `

    switch (layout) {
      case 'teks-details-left-and-image-right':
        return (
          <section className={sectionBaseClass}>
            <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <RenderText item={item} index={index} />
              <RenderImages item={item} index={index} />
            </div>
          </section>
        )

      case 'teks-details-right-and-image-left':
        return (
          <section className={sectionBaseClass}>
            <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <RenderImages item={item} index={index} />
              <RenderText item={item} index={index} />
            </div>
          </section>
        )

      case 'teks-details-and-image-center':
        return (
          <section className={sectionBaseClass}>
            <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
              <div className="flex max-w-3xl flex-col items-center gap-4">
                <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${theme.line}`} />

                <h3 className={`text-2xl font-bold leading-tight md:text-4xl ${theme.title}`}>{item?.title}</h3>

                <p className={`text-sm leading-7 md:text-base ${theme.text}`}>{item?.description}</p>
              </div>

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
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-[-10%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <header className="relative min-h-[720px] overflow-hidden rounded-br-[60px] bg-[#050816] md:min-h-[660px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(59,130,246,0.28),transparent_30%),radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_28%),linear-gradient(120deg,#050816_0%,#07111f_50%,#020617_100%)]" />

          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:72px_72px]" />

          <div className="absolute left-0 top-0 hidden h-full w-[45%] bg-gradient-to-r from-primary/20 to-transparent md:block" />

          <div className="container relative z-10 flex min-h-[720px] w-full flex-col justify-center gap-10 py-20 md:min-h-[660px] md:flex-row md:items-center md:justify-between md:py-10">
            {/* Text */}
            <div className="flex w-full flex-col gap-6 md:w-[52%] md:ps-10">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 backdrop-blur-md">
                Rental & Staging LED Display
              </div>

              <div>
                <h2 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl lg:text-[4.7rem]">
                  {data?.name}
                </h2>

                <div className="mt-6 flex items-center justify-start">
                  <span className="h-[6px] w-40 rounded-full bg-primary" />
                  <span className="h-[1px] flex-1 bg-white/20" />
                </div>
              </div>

              <div
                className="description-content text-white max-w-2xl text-sm leading-7 text-white/72 md:text-base [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: data?.detailsHome || '' }}
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="group relative w-full overflow-hidden rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-[0_18px_50px_rgba(59,130,246,0.35)] sm:w-64">
                  <span className="relative z-10">Request a Solution</span>
                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </div>

              <div className="grid max-w-xl grid-cols-3 gap-3 pt-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Category</p>
                  <p className="mt-1 truncate text-sm font-semibold text-white">LED Display</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Usage</p>
                  <p className="mt-1 truncate text-sm font-semibold text-white">Indoor / Event</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Support</p>
                  <p className="mt-1 truncate text-sm font-semibold text-white">Rental</p>
                </div>
              </div>
            </div>

            {/* Product image */}
            <div className="relative mx-auto flex w-[88%] items-center justify-center md:mx-0 md:w-[40%]">
              <div className="absolute h-[340px] w-[340px] rounded-full bg-primary/25 blur-[90px] md:h-[460px] md:w-[460px]" />

              <div className="relative rounded-[36px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-md">
                <div className="absolute -right-6 -top-6 rounded-full border border-white/10 bg-white/[0.08] px-5 py-3 text-xs font-semibold text-white/70 backdrop-blur-md">
                  New Upgrade
                </div>

                <img
                  src={getImageUrl(data?.mainImg?.[0]?.link)}
                  alt={data?.name}
                  className="relative z-10 h-auto w-full object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="relative mx-auto w-full">
          {data?.sections?.map((item, index) => {
            return <RenderContentSection key={index} layout={item?.layout} item={item} index={index} />
          })}

          {/* Parameters area */}
          <section className="pt-10 overflow-hidden  border border-white/10 bg-white px-4 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.18)] md:px-8 md:py-10">
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
          </section>

          {/* Related product */}
          <section className="mt-14 overflow-hidden  border border-white/10  px-4 py-8 md:px-8 md:py-10">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Explore More</p>
              <h3 className="mt-3 text-3xl font-bold text-[#070b14]] md:text-4xl">Related Products</h3>
            </div>

            <RelatedProduct paramsProduct={params} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default DetailProduct
