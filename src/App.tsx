import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useLoader, useThree, useFrame } from "react-three-fiber";
import "./home.css";
import * as THREE from "three";
import TurbineScene from "./components/TurbineScene";
import { Plane, OrbitControls} from "drei";
import Overlay from "./components/Overlay"
import Ship from "./components/Ship"
import CircularProgress from '@material-ui/core/CircularProgress';
import { Html } from "@react-three/drei";
import Globe from './components/Globe'
import {useGlobe} from './components/Globe'
import { AppBar, Toolbar, Typography, makeStyles, MenuItem, Color, Tab, Tabs, Box, Select, Theme, createStyles, FormControl } from "@material-ui/core";
import PropTypes from 'prop-types';
import { InputLabel } from "@material-ui/core";
import {useStore} from './components/Overlay';
import Dolphin from './components/Dolphin';
//import Cave from './components/Cave';

const Terrain: any = () => {
  const elevation = useLoader(THREE.TextureLoader, "/demslope.png");
  const normal = useLoader(THREE.TextureLoader, "/demslope_specular.png");
  const color = useLoader(THREE.TextureLoader, "/sand2.png");
  const depth:any = useStore(state => state.depth);
  return (
    <Plane
      rotation={[-Math.PI / 2, 0.015, 12.5*Math.PI/6 ]}
      position={[depth+500, -10, 0]}
      args={[1024, 1024, 512, 512]}
    >
      <meshStandardMaterial
        attach="material"
       color="#8090c2"
       transparent
       opacity={0.95}
       displacementMap={elevation}
      normalMap={normal}
        map={color}
      />
    </Plane>
  );
};

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#00001a",
    height: '50px',
  },
  logo: {
    fontFamily: "Candara, sans-serif",
    fontWeight: 60,
    color: "#FFFEFE",
    backgroundColor: "#00001a",
    width: "15vw",
    height: "calc(100vh * .05)",
    marginLeft: "2vw",
  },
}));


const selectStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    icon: {
      fill: "white",
  },
  }),
);
          
 function App() {
  const { header, logo } = useStyles();
  const show:any = useGlobe(state => state.show);
  const [wireMat] = useState(new THREE.MeshStandardMaterial({ color: 'black', metalness:0.5}))
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState()
  const classes : any = selectStyles();
  const [age, setAge] = React.useState('');
  const depth:any = useStore(state => state.depth);
  const [dolphinPos, setDolphPos] = useState(-50);
 // const color = useLoader(THREE.TextureLoader, "/sand-texture.png");
  
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };


  return (
    <html>

    <Toolbar className={header}>
   
      <FormControl className={classes.formControl}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label" style={{color: "white"}}>
          Site Locations
        </InputLabel>
       <Select
          value={age}
          color="secondary"
          onChange={handleChange}
          style={{color: "white", width: "11vw"}}
          displayEmpty
          autoWidth
          variant="standard"
          className={classes.selectEmpty}
          inputProps={{
            classes: {
                icon: classes.icon,
            },
        }}
          
        >
          <MenuItem value="">
          Gulf Stream
          </MenuItem>
         {/*  <MenuItem value={10}>Agulhas Current</MenuItem>
          <MenuItem value={20}>South Pacific Gyre</MenuItem> */}

        </Select>
        
      </FormControl>
          <Tab label={show ? "Earth View" : "Turbine View"} style={{color: 'white', marginLeft: '2vw'}} onClick={()=>{useGlobe.setState({show: !show})}}/>
          <a  href="https://gulfstream.energy/"><img src="./whitelogo.png" alt="nothing" style={{width: '15vw', height: '8vh', paddingLeft: '55vw'}}/></a>
    </Toolbar> 

    {show ? 
    <Canvas camera={{ position: [0, 0, 100]}} >
     <fog attach="fog" args={["rgb(1,17,64)", 0, 50]}/> 
      <OrbitControls 
      position={[10, 10, 10]}
     maxDistance={34 + depth/-100} minDistance={34+ depth/-100}   //(depth/-25)+20
      enablePan={false}   
       minPolarAngle={11*Math.PI/24} maxPolarAngle={11*Math.PI/24}  minAzimuthAngle={2*Math.PI/5}  maxAzimuthAngle={3*Math.PI/5} 
       />
      <Suspense fallback={<Html><CircularProgress /></Html>}>
      <Ship />

      
        <Terrain />
        <hemisphereLight
          intensity={2.5}
          color={"rgb(92, 173, 228)"}
          position={[7, 5, 1]}
        />

        {/* condition to show only three stations at a time */}
        <Suspense fallback={<Html><CircularProgress /></Html>}>
        {depth <= -50 && depth > -145 ?
        <>
        <mesh position={[depth+100, 5.9, 0]}>
{/* <mesh position={[-75,-50,0]} rotation={[Math.PI/2,Math.PI/6, 0]}>
        <cylinderBufferGeometry attach="geometry" args={[50, 50, 500, 20]}/>
        <meshStandardMaterial attach="material" color="#c2b280" />
        </mesh>
        <mesh 
        position={[-48.8, -8, 0]} 
        rotation={[-Math.PI / 2, 0.8, -Math.PI / 2]}
        material={wireMat}>
        <cylinderBufferGeometry attach="geometry" args={[.08, .08, 8]}/>
        </mesh>
        <mesh 
        position={[-57, -3, 0]} 
        rotation={[-Math.PI / 2, 0.4, -Math.PI / 2]}
        material={wireMat}>
        <cylinderBufferGeometry attach="geometry" args={[.08, .08, 12]}/> 
        </mesh>
   <Suspense fallback={null}>
      <Dolphin posx={0} posy={15} posz={-50} pathName={"/dolphin.glb"}/>
   <Dolphin posx={0} posy={10} posz={-50} pathName={"/dolphin2.glb"}/>
   <Dolphin posx={0} posy={20} posz={-50} pathName={"/dolphin3.glb"}/>

   </Suspense> */}
        <TurbineScene cableHeight={30}/>
          
        </mesh>
        <mesh position={[depth+104, 5.9, 0]}>
          <TurbineScene cableHeight={30} />
        </mesh>
        <mesh position={[depth+108, 5.9, 0]}>
          <TurbineScene cableHeight={30} />
          <Suspense fallback={null}>
          <Dolphin posx={3} posy={-3} posz={-10} tailSpeed={2} height = {1.7} pathName={"/dolphin6.glb"}/>
          </Suspense>    
        </mesh>
        <mesh position={[depth+112, 5.9, 0]}>
          <TurbineScene cableHeight={30} />     
          <Suspense fallback={null}>
          <Dolphin posx={-3} posy={-2} posz={0} tailSpeed={2.5} height = {1.7} pathName={"/dolphin5.glb"}/>
          </Suspense>    
        </mesh>
        <mesh position={[depth+116, 5.8, 0]}>
          <TurbineScene cableHeight={30} />
          <Suspense fallback={null}>
           <Dolphin posx={-3} posy={-3} posz={-10} tailSpeed={1.2} height = {1.7} pathName={"/dolphin.glb"}/>
         </Suspense>
        </mesh>
        <mesh position={[depth+120, 5.8, 0]}>
          <TurbineScene cableHeight={30} />
          <Suspense fallback={null}>
           <Dolphin posx={-3} posy={-2} posz={-10} tailSpeed={2.2} height = {1.7} pathName={"/dolphin2.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+124, 5.7, 0]}>
          <TurbineScene cableHeight={30} />
          <Suspense fallback={null}>
          <Dolphin posx={-3} posy={-1} posz={-10} tailSpeed={3} height = {1.7} pathName={"/dolphin3.glb"}/>
          </Suspense>
        </mesh>
         <mesh position={[depth+128, 5.6, 0]}>
          <TurbineScene cableHeight={30} />
          
        </mesh>
        <mesh position={[depth+96, 6, 0]}>
          <TurbineScene cableHeight={30} />
        </mesh>
        <mesh position={[depth+92, 6.1, 0]}>
          <TurbineScene cableHeight={30} />
          {/* <Cave /> */}
        </mesh></> : null}

        {depth <= -150 && depth > -245 ?
        <>
        <mesh position={[depth+200, -4.5*depth/200, 0]}>
          <TurbineScene cableHeight={43} />
        </mesh>
        <mesh position={[depth+204, -4.5*depth/200, 0]}>
         <TurbineScene cableHeight={43} />
        </mesh>
        <mesh position={[depth+208, -4.5*depth/200, 0]}>
         <TurbineScene cableHeight={43} /> <Suspense fallback={null}>
          <Dolphin posx={3} posy={-3} posz={-10} tailSpeed={2}  height = {17.7} pathName={"/dolphin6.glb"}/>
          </Suspense>    
        </mesh>
        <mesh position={[depth+212, -4.5*depth/200, 0]}>
         <TurbineScene cableHeight={43} /><Suspense fallback={null}>
          <Dolphin posx={-3} posy={-2} posz={0} tailSpeed={2.5}  height = {17.7} pathName={"/dolphin5.glb"}/>
          </Suspense>  
        </mesh>
        <mesh position={[depth+216, -4.5*depth/200, 0]}>
         <TurbineScene cableHeight={43} /> <Suspense fallback={null}>
           <Dolphin posx={-3} posy={-3} posz={-10} tailSpeed={1.2}  height = {17.7} pathName={"/dolphin.glb"}/>
         </Suspense>
        </mesh>
        <mesh position={[depth+220, -4.5*depth/200, 0]}>
         <TurbineScene cableHeight={43} /><Suspense fallback={null}>
           <Dolphin posx={-3} posy={-2} posz={-10} tailSpeed={2.2}  height = {17.7} pathName={"/dolphin2.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+224, -4.5*depth/200, 0]}>
         <TurbineScene cableHeight={43} /> <Suspense fallback={null}>
          <Dolphin posx={-3} posy={-1} posz={-10} tailSpeed={3}  height = {17.7} pathName={"/dolphin3.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+228, -4.5*depth/200, 0]}>
         <TurbineScene cableHeight={43} />
        </mesh>
        <mesh position={[depth+196, -4.5*depth/200, 0]}>
         <TurbineScene cableHeight={43} />
        </mesh>
        <mesh position={[depth+192, -4.6*depth/200, 0]}>
         <TurbineScene cableHeight={43} />
        </mesh></> : null}

        {depth <= -250 && depth > -345 ?
        <>
        <mesh position={[depth+300, -3*depth/300, 0]}>
         <TurbineScene cableHeight={51} />
        </mesh>
        <mesh position={[depth+304, -3*depth/300, 0]}>
         <TurbineScene cableHeight={51} />
        </mesh>
        <mesh position={[depth+308, -3*depth/300, 0]}>
         <TurbineScene cableHeight={51} /> <Suspense fallback={null}>
          <Dolphin posx={3} posy={-3} posz={-10} tailSpeed={2} height = {9.7} pathName={"/dolphin6.glb"}/>
          </Suspense>    
        </mesh>
        <mesh position={[depth+312, -3*depth/300, 0]}>
         <TurbineScene cableHeight={51} /><Suspense fallback={null}>
          <Dolphin posx={-3} posy={-2} posz={0} tailSpeed={2.5} height = {9.7} pathName={"/dolphin5.glb"}/>
          </Suspense>  
        </mesh>
        <mesh position={[depth+316, -3*depth/300, 0]}>
         <TurbineScene cableHeight={51} /> <Suspense fallback={null}>
           <Dolphin posx={-3} posy={-3} posz={-10} tailSpeed={1.2} height = {9.7} pathName={"/dolphin.glb"}/>
         </Suspense>
        </mesh>
        <mesh position={[depth+320, -3*depth/300, 0]}>
         <TurbineScene cableHeight={51} /><Suspense fallback={null}>
           <Dolphin posx={-3} posy={-2} posz={-10} tailSpeed={2.2} height = {9.7} pathName={"/dolphin2.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+324, -3*depth/300, 0]}>
         <TurbineScene cableHeight={51} /> <Suspense fallback={null}>
          <Dolphin posx={-3} posy={-1} posz={-10} tailSpeed={3} height = {9.7} pathName={"/dolphin3.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+328, -3*depth/300, 0]}>
         <TurbineScene cableHeight={51} />
        </mesh>
        <mesh position={[depth+296, -3*depth/300, 0]}>
         <TurbineScene cableHeight={51} />
        </mesh>
        <mesh position={[depth+292, -3*depth/300, 0]}>
         <TurbineScene cableHeight={51} />
        </mesh></> : null}

        {depth <= -350 && depth > -445 ?
        <>
        <mesh position={[depth+400, -1.5*depth/400, 0]}>
         <TurbineScene cableHeight={59} />
        </mesh>
        <mesh position={[depth+404, -1.5*depth/400, 0]}>
         <TurbineScene cableHeight={59} />
        </mesh>
        <mesh position={[depth+408, -1.5*depth/400, 0]}>
         <TurbineScene cableHeight={59} /> <Suspense fallback={null}>
          <Dolphin posx={3} posy={-3} posz={-10} tailSpeed={2} height = {13.7} pathName={"/dolphin6.glb"}/>
          </Suspense>    
        </mesh>
        <mesh position={[depth+412, -1.5*depth/400, 0]}>
         <TurbineScene cableHeight={59} /><Suspense fallback={null}>
          <Dolphin posx={-3} posy={-2} posz={0} tailSpeed={2.5} height = {13.7} pathName={"/dolphin5.glb"}/>
          </Suspense>  
        </mesh>
        <mesh position={[depth+416, -1.5*depth/400, 0]}>
         <TurbineScene cableHeight={59} /> <Suspense fallback={null}>
           <Dolphin posx={-3} posy={-3} posz={-10} tailSpeed={1.2} height = {13.7} pathName={"/dolphin.glb"}/>
         </Suspense>
        </mesh>
        <mesh position={[depth+420, -1.5*depth/400, 0]}>
         <TurbineScene cableHeight={59} /><Suspense fallback={null}>
           <Dolphin posx={-3} posy={-2} posz={-10} tailSpeed={2.2} height = {13.7} pathName={"/dolphin2.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+424, -1.5*depth/400, 0]}>
         <TurbineScene cableHeight={59} /> <Suspense fallback={null}>
          <Dolphin posx={-3} posy={-1} posz={-10} tailSpeed={3} height = {13.7} pathName={"/dolphin3.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+428, -1.5*depth/400, 0]}>
         <TurbineScene cableHeight={59} />
        </mesh>
        <mesh position={[depth+396, -1.5*depth/400, 0]}>
         <TurbineScene cableHeight={59} />
        </mesh>
        <mesh position={[depth+392, -1.5*depth/400, 0]}>
         <TurbineScene cableHeight={59} />
        </mesh></> : null}

       {depth <= -450 && depth > -545 ?
       <>
       <mesh position={[depth+500, 0, 0]}>
         <TurbineScene cableHeight={67} />
        </mesh>
        <mesh position={[depth+504, 0, 0]}>
         <TurbineScene cableHeight={67} />
        </mesh>
        <mesh position={[depth+508, 0, 0]}>
         <TurbineScene cableHeight={67} /> <Suspense fallback={null}>
          <Dolphin posx={3} posy={-3} posz={-10} tailSpeed={2} height = {17.7} pathName={"/dolphin6.glb"}/>
          </Suspense>    
        </mesh>
        <mesh position={[depth+512, 0, 0]}>
         <TurbineScene cableHeight={67} /><Suspense fallback={null}>
          <Dolphin posx={-3} posy={-2} posz={0} tailSpeed={2.5} height = {17.7} pathName={"/dolphin5.glb"}/>
          </Suspense>  
        </mesh>
        <mesh position={[depth+516, 0, 0]}>
         <TurbineScene cableHeight={67} /> <Suspense fallback={null}>
           <Dolphin posx={-3} posy={-3} posz={-10} tailSpeed={1.2} height = {17.7} pathName={"/dolphin.glb"}/>
         </Suspense>
        </mesh>
        <mesh position={[depth+520, 0, 0]}>
         <TurbineScene cableHeight={67} /><Suspense fallback={null}>
           <Dolphin posx={-3} posy={-2} posz={-10} tailSpeed={2.2} height = {17.7} pathName={"/dolphin2.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+524, 0, 0]}>
         <TurbineScene cableHeight={67} /> <Suspense fallback={null}>
          <Dolphin posx={-3} posy={-1} posz={-10} tailSpeed={3} height = {17.7} pathName={"/dolphin3.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+528, 0, 0]}>
         <TurbineScene cableHeight={67} />
        </mesh>
        <mesh position={[depth+496, 0, 0]}>
         <TurbineScene cableHeight={67} />
        </mesh>
        <mesh position={[depth+492, 0, 0]}>
         <TurbineScene cableHeight={67} />
        </mesh></> : null}

        {depth <= -550 && depth > -650 ? 
        <>
        <mesh position={[depth+600, 1.5*depth/600, 0]}>
         <TurbineScene cableHeight={75} />
        </mesh>
        <mesh position={[depth+604, 1.5*depth/600, 0]}>
         <TurbineScene cableHeight={75} />
        </mesh>
        <mesh position={[depth+608, 1.5*depth/600, 0]}>
         <TurbineScene cableHeight={75} /> <Suspense fallback={null}>
          <Dolphin posx={3} posy={-3} posz={-10} tailSpeed={2} height = {21.7} pathName={"/dolphin6.glb"}/>
          </Suspense>    
        </mesh>
        <mesh position={[depth+612, 1.5*depth/600, 0]}>
         <TurbineScene cableHeight={75} /><Suspense fallback={null}>
          <Dolphin posx={-3} posy={-2} posz={0} tailSpeed={2.5} height = {21.7} pathName={"/dolphin5.glb"}/>
          </Suspense>  
        </mesh>
        <mesh position={[depth+616, 1.5*depth/600, 0]}>
         <TurbineScene cableHeight={75} /> <Suspense fallback={null}>
           <Dolphin posx={-3} posy={-3} posz={-10} tailSpeed={1.2} height = {21.7} pathName={"/dolphin.glb"}/>
         </Suspense>
        </mesh>
        <mesh position={[depth+620, 1.5*depth/600, 0]}>
         <TurbineScene cableHeight={75} /><Suspense fallback={null}>
           <Dolphin posx={-3} posy={-2} posz={-10} tailSpeed={2.2} height = {21.7} pathName={"/dolphin2.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+624, 1.5*depth/600, 0]}>
         <TurbineScene cableHeight={75} /> <Suspense fallback={null}>
          <Dolphin posx={-3} posy={-1} posz={-10} tailSpeed={3} height = {21.7} pathName={"/dolphin3.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+628, 1.5*depth/600, 0]}>
         <TurbineScene cableHeight={75} />
        </mesh>
        <mesh position={[depth+596, 1.5*depth/600, 0]}>
         <TurbineScene cableHeight={75} />
        </mesh>
        <mesh position={[depth+592, 1.5*depth/600, 0]}>
         <TurbineScene cableHeight={75} />
        </mesh></>
        : null}

      {depth <= -650 && depth > -750 ? 
        <>
        <mesh position={[depth+700, 3*depth/700, 0]}>
         <TurbineScene cableHeight={83} />
        </mesh>
        <mesh position={[depth+704, 3*depth/700, 0]}>
         <TurbineScene cableHeight={83} />
        </mesh>
        <mesh position={[depth+708, 3*depth/700, 0]}>
         <TurbineScene cableHeight={83} /> <Suspense fallback={null}>
          <Dolphin posx={3} posy={-3} posz={-10} tailSpeed={2} height = {25.7} pathName={"/dolphin6.glb"}/>
          </Suspense>    
        </mesh>
        <mesh position={[depth+712, 3*depth/700, 0]}>
         <TurbineScene cableHeight={83} /><Suspense fallback={null}>
          <Dolphin posx={-3} posy={-2} posz={0} tailSpeed={2.5} height = {25.7} pathName={"/dolphin5.glb"}/>
          </Suspense>  
        </mesh>
        <mesh position={[depth+716, 3*depth/700, 0]}>
         <TurbineScene cableHeight={83} /> <Suspense fallback={null}>
           <Dolphin posx={-3} posy={-3} posz={-10} tailSpeed={1.2} height = {25.7} pathName={"/dolphin.glb"}/>
         </Suspense>
        </mesh>
        <mesh position={[depth+720, 3*depth/700, 0]}>
         <TurbineScene cableHeight={83} /><Suspense fallback={null}>
           <Dolphin posx={-3} posy={-2} posz={-10} tailSpeed={2.2} height = {25.7} pathName={"/dolphin2.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+724, 3*depth/700, 0]}>
         <TurbineScene cableHeight={83} /> <Suspense fallback={null}>
          <Dolphin posx={-3} posy={-1} posz={-10} tailSpeed={3} height = {25.7} pathName={"/dolphin3.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+728, 3*depth/700, 0]}>
         <TurbineScene cableHeight={83} />
        </mesh>
        <mesh position={[depth+696, 3*depth/700, 0]}>
         <TurbineScene cableHeight={83} />
        </mesh>
        <mesh position={[depth+692, 3*depth/700, 0]}>
         <TurbineScene cableHeight={83} />
        </mesh></>
        : null}

      {depth <= -750 && depth > -900 ? 
        <>
        <mesh position={[depth+796, 4.5*depth/800, 0]}>
         <TurbineScene cableHeight={91} />
        </mesh>
        <mesh position={[depth+792, 4.5*depth/800, 0]}>
         <TurbineScene cableHeight={91} />
        </mesh>
        <mesh position={[depth+800, 4.5*depth/800, 0]}>
         <TurbineScene cableHeight={91} />
        </mesh>
        <mesh position={[depth+804, 4.5*depth/800, 0]}>
         <TurbineScene cableHeight={91} />
        </mesh>
        <mesh position={[depth+808, 4.5*depth/800, 0]}>
         <TurbineScene cableHeight={91} /> <Suspense fallback={null}>
          <Dolphin posx={3} posy={-3} posz={-10} tailSpeed={2} height = {25.7} pathName={"/dolphin6.glb"}/>
          </Suspense>    
        </mesh>
        <mesh position={[depth+812, 4.5*depth/800, 0]}>
         <TurbineScene cableHeight={91} /><Suspense fallback={null}>
          <Dolphin posx={-3} posy={-2} posz={0} tailSpeed={2.5} height = {25.7} pathName={"/dolphin5.glb"}/>
          </Suspense>  
        </mesh>
        <mesh position={[depth+816, 4.5*depth/800, 0]}>
         <TurbineScene cableHeight={91} /> <Suspense fallback={null}>
           <Dolphin posx={-3} posy={-3} posz={-10} tailSpeed={1.2} height = {25.7} pathName={"/dolphin.glb"}/>
         </Suspense>
        </mesh>
        <mesh position={[depth+820, 4.5*depth/800, 0]}>
         <TurbineScene cableHeight={91} /><Suspense fallback={null}>
           <Dolphin posx={-3} posy={-2} posz={-10} tailSpeed={2.2} height = {25.7} pathName={"/dolphin2.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+824, 4.5*depth/800, 0]}>
         <TurbineScene cableHeight={91} /> <Suspense fallback={null}>
          <Dolphin posx={-3} posy={-1} posz={-10} tailSpeed={3} height = {25.7} pathName={"/dolphin3.glb"}/>
          </Suspense>
        </mesh>
        <mesh position={[depth+828, 4.5*depth/800, 0]}>
         <TurbineScene cableHeight={91} />
        </mesh>
        </>
        : null}
        <mesh 
        position={[depth+500, -9, 0]} 
        rotation={[-Math.PI / 2, 0.015, -Math.PI / 2]}
        material={wireMat}>
        <cylinderBufferGeometry attach="geometry" args={[.08, .08, 3000]}/>
        </mesh>
        </Suspense>
     
       <Overlay /> 
      </Suspense>
    </Canvas>: <Globe />}
  
    </html>
  );
}

export default function AppWrapper(){


  return (
      <App/> 
  )
}


 /*  */