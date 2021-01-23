import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";
import { useAnimations } from "@react-three/drei/useAnimations";
import { useFrame } from "react-three-fiber";

export default function Dolphin(props) {
  const group: any = useRef();
  const {scene, animations} = useGLTF(props.pathName);

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Action.001"].play();
    actions["Action.001"].setDuration(4);
  }); 
  
 useFrame(()=>{
  group.current.position.x += 0.0005
  if(group.current.position.z <= 100)
  group.current.position.z += 0.0075
  else
  group.current.position.z = -50

   });
  return (
     <group ref={group} {...props} dispose={null}>
      <group position={[props.posx,props.posy,props.posz]} rotation={[0, 0, 0]} 
      scale={[0.5, 0.5, 0.5]}
      //scale={[1, 5, 5]}
      >
        
     <primitive object={scene} />
      
      </group>
    </group> 
  );
}

//useGLTF.preload("/dolphin.glb");
