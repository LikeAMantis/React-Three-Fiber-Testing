import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const lerp = (x, y, a) => x * (1 - a) + y * a
const invlerp = (x, y, a) => clamp((a - x) / (y - x))
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a))
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a))
const speed = 0.01

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(true)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    var x = ref.current.scale.x
    // if (clicked) x += speed * delta
    // else x -= speed * delta
    // ref.current.scale.x = clamp(x, 1, 2)
    ref.current.scale.x += lerp(1, 2, clamp(speed * delta))
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}
