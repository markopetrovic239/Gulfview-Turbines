/* eslint-disable react-hooks/rules-of-hooks */
import React,{useRef, useEffect, useState} from 'react';
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from 'react-three-fiber';
import {useStore} from './Overlay'

 function Ship (props: any){
  const depth:any = useStore(state => state.depth);
  const group: any = useRef();
  const  {nodes}: any  =useLoader(GLTFLoader, '/Ship.gltf')
  const [wood] = useState(new THREE.MeshStandardMaterial({ color: '#1b1209', roughness: 1}))
  useEffect(() => {
    group.current.rotation.y += Math.PI/3

  }, [group, props.height])




return(
       <mesh scale={[0.0035,0.0035,0.0035]} position={[depth+520,-10,-50]}  geometry={nodes.untitledMesh.geometry} material={wood} ref={group}/>
      )
}


export default Ship;