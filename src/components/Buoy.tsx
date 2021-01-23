/* eslint-disable react-hooks/rules-of-hooks */
import React,{useRef, useEffect} from 'react';

 function Buoy (props: any){
  const group: any = useRef();

  useEffect(() => {
    group.current.position.y = props.height
  }, [props.height])

return(
       <mesh ref={group}>
         <cylinderBufferGeometry attach="geometry" args={[.25, .5, 2, 50]}/>
       </mesh>
      )
}

export default Buoy;