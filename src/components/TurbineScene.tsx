/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react';
import * as THREE from 'three';
import Turbine from './Turbine'


function TurbineScene(props: any) {
  
  const [wireMat] = useState(new THREE.MeshStandardMaterial({ color: 'black', metalness:0.5}))
  const [concrete] = useState(new THREE.MeshStandardMaterial({ color: '#575757', roughness: 0.5}))

  return(
   <>

      <mesh position={[0,5,0]} material={wireMat}>
        <cylinderBufferGeometry attach="geometry" args={[.03, .03, 30]}/>
        </mesh>
     
      <mesh position={[0,-9,0]} rotation={[Math.PI,Math.PI/2,Math.PI/2]} material={concrete}>
        <boxBufferGeometry attach="geometry" args={[.5,.8,.8]} />
       </mesh>
      <Turbine height={12} />
      <Turbine height={8} />
      <Turbine height={4} />
      <Turbine height={0} />
  </>
);
} 
export default TurbineScene;