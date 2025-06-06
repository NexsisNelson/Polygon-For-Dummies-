"use client"

import { motion } from "framer-motion"

export const PolygonLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.svg width="100" height="100" viewBox="0 0 100 100" initial="hidden" animate="visible">
        <motion.polygon
          points="50,5 95,25 95,75 50,95 5,75 5,25"
          stroke="#8247E5"
          strokeWidth="4"
          fill="none"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: { type: "spring", duration: 1.5, bounce: 0 },
                opacity: { duration: 0.01 },
              },
            },
          }}
        />
        <motion.polygon
          points="50,5 95,25 95,75 50,95 5,75 5,25"
          fill="#8247E5"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 0.2,
              transition: {
                delay: 0.5,
                duration: 0.5,
              },
            },
          }}
        />
      </motion.svg>
    </div>
  )
}
