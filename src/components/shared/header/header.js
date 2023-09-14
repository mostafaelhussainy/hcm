import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import "./header.scss";
import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { Avatar, Skeleton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthInfo } from "../../../Authontcation/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header({ setSideMenuOpen }) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.userToken);
    const [profileImgSrc, setProfileImgSrc] = useState(null);
    // const [profileImgFirstTwoLetters, setProfileImgFirstTwoLetters] =
    //     useState("");
    const [logoSrc, setLogoSrc] = useState("");
    const [data, setData] = useState();
    const [isPending, setIsPending] = useState(false);
    const globalState = useSelector((state) => state);
    // const { data, isPending, error } = useFetch(
    //     "https://yasdemo.civilsoft.org/UserLayout/LayoutLoad",
    //     "GET",
    //     { LangCode: globalState.auth.systemLang, UserToken: token }
    // );
    // useEffect(() => {
    //     if (data && data.success === true) {
    //         setLogoSrc(data.data.companyLogo);
    //         if (data.data.userData.empimage !== null) {
    //             setProfileImgSrc(data.data.userData.empimage);
    //         } else {
    //             const firstTwoLetters = data.data.userData.empName
    //                 .split(" ")
    //                 .map((name) => name[0])
    //                 .join("");
    //             setProfileImgFirstTwoLetters(firstTwoLetters);
    //         }
    //     }
    //     if (error) {
    //         console.error("error in setting logo", error);
    //     }
    // }, [data, isPending, error]);
    useEffect(() => {
        if (token !== null) {
            setIsPending(true);
            fetch(`${globalState.baseURL}/UserLayout/LayoutLoad`, {
                method: "GET",
                headers: {
                    LangCode: globalState.auth.systemLang,
                    UserToken: token,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.isAuthorized) {
                        return navigate("/notAuthorized");
                    }
                    setIsPending(false);
                    setData(data);
                    setLogoSrc(data.data.companyLogo);
                });
        }
    }, [token]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const logoutFun = () => {
        dispatch(clearAuthInfo());
        fetch(`${globalState.baseURL}/Token/Logout`, {
        method: "GET",
        headers: {
            UserToken: token,
        }}  );
        const date = new Date();
        document.cookie =
            "c3%2f3LPUH4Wr5u01KeRmzWQ%3d%3d= COOKIE;expires=" +
            date +
            "caJdYzJn%2b3g%3d=COOKIE;expires=" +
            date +
            "C6eZ%2b1FHPzw%3d=COOKIE;expires=" +
            date;
        window.location.href = `${globalState.baseURL}/m`;
    };
    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            <MenuItem onClick={logoutFun}>Log Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="primary">
                    <AccountCircle
                        size="large"
                        className="profileIcon"
                        color="Primary"
                    />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }} id="HCMS-header">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        id="open-side-menu-btn"
                        onClick={() => setSideMenuOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    {isPending && (
                        <Skeleton
                            style={{ backgroundColor: "#dedede" }}
                            id="header--logo"
                            variant="rounded"
                            width={34}
                            height={34}
                        />
                    )}
                    {data && (
                        <a href="/f" id="header--logo">
                            <img src={logoSrc} alt="al dar image" />
                        </a>
                    )}

                    <h1>
                        CIVILSOFT
                        <span>HCMS</span>
                    </h1>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="primary">
                            {isPending && (
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                />
                            )}
                            {data && (
                                <>
                                    {profileImgSrc !== null ? (
                                        <Avatar
                                            width={40}
                                            height={40}
                                            src={profileImgSrc}
                                        />
                                    ) : (
                                        // <Avatar width={40} height={40}>
                                        //     {profileImgFirstTwoLetters}
                                        // </Avatar>
                                        <AccountCircle
                                            size="large"
                                            className="profileIcon"
                                            color="Primary"
                                        />
                                    )}
                                    <Typography>
                                        {data.data.userData.empName}
                                    </Typography>
                                </>
                            )}
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="primary">
                            <MoreIcon id="more-icon" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
