/* eslint-disable react-hooks/rules-of-hooks */
import React,{useRef, useEffect} from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame } from 'react-three-fiber';
import {useStore} from './Overlay'

 function Turbine (props: any){
  const speed:any = useStore(state => state.speed);
  const group: any = useRef();
  const  {nodes}: any  =useLoader(GLTFLoader, '/Spinner.glb')

  useEffect(() => {
    group.current.scale.x =0.00004
    group.current.scale.y =0.00004
    group.current.scale.z =0.00004
    group.current.position.x =0
    group.current.position.y = props.height
    group.current.position.z =-0.2
    group.current.rotation.x -= Math.PI/2
    group.current.rotation.z += Math.PI/2
    group.current.rotation.y -= Math.PI/2
    nodes.Asset3DLoadersceneRoot.material.refractionRatio = 0.5
  }, [group, nodes, props.height])


 useFrame(()=>{
  group.current.rotation.y -= speed/(250 - props.height*10)
 }
)

return(
       <mesh geometry={nodes.Asset3DLoadersceneRoot.geometry} material={nodes.Asset3DLoadersceneRoot.material} ref={group}/>
      )
}


export default Turbine;