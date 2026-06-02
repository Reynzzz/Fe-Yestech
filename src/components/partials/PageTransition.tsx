import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
          y: 28,
          scale: 0.985,
          filter: 'blur(10px)'
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)'
        }}
        exit={{
          opacity: 0,
          y: -20,
          scale: 0.985,
          filter: 'blur(10px)'
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="relative z-10 min-h-screen will-change-transform"
      >
        {children}
      </motion.div>

      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{
          duration: 0.65,
          ease: [0.76, 0, 0.24, 1]
        }}
        style={{
          transformOrigin: 'left'
        }}
        className="pointer-events-none fixed inset-0 z-[9999] bg-[#050816]"
      />
    </div>
  )
}

export default PageTransition
