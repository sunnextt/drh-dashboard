import React, { useState } from 'react';
import RightMenu from './Sections/RightMenu';
import LeftMenu from './Sections/LeftMenu';
import {Button } from 'antd';
import { makeStyles } from "@material-ui/core";
// import './Sections/Navbar.css';
const useStyles = makeStyles((theme) => ({
  root: {

  },
  menuRigth: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }
}));

function NavBar() {
  const classes = useStyles();

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
        <div className={classes.menuRigth}>
          <div>
            <LeftMenu mode="horizontal" />
          </div>
          <div>
            <RightMenu mode="horizontal" />
          </div>
        </div>
  )
}

export default NavBar
