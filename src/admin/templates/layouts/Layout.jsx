// import * as React from 'react';
// import { styled } from '@mui/material/styles';

// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';


import Sidebar from "../sections/Sidebar"
import MainContent from "../sections/MainContent"
const Item = ({children})=>{
	return <>{children}</>
}
const Layout = ({children})=>{
	
      return <MainContent/>

}

export default Layout