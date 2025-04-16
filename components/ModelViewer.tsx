"use client"

import { OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useEffect } from "react"

export default function ModelViewer() {
  useEffect(() => {
    // preload on the client side
    useGLTF.preload("/moon20.glb")
  }, [])

  const { scene } = useGLTF("/moon20.glb")

  return (
    <div className="h-screen w-full fixed top-0 bottom-0 left-0 right-0 z-[-1]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="bg-white"
        gl={{
          powerPreference: "default",
          antialias: true
        }}
      >
        <ambientLight intensity={1.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
        />
        <ambientLight intensity={2.0} /> {/* Increased from 1.2 */}
        <spotLight position={[10, 10, 10]} intensity={2.5} />{" "}
        <pointLight position={[-10, -10, -10]} intensity={1.5} />{" "}
        <pointLight position={[0, 0, 5]} intensity={1.2} />{" "}
        <primitive object={scene} scale={1.5} position={[0, 0, 0]} />
        <OrbitControls
          enableRotate={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.7}
          minDistance={2}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          zoomSpeed={1.0}
        />
      </Canvas>
    </div>
  )
}
