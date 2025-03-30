import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

const loadingContainer: CSSProperties = {
  width: '2rem',
  height: '2rem',
  display: 'flex',
  justifyContent: 'space-around',
}

const loadingCircle: CSSProperties = {
  display: 'block',
  width: '0.5rem',
  height: '0.5rem',
  backgroundColor: 'teal',
  borderRadius: '0.25rem',
}

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '150%',
  },
}

const loadingCircleTransition: {
  duration: number
  repeat: number
  repeatType: 'loop' | 'reverse' | 'mirror'
  ease: [number, number, number, number] | 'easeIn' | 'easeOut' | 'easeInOut' | 'linear'
} = {
  duration: 0.4,
  repeat: Infinity, // Repeat the animation infinitely
  repeatType: 'reverse', // Reverse the animation direction to create a yoyo effect
  ease: 'easeInOut', // Framer Motion's predefined easing
}

interface Props {
  text?: string
}

export const ThreeDotsWave = ({ text }: Props) => {
  return (
    <div className='flex flex-col-reverse justify-center items-center'>
      {text ?? 'Please wait'}
      <motion.div style={loadingContainer} variants={loadingContainerVariants} initial='start' animate='end'>
        <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition} />
        <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition} />
        <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition} />
      </motion.div>
    </div>
  )
}
