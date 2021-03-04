import React from 'react';
import Switch from 'react-switch';
import { FaHeart, FaBars } from 'react-icons/fa';
import { Layout, Menu, Breadcrumb } from 'antd';
import { makeStyles } from "@material-ui/core";
import NavBar from "views/NavBar/NavBar.js"
import RightMenu from 'views/NavBar/Sections/RightMenu';


const { Header, Footer, Sider, Content,  PageHeader, Button, } = Layout;

const useStyles = makeStyles((theme) => ({
  root: {

  },
  // header: {
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContents: "flex-end",
  // }
}));

const Main = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
}) => {
  const classes = useStyles();

  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <Header className={classes.header}>
        <NavBar />
      </Header>
      <Content>
        <div>
          <h1>This for Content</h1>
        </div>
      </Content>
      <footer>
        <div className="block ">
          <Switch
            height={16}
            width={30}
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={handleCollapsedChange}
            checked={collapsed}
            onColor="#219de9"
            offColor="#bbbbbb"
          />
          <span>collapsed</span>
        </div>
        <small>
          © 2020 made with <FaHeart style={{ color: 'red' }} /> by -{' '}
          <a target="_blank" rel="noopener noreferrer" href="/#">
          DRH Health Developer
          </a>
        </small>
      </footer>
    </main>
  );
};

export default Main;
