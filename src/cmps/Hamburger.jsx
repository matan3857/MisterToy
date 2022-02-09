import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom'



export class Hamburger extends React.Component {

    state = {
        isDrawerOpen: false
    }
    setIsDrawerOpen = (isDrawerOpen) => {
        this.setState({
            isDrawerOpen
        });
    }

    toggleDrawer = () => {
        this.setIsDrawerOpen(!this.state.isDrawerOpen);
    }

    render() {
        return (
            <AppBar variant="outlined" position="static" >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => this.setIsDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Mister Toy App</Typography>

                    <Drawer open={this.state.isDrawerOpen} onClose={() => this.setIsDrawerOpen(false)}>
                        <List className='drawer' style={{ width: '250px' }}>
                            <ListItem Link to={'/'}>
                                <NavLink onClick={this.toggleDrawer} to='/'>Home</NavLink>
                            </ListItem>

                            <ListItem Link>
                                <NavLink onClick={this.toggleDrawer} to='/toy'>Toys</NavLink>
                            </ListItem>

                            <ListItem Link>
                                <NavLink onClick={this.toggleDrawer} to='/toy/dashboard'>Dashboard</NavLink>
                            </ListItem>
                            <ListItem Link>
                                <NavLink onClick={this.toggleDrawer} to='/about'>About</NavLink>
                            </ListItem>
                            <ListItem Link>
                                <NavLink onClick={this.toggleDrawer} to='/login'>Login</NavLink>
                            </ListItem>
                        </List>
                    </Drawer>
                </Toolbar>
            </AppBar>
        );
    }
}