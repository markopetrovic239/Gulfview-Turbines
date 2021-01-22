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
 /*
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useTabStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: 'white',
    width: 500,
  },
}));

 function FullWidthTabs() {
  const classes : any = useTabStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
    </div>
  );
} */

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
      maxDistance={100} 
      minDistance={20}
      enablePan={false}   
       minPolarAngle={11*Math.PI/24} maxPolarAngle={11*Math.PI/24}  minAzimuthAngle={Math.PI/5}  maxAzimuthAngle={5*Math.PI/7} />
      <Suspense fallback={<Html><CircularProgress /></Html>}>
      <Ship />
        <Terrain />
        <hemisphereLight
          intensity={2.5}
          color={"rgb(92, 173, 228)"}
          position={[7, 5, 1]}
        />

        {/* condition to show only three stations at a time */}
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
        </mesh>
        <mesh position={[depth+600, 0, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+604, 0, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+608, 0, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+612, 0, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+596, 0, 0]}>
          <TurbineScene />
        </mesh>
        <mesh position={[depth+592, 0, 0]}>
          <TurbineScene />
        </mesh>
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