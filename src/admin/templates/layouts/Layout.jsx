// import * as React from 'react';
// import { styled } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import Sidebar from "../sections/Sidebar"
import MainContent from "../sections/MainContent"
const Item = ({children})=>{
	return <>{children}</>
}
const Layout = ({children})=>{
	return <div className="twx-p-0 twx-flex twx-flex-col twx-gap-2">
 <Box sx={{ flexGrow: 1 }}>
{/*      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>*/}
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
       
        <Grid item xs={2}>
         <Sidebar/>
        </Grid>
        <Grid item xs={10}>
          <MainContent/>
        </Grid>
      </Grid>
    </Box>

		

	</div>
}

export default Layout