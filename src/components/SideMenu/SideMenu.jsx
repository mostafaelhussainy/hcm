import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuItem from "./MenuItem";
import "./sideMenu.scss";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import SideMenuLoader from "./SideMenuLoader";
import { useSelector, useDispatch } from "react-redux";

export default function SideMenu({
    sideMenuOpen,
    setSideMenuOpen,
    token,
    systemLang,
}) {
    const globalState = useSelector((state) => state);
    const [menuItems, setMenuItems] = useState([]);
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setSideMenuOpen(open);
    };
    const { data, isPending, error } = useFetch(
        `${globalState.baseURL}/UserLayout/LayoutLoad`,
        "GET",
        { LangCode: systemLang, UserToken: token }
    );
    useEffect(() => {
        if (data && data.data && data.data.sideMenu) {
            setMenuItems(data.data.sideMenu);
        }
    }, [data]);
    return (
        <React.Fragment key="left">
            <Drawer
                anchor="left"
                open={sideMenuOpen}
                onClose={toggleDrawer(false)}
                id="side-menu">
                <Box
                    sx={{ width: "380px" }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}>
                    {isPending && <SideMenuLoader />}
                    {data &&
                        menuItems.map((item) => (
                            <MenuItem key={item.screenName} item={item} />
                        ))}
                </Box>
            </Drawer>
        </React.Fragment>
    );
}
