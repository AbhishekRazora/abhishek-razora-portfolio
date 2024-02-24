import React, { Suspense, useState,useEffect,useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from './Loader'
import Island from '../models/Island'
import  Sky  from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from './HomeInfo'
import sakura from '../assets/sakura.mp3'
import { soundoff, soundon } from '../assets/icons'

export default function Home() {

    const audioRef=useRef(new Audio(sakura))
    audioRef.current.volume=0.4;
    audioRef.current.loop=true;
const [isRotating,setIsRotating]=React.useState(false)
const [currentStage,setCurrentStage]=useState(1)
const[isPlaying,setIsPlaying]=useState(false)

useEffect(()=>{
    if(isPlaying){
        audioRef.current.play();
    }

    return()=>{
        audioRef.current.pause();
    }
})

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43];
        let rotation = [0.1, 4.7, 0]

        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9]
        } else {
            screenScale = [1, 1, 1]
        }
        return [screenPosition, screenScale, rotation]
    }
    const adjustPlaneForScreenSize = () => {
        let screenScale ;
        let screenPosition ;
        // let rotation

        if (window.innerWidth < 768) {
            screenScale = [1.5, 1.5, 1.5]
            screenPosition=[0,-1.5,0]
        } else {
            screenScale = [3, 3, 3]
            screenPosition=[0,-4,-4]
        }
        return [screenPosition, screenScale]
    }
    const [islandPosition,islandScale,islandRotation]=adjustIslandForScreenSize()
    const [planePosition,planeScale]=adjustPlaneForScreenSize()
    // console.log(islandScale,islandPosition,islandRotation)
    return (
        <section className='w-full h-screen relative'>

            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>{currentStage && <HomeInfo currentStage={currentStage}/>}</div>
            <Canvas className={`w-full h-screen bg-transparent ${isRotating?'cursor-grabbing':"cursor-grab"}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight intensity={2} position={[1,1,1]}/>
                    <ambientLight intensity={0.5}/>
                    {/* <pointLight position={[10,5,10]} intensity={2}/> */}
                    {/* <spotLight position={[0,50,10]} angle={0.15} penumbra={1} intensity={2}/> */}
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

                    <Bird/>
                    <Sky isRotating={isRotating}/>

                    <Island
                    position={islandPosition} 
                    scale={islandScale} 
                    rotation={islandRotation}
                    isRotating={isRotating}
                    setIsRotating={setIsRotating}
                    currentStage={currentStage}
                    setCurrentStage={setCurrentStage}
                    />
                    <Plane
                    position={planePosition}
                    scale={planeScale}
                    isRotating={isRotating}
                    setIsRotating={setIsRotating}
                    rotation={[0,20,0]}

                    />
                </Suspense>
            </Canvas>
<div className='absolute bottom-2 left-2'>
    <img src={!isPlaying?soundoff: soundon} alt="sound" className='w-10 h-10 cursor-pointer object-contain' onClick={()=>setIsPlaying(!isPlaying)}/>
</div>
        </section>
    )
}
