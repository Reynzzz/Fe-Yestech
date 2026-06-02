import React from 'react'
import { FaVrCardboard, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa'

const VirtualTourLanding: React.FC = () => {
  const goToTour = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const tours = [
    {
      city: 'SHENZHEN',
      subtitle: 'YES TECH Experience Center',
      description:
        'Explore our immersive virtual showroom and discover LED display solutions in a realistic 360° environment.',
      url: 'http://www.720yun.com/vr/ba6jz0wvrn0'
    },
    {
      city: 'CHANGSHA',
      subtitle: 'YES TECH Manufacturing Base',
      description:
        'Take a closer look at our production environment, technology process, and professional LED display ecosystem.',
      url: 'http://www.720yun.com/vr/785jOOtysv9'
    }
  ]

  return (
    <section className="relative mt-20 overflow-hidden bg-[#080B16] px-5 py-20 md:px-10 md:py-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[320px] w-[320px] rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[360px] w-[360px] rounded-full bg-cyan-400/20 blur-[110px]" />
        <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      {/* Grid effect */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 backdrop-blur-md">
          <FaVrCardboard className="text-cyan-300" />
          Virtual Experience
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">YES TECH Virtual Tour</h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Discover YES TECH facilities through an immersive 360° virtual tour. Choose a location and explore our
            showroom, technology, and production environment.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {tours.map((tour, index) => (
            <button
              key={tour.city}
              onClick={() => goToTour(tour.url)}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-1 text-left shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-white/[0.08]"
            >
              {/* Card glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-[70px]" />
                <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blue-500/20 blur-[70px]" />
              </div>

              <div className="relative z-10 flex min-h-[260px] flex-col justify-between rounded-[24px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 md:p-8">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-white">
                      <FaMapMarkerAlt className="text-xl text-cyan-300" />
                    </div>

                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-white/50">
                      360° Tour
                    </span>
                  </div>

                  <h3 className="text-3xl font-black tracking-wide text-white md:text-4xl">{tour.city}</h3>

                  <p className="mt-2 text-sm font-semibold text-cyan-300">{tour.subtitle}</p>

                  <p className="mt-5 text-sm leading-7 text-white/60">{tour.description}</p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">Start Tour</span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-all duration-500 group-hover:translate-x-1 group-hover:bg-cyan-300">
                    <FaArrowRight />
                  </div>
                </div>
              </div>

              {/* Number */}
              <div className="pointer-events-none absolute bottom-5 right-6 text-7xl font-black text-white/[0.03] md:text-8xl">
                0{index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VirtualTourLanding
