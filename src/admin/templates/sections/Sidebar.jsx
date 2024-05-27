import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

import {Link} from "react-router-dom"
const Sidebar = ({})=>{
	return <>
	 <Stack direction="row" spacing={2}>
      <Paper>
        <MenuList>
          <MenuItem>
          	<Link to="/admin/dashboard">Dasboard</Link>
          </MenuItem>
          <MenuItem>
          	<Link to="/admin/company">Company</Link>
          </MenuItem>
        </MenuList>
      </Paper>
      </Stack>
	</>
}

export default Sidebar