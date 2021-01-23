import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";
import { useAnimations } from "@react-three/drei/useAnimations";

export default function Dolphin(props) {
  const group = useRef();
  const {nodes, materials, animations} = useGLTF("/dolphin.glb");

  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    console.log(nodes)
  }, [nodes])
  useEffect(() => {
    actions["Action.001"].play();
  });
  return (
     <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
     <primitive object={nodes.Scene} /> 
      
      </group>
    </group> 
  );
}

//useGLTF.preload("/dolphin.glb");
