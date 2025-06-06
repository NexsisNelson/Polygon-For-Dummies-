"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

function PolygonModel({ hover, ...props }) {
  const group = useRef()

  // Create a simple polygon shape since we don't have an actual model
  const geometry = new THREE.IcosahedronGeometry(1, 0)
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#8b5cf6"),
    emissive: new THREE.Color("#4c1d95"),
    emissiveIntensity: hover ? 0.5 : 0.2,
    metalness: 0.8,
    roughness: 0.2,
  })

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005
      if (hover) {
        group.current.rotation.y += 0.01
      }
    }
  })

  return (
    <group ref={group} {...props}>
      <mesh geometry={geometry} material={material} scale={hover ? 1.1 : 1}>
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#4c1d95"
          emissiveIntensity={hover ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

export default function ThreeDPolygonLogo() {
  const [hover, setHover] = useState(false)

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Float speed={4} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[0, 0.5]}>
        <PolygonModel hover={hover} position={[0, 0, 0]} />
      </Float>

      <Environment preset="night" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={hover ? 5 : 1} />
    </Canvas>
  )
}
