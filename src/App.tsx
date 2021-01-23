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
import { AppBar, Toolbar, Typography, makeStyles, useTheme, Menu, Button, MenuItem, Color, Tab, Tabs, Box, Select, Theme, createStyles, FormControl } from "@material-ui/core";
import PropTypes from 'prop-types';
import { InputLabel } from "@material-ui/core";
import {useStore} from './components/Overlay';
import Dolphin from './components/Dolphin';

const Terrain: any = () => {
  const elevation = useLoader(THREE.TextureLoader, "/demslope.png");
  const normal = useLoader(THREE.TextureLoader, "/demslope_specular.png");
  const color = useLoader(THREE.TextureLoader, "/combine_images.png");
  const depth:any = useStore(state => state.depth);
  return (
    <Plane
      rotation={[-Math.PI / 2, 0.015, Math.PI / 2]}
      position={[depth+500, -10, 0]}
      args={[1024, 1024, 512, 512]}
    >
      <meshStandardMaterial
        attach="material"
        color="white"
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

 function Header() {
  const { header, logo } = useStyles();

  const displayDesktop = () => {
    return <Toolbar className={header}>{femmecubatorLogo}</Toolbar>;
  };

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>
       Turbine Simulator v1.2
    </Typography>
  );

  return (
    <Toolbar className={header}>{femmecubatorLogo}</Toolbar>
  );
}

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
  const [concreteDepth, setConDepth] = useState(0);

  
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const title = (
    <Typography variant="h5" component="h1" className={logo}>
       Turbine Simulator v1.2
    </Typography>
  );


  return (
    <html>
     {/* <FullWidthTabs/>*/}
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
          <MenuItem value={10}>Agulhas Current</MenuItem>
          <MenuItem value={20}>South Pacific Gyre</MenuItem>

        </Select>
        
          </FormControl>
          <Tab label="Turbine View" style={{color: 'white', marginLeft: '2vw'}} onClick={()=>{useGlobe.setState({show: true})}}/>
          <img  src="./whitelogo.png" alt="nothing" style={{width: '15vw', height: '8vh', paddingLeft: '55vw'}}/>
          
          {/* {title} */}
          
        </Toolbar> 
    {show ? 
    <Canvas camera={{ position: [15, 5, 10]}} /* style={{height: '100%', margin: 0, padding: 0, width: '100%', backgroundColor: 'rgb(0,7,43)',
     background: 'linear-gradient(0deg, rgba(0,7,43,1) 0%, rgba(1,17,64,1) 60%, rgba(9,49,121,0.9192810913427871) 100%)'}} */>
     <fog attach="fog" args={["rgb(1,17,64)", 0, 75]}/> 
      <OrbitControls 
      position={[10, 10, 10]}
      maxDistance={(depth/-25)+20} 
      minDistance={30}
      enablePan={false}   
       minPolarAngle={11*Math.PI/24} maxPolarAngle={11*Math.PI/24}  minAzimuthAngle={Math.PI/5}  maxAzimuthAngle={5*Math.PI/7} />
      <Suspense fallback={<Html><CircularProgress /></Html>}>
      <Ship />
      <Dolphin />
        <Terrain />
        <hemisphereLight
          intensity={2.5}
          color={"rgb(92, 173, 228)"}
          position={[7, 5, 1]}
        />

        {/* condition to show only three stations at a time */}

        {depth <= -50 && depth > -145 ?
        <>
        <mesh position={[depth+100, -6.1*depth/100, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+104, -6*depth/100, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+108, -6*depth/100, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+112, -6*depth/100, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+116, -6*depth/100, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+120, -6*depth/100, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+124, -6*depth/100, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+128, -6*depth/100, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+132, -6*depth/100, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+96, -6*depth/100, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+92, -6.1*depth/100, 0]}>
          <TurbineScene />
        </mesh></> : null}

        {depth <= -150 && depth > -245 ?
        <>
        <mesh position={[depth+200, -4.5*depth/200, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+204, -4.5*depth/200, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+208, -4.5*depth/200, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+212, -4.5*depth/200, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+196, -4.5*depth/200, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+192, -4.6*depth/200, 0]}>
          <TurbineScene />
        </mesh></> : null}

        {depth <= -250 && depth > -345 ?
        <>
        <mesh position={[depth+300, -3*depth/300, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+304, -3*depth/300, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+308, -3*depth/300, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+312, -3*depth/300, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+296, -3*depth/300, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+292, -3*depth/300, 0]}>
          <TurbineScene />
        </mesh></> : null}

        {depth <= -350 && depth > -445 ?
        <>
        <mesh position={[depth+400, -1.5*depth/400, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+404, -1.5*depth/400, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+408, -1.5*depth/400, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+412, -1.5*depth/400, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+396, -1.5*depth/400, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+392, -1.5*depth/400, 0]}>
          <TurbineScene />
        </mesh></> : null}

       {depth <= -450 && depth > -545 ?
       <>
       <mesh position={[depth+500, 0, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+504, 0, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+508, 0, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+512, 0, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+496, 0, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+492, 0, 0]}>
          <TurbineScene />
        </mesh></> : null}

        {depth <= -550 && depth > -650 ? 
        <>
        <mesh position={[depth+600, 1.5*depth/600, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+604, 1.5*depth/600, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+608, 1.5*depth/600, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+612, 1.5*depth/600, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+596, 1.5*depth/600, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+592, 1.5*depth/600, 0]}>
          <TurbineScene />
        </mesh></>
        : null}

      {depth <= -650 && depth > -750 ? 
        <>
        <mesh position={[depth+700, 3*depth/700, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+704, 3*depth/700, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+708, 3*depth/700, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+712, 3*depth/700, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+696, 3*depth/700, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+692, 3*depth/700, 0]}>
          <TurbineScene />
        </mesh></>
        : null}

      {depth <= -750 && depth > -900 ? 
        <>
        <mesh position={[depth+796, 4.5*depth/800, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+792, 4.5*depth/800, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+800, 4.5*depth/800, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+804, 4.5*depth/800, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+808, 4.5*depth/800, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+812, 4.5*depth/800, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+816, 4.5*depth/800, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+820, 4.5*depth/800, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+824, 4.5*depth/800, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+828, 4.5*depth/800, 0]}>
          <TurbineScene />
        </mesh>
        </>
        : null}
        <mesh 
        position={[depth+500, -9, 0]} 
        rotation={[-Math.PI / 2, 0.015, -Math.PI / 2]}
        material={wireMat}>
        <cylinderBufferGeometry attach="geometry" args={[.08, .08, 3000]}/>
        </mesh>
     
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