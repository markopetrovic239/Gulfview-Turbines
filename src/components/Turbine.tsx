/* eslint-disable react-hooks/rules-of-hooks */
import React,{useRef, useEffect} from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame } from 'react-three-fiber';
import {useStore} from './Overlay'
import { useGLTF } from '@react-three/drei/useGLTF';

 function Turbine (props: any){
  const speed:any = useStore(state => state.speed);
  const group: any = useRef();
  const  {nodes}: any  =useGLTF('/Spinner.glb');

  useEffect(() => {
    group.current.position.x =0
    group.current.position.y = props.height
    group.current.position.z = -0.2
    group.current.rotation.x -= Math.PI/2
    group.current.rotation.z += Math.PI/2
    group.current.rotation.y -= Math.PI/2
    nodes.Asset3DLoadersceneRoot.material.refractionRatio = 0.5
  }, [props.height])


 useFrame(()=>{
 group.current.rotation.y -= 0.0034906585 + ((speed - 1.5)/10000) + ((props.height - 4)/100000);
 }
)

return(
       <mesh  geometry={nodes.Asset3DLoadersceneRoot.geometry} material={nodes.Asset3DLoadersceneRoot.material} ref={group}/>
      )
}


export default Turbine;