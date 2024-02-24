import React,{useRef,useEffect} from 'react'
import planeScene from "../assets/3d/plane.glb"
import { useAnimations, useGLTF } from '@react-three/drei'


export default function Plane({isRotating,...props}) {
  const ref=useRef()
    const {scene,animations}=useGLTF(planeScene)
    const {actions}=useAnimations(animations,ref)

    useEffect(()=>{
      if(isRotating){
        actions['Take 001'].play();
      }else{
        actions['Take 001'].stop();
        // console.log("hello")
      }

    },[actions,isRotating])
  return (
    <mesh {...props} ref={ref}>
        <primitive object={scene}/>
    </mesh>
  )
}
