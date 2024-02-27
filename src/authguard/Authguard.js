// AuthGuard.js

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Doctor_info from "../Doctor_info";
import { dividerClasses } from "@mui/material";
const AuthGuard = () => {
	const navigate = useNavigate();

	const accessToken = sessionStorage.getItem("token");

	if (!accessToken) {
		navigate("/login"); // Redirect to login page if not authenticated
	}

	return <div>{accessToken ? <Doctor_info /> : ""}</div>;
};
export default AuthGuard;
