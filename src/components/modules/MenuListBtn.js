import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaRegUser } from "react-icons/fa";
import { RiShieldCheckLine } from "react-icons/ri";
import { RiFilePaper2Line } from "react-icons/ri";
import { HiOutlineBookmark } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { VscHistory } from "react-icons/vsc";
import { FaStoreAlt } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { Stack } from '@mui/material';
import { e2p } from '../../utils/replaceNumber';

  

export default function MenuList({name,icon,mobile="",role}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {icon}
        {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: role ==="ADMIN"? "center":'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        MenuListProps={{sx:{py:0, width: "200px"}}}
      >
        <MenuItem sx={{padding:"8px 16px 8px 10px"}} divider={true} onClick={handleClose}>
        <Stack spacing={1}>
            <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:".75rem"}}><FaRegUser />پروفایل</div>
            <div style={{display:"flex",fontSize:".75rem",marginRight:"15px"}}>موبایل<span style={{marginTop:"2px",marginRight:"5px"}}>{e2p(mobile)}</span></div>
        </Stack>
        </MenuItem>
        <MenuItem sx={{padding:"8px 16px 8px 10px"}} divider={true} onClick={handleClose}>
            <Stack py={1}>
                <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:".85rem"}}>
                <RiShieldCheckLine />تایید هویت
                </div>
            </Stack>
        </MenuItem>
        <MenuItem sx={{padding:"8px 16px 8px 10px"}} divider={true} onClick={handleClose}>
            <Stack py={1}>
                <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:".85rem"}}><RiFilePaper2Line />آگهی ها</div>
            </Stack>
        </MenuItem>
        <MenuItem sx={{padding:"8px 16px 8px 10px"}} divider={true} onClick={handleClose}>
        <Stack py={1}>
            <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:".85rem"}}>
                <HiOutlineBookmark />نشان
            </div>
        </Stack> 
        </MenuItem>
        <MenuItem sx={{padding:"8px 16px 8px 10px"}} divider={true} onClick={handleClose}>
            <Stack py={1}>
                <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:".85rem"}}><IoNewspaperOutline /> یاداشت ها</div>
            </Stack>
        </MenuItem>
        <MenuItem sx={{padding:"8px 16px 8px 10px"}} divider={true} onClick={handleClose}>
            <Stack py={1}>
                <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:".85rem"}}>
                    <VscHistory />بازدید های اخیر
                </div>
            </Stack>
        </MenuItem>
        <MenuItem sx={{padding:"8px 16px 8px 10px"}} divider={true} onClick={handleClose}>
            <Stack py={1}>
                <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:".85rem"}}>
                <FaStoreAlt />دیوار برای کسب وکارها
                </div>
            </Stack>
        </MenuItem>
        <MenuItem sx={{padding:"8px 16px 8px 10px"}} onClick={handleClose}>
            <Stack py={1}>
                <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:".85rem"}}>
                <IoExitOutline />خروج
                </div>
            </Stack>
        </MenuItem>
      </Menu>
      </>
  );
}