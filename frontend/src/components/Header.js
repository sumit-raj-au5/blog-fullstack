import React, {useState} from 'react'
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)",
      }}
    >

<Toolbar>
      <Link to="/" style={{textDecoration:"none", color:"white"}}>
        <Typography variant="h4">
          Blogs
        </Typography>
      </Link>
        <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
              />
              {(isLoggedIn) && <Tab
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
              />}
              <Tab
                LinkComponent={Link}
                to={isLoggedIn?"/addBlog":"/auth"}
                label="Add Blog"
              />
            </Tabs>
          </Box>

          <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              {" "}
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Login
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>

</Toolbar>
    </AppBar>
  )
}

export default Header