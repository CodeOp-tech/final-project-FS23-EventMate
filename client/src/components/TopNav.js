import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Link } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";

export default function TopNav(props) {
  return (
    <div className="TopNav">
      {props.user ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
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
                EventMate
              </Typography>
              <Avatar alt={props.user.username} src={props.user.avatarURL} />
              {props.user.username}
              <Button color="inherit" onClick={props.logOutCb}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          {" "}
          <AppBar position="static">
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
                EventMate
              </Typography>

              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </div>
  );
}
