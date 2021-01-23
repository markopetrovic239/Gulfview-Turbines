import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";
import { useAnimations } from "@react-three/drei/useAnimations";
import { useFrame } from "react-three-fiber";
import {useStore} from './Overlay';

export default function Dolphin(props: any) {
  const depth:any = useStore(state => state.depth);
  const group: any = useRef();
  const {nodes, animations} = useGLTF("/dolphin.glb");

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
   //console.log(nodes)
   group.current.position.z -= 0.005
    actions["Action.001"].play();
    actions["Action.001"].setDuration(4);
  },[group]); 

  useFrame(()=>{
    group.current.position.z -= 0.005
  });

  return (

    <mesh scale={[4, 4, 4]} 
    geometry={nodes.Circle002.geometry}
    //material={nodes.Asset3DLoadersceneRoot.material} 
    ref={group}
    />
   /*   <group ref={group} {...props} dispose={null}>
      <group rotation={[0, 0, 0]} 
      scale={[0.5, 0.5, 0.5]}
      //scale={[1, 5, 5]}
      >
        
     <primitive object={scene} />
      
      </group>
    </group>  */
  );
}

//useGLTF.preload("/dolphin.glb");
