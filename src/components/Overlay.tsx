/* eslint-disable no-restricted-globals */
import React, {useState} from "react"
import styled from "styled-components"
import {Html} from "@react-three/drei"
import logo from './whitelogo.png'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import create from 'zustand'
import {useGlobe} from './Globe'
import { useSpring } from "@react-spring/three";


export const useStore = create(set => ({
  speed: 1,
  depth:-500,
}))



const useStyles = makeStyles({
  root: {
    width: '15vw',
    position: "absolute",
    marginLeft: "-45vw",
    marginTop: "-35vh",
    
  },
});
const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
    position: "relative",
    fontFamily: "Candara",
    fontSize: "10px",
  }
})(Typography);

 const OutputTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
    position: "relative",
    fontFamily: "Candara, serif",
    fontSize: "20px",
    marginTop:"20px",
  }
})(Typography);

const GlobeButton = withStyles({
  root: {
    position: "relative",
    marginTop: '50vh',
  }
})(Button);

function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(1);
  const speed:any = useStore(state => state.speed);
  const [sliderDepth, setSliderDepth] = useState(500);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
    useStore.setState({speed: newValue})
  };

  const handleDepth = (event: any, newValue: number | number[]) => {
    var b =newValue;

    setSliderDepth(newValue as number);
  };

  useSpring({
    sliderDepth: sliderDepth,
    onChange: ({ sliderDepth }) => useStore.setState({depth: sliderDepth*-1})
    
 })
  return (
    <div className={classes.root}>
      <Grid container spacing={2} aria-colspan={4}>
        <Grid><Slider  
          value={speed} 
          valueLabelDisplay="auto"
          step={0.01}
          min={1}
          max={2}
          onChange={handleChange} 
          aria-labelledby="continuous-slider" />
          <WhiteTextTypography id="continuous-slider" gutterBottom>
      Surface Current Speed {value} m/s
      </WhiteTextTypography>
   
        <Slider  
          value={sliderDepth} 
          valueLabelDisplay="auto"
          step={100}
          min={0}
          max={1600}
          onChange={handleDepth} 
          aria-labelledby="continuous-slider" />
          <WhiteTextTypography id="continuous-slider" gutterBottom>
      Depth {sliderDepth} meters
      </WhiteTextTypography>
      <OutputTextTypography id="continuous-slider" gutterBottom>
      Power Output: {Math.floor(value*1000)} mW
      </OutputTextTypography>

      <GlobeButton  variant="contained" onClick={()=>{
        useGlobe.setState({show: false})
      }}>
        Back To Earth
      </GlobeButton>
        </Grid> 
      </Grid>
    </div>
  );
}
export default function Overlay() {
  return (
    <Html>

       <ContinuousSlider />
      
    </Html>
  )
}

export function Socials() {
  return (
    <Html>
    <div
      style={{
        position: 'absolute',
        right: '50px',
        top: '50px',
      }}>
      <a href="https://twitter.com/pmndrs">Twitter</a>
      <a href="https://github.com/pmndrs">Github</a>
      <a href="https://pmnd.rs/discord">Discord</a>
    </div>
    </Html>
  )
}
