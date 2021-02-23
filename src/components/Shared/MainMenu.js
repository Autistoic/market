import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState, useEffect } from 'react';


const MainMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<>
        <nav>
            <Link to="/">
                <Button aria-controls="simple-menu" aria-haspopup="true">
                    Home
         </Button>
            </Link>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Categorias
         </Button>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Ofertas
         </Button>
            <Link to="/profile">
                <Button aria-controls="simple-menu" aria-haspopup="true">
                    Mi cuenta
                    </Button>
            </Link>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </nav >
    </>)
}

export default MainMenu;