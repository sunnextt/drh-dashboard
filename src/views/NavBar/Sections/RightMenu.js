/* eslint-disable jsx-a11y/anchor-is-valid */
import Grid from "antd/lib/card/Grid";
import React from "react";
import {Link} from "react-router-dom"

function RightMenu() {
  return (
    <div style={{ display: "flex" }}>
      <Grid style={{ marginRight: "1rem" }}>
        <Link to="/register" className="button-white">
          Register
        </Link>
      </Grid>
      <Grid>
        <Link to="/login" className="button-white">
          Signin
        </Link>
      </Grid>
    </div>
  );
}

export default RightMenu
