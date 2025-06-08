import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'

const AShape = () => {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.01
  })

  // Coordinates for spheres forming an "A"
  const points = [
    [-1.2, -1.5], [-0.9, -0.5], [-0.6, 0.5], [-0.3, 1.3],
    [0, 1.7], [0.3, 1.3], [0.6, 0.5], [0.9, -0.5], [1.2, -1.5],
    [-0.6, 0], [-0.3, 0], [0, 0], [0.3, 0], [0.6, 0],
  ]

  return (
    <group ref={groupRef}>
      {points.map(([x, y], i) => (
        <mesh key={i} position={[x * 1.5, y * 1.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

const Hero = () => {
  const [text] = useTypewriter({
    words: ["Hey!", "I'm Arjun Arora.", "Scroll down to see my work."],
    loop: false,
    delaySpeed: 1500,
  })

  return (
    <section className="relative w-full h-screen bg-black text-white flex flex-col justify-center overflow-hidden px-10">
      {/* Background blur gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500 blur-2xl opacity-20" />
      </div>

      {/* Hero layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center max-w-7xl mx-auto w-full h-full">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-left space-y-6"
        >
          <h1 className="text-5xl sm:text-7xl font-light tracking-tight leading-tight">
            {text}<Cursor />
          </h1>
          <p className="text-2xl text-gray-300">Welcome to my portfolio.</p>
        </motion.div>

        {/* 3D "A" Sculpture */}
        <div className="hidden lg:block w-full h-[500px]">
          <Canvas camera={{ position: [0, 0, 7] }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[0, 5, 5]} intensity={1.5} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            <Suspense fallback={null}>
              <AShape />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-[30px] h-[50px] border-2 border-white rounded-full flex items-center justify-center p-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
        </div>
      </div>

      {/* Top Nav */}
      <div className="absolute top-5 left-5 z-10">
        <div className="w-6 h-6 rounded-full bg-white" />
      </div>
      <div className="absolute top-5 right-5 z-10 text-right text-sm text-gray-300">
        <div>arjun@portfolio.dev</div>
        <div className="text-white text-lg mt-1">Menu</div>
      </div>
    </section>
  )
}

export default Hero