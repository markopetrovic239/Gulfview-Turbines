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
    actions["Action.001"].setDuration(props.tailSpeed);
  }); 
  
  useFrame(()=>{
  if(group.current.position.z <= 20){
  group.current.position.z += 0.0049
  group.current.position.x += 0.0049}
  else{
  group.current.position.z = props.posz
  group.current.position.x = props.posx
  group.current.position.y = props.height
  }
   }); 
  return (
     <group ref={group} {...props} dispose={null}>
      <group position={[props.posx,props.posy + props.height,props.posz]} rotation={[0, Math.PI/4, 0]} 
      scale={[0.09, 0.09, 0.09]}
      //scale={[1, 5, 5]}
      >
        
     <primitive object={scene} />
      
      </group>
    </group> 
  );
}
