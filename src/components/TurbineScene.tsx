/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState, useEffect} from 'react';
import * as THREE from 'three';
import Turbine from './Turbine'
import {useStore} from './Overlay';
import { useSpring } from '@react-spring/three';


function TurbineScene(props: any) {
  const depth:any = useStore(state => state.depth);
  const [wireMat] = useState(new THREE.MeshStandardMaterial({ color: 'black', metalness:0.5}))
  const [concrete] = useState(new THREE.MeshStandardMaterial({ color: '#575757', roughness: 0.5}))
 const [height, setHeight] = useState(28);
 const [diff, setDiff] = useState(4);
 const [deep, setDeep] = useState(100);
/*  useEffect(() => {
   setDeep(28)
 }, [depth])

 useSpring({
  deep: deep,
  onChange: ({ deep }) => setHeight(deep)
})
 */
  return(
   <>
      <mesh position={[0,5,0]} material={wireMat}>
        <cylinderBufferGeometry attach="geometry" args={[.03, .03, 30]}/>
        </mesh>
     
      <mesh position={[0,-9,0]} rotation={[Math.PI,Math.PI/2,Math.PI/2]} material={concrete}>
        <boxBufferGeometry attach="geometry" args={[.5,.8,.8]} />
       </mesh>
       <Turbine height={ depth <= -750 ? height : 100}/>
        <Turbine height={depth <= -650 ? height - diff : 100}/>
        <Turbine height= {depth <= -550 ? height - (2 * diff) : 100}/>
        <Turbine height= {depth <= -450 ? height - (3 * diff) : 100}/>
       <Turbine height={depth <= -350 ? height - (4 * diff) : 100}/>
       <Turbine height={depth <= -250 ? height - (5 * diff) : 100} />
       <Turbine height={depth <= -150 ? height - (6 * diff) : 100} />
       <Turbine height={depth <= -50 ? height - (7 * diff) : 100} />
  </>
);
} 
export default TurbineScene;