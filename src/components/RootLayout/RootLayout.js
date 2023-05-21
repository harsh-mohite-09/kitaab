import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDataContext } from "../../context/dataContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const RootLayout = () => {
  const { loader } = useDataContext();
  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer className="toast-container" />

      {loader && (
        <Backdrop
          sx={{ color: "#ff6f61", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default RootLayout;
