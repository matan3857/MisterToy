import React, { useState } from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { NavLink } from 'react-router-dom'

export function Hamburger(props) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <AppBar className='app-bar' variant="elevation" position="static" color='default'>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">MisterToy</Typography>

                <Drawer className='drawer-container' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                    <List className='list-container' style={{ width: '250px' }}>
                        <ListItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'burger-active' : 'burger-inactive' + ' nav-link')}
                                onClick={() => setIsDrawerOpen(!isDrawerOpen)} to='/'>Home</NavLink>
                        </ListItem>

                        <ListItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'burger-active' : 'burger-inactive' + ' nav-link')}
                                onClick={() => setIsDrawerOpen(!isDrawerOpen)} to='/toy'>Toys</NavLink>
                        </ListItem>

                        <ListItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'burger-active' : 'burger-inactive' + ' nav-link')}
                                onClick={() => setIsDrawerOpen(!isDrawerOpen)} to='/toy/dashboard'>Dashboard</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'burger-active' : 'burger-inactive' + ' nav-link')}
                                onClick={() => setIsDrawerOpen(!isDrawerOpen)} to='/about'>About</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : 'inactive' + ' nav-link')}
                                onClick={() => setIsDrawerOpen(!isDrawerOpen)} to='/login'>Login</NavLink>
                        </ListItem>
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
}