/* eslint-disable no-restricted-globals */
import React from "react"
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


export const useStore = create(set => ({
  speed: 1,
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

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
    useStore.setState({speed: newValue})
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} aria-colspan={4}>
        <Grid><Slider  
          value={value} 
          valueLabelDisplay="auto"
          step={0.01}
          min={1}
          max={3}
          onChange={handleChange} 
          aria-labelledby="continuous-slider" />
          <WhiteTextTypography id="continuous-slider" gutterBottom>
      Surface Current Speed {value} m/s
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
