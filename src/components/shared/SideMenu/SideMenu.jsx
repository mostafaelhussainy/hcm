import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuItem from "./MenuItem";
import "./sideMenu.scss";
import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function SideMenu({ sideMenuOpen, setSideMenuOpen }) {
    const globalState = useSelector((state) => state);
    const [menuItems, setMenuItems] = useState([]);
    const { data, isPending, error } = useFetch(
        `${globalState.baseURL}/HcmsCoreApi/UserLayout/LayoutLoad`
    );
    useEffect(() => {
        if (data && data.success === true) {
            setMenuItems(data.data.sideMenu);
        }
        if (error) {
            console.error("error in loading side menu", error);
        }
    }, [data, isPending, error]);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setSideMenuOpen(open);
    };

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
                    {isPending && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "20px",
                            }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Skeleton
                                    variant="rounded"
                                    width={200}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={15}
                                    height={15}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Skeleton
                                    variant="rounded"
                                    width={200}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={15}
                                    height={15}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Skeleton
                                    variant="rounded"
                                    width={200}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={15}
                                    height={15}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Skeleton
                                    variant="rounded"
                                    width={200}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={15}
                                    height={15}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Skeleton
                                    variant="rounded"
                                    width={200}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={15}
                                    height={15}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Skeleton
                                    variant="rounded"
                                    width={200}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={15}
                                    height={15}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Skeleton
                                    variant="rounded"
                                    width={200}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={15}
                                    height={15}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Skeleton
                                    variant="rounded"
                                    width={200}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={15}
                                    height={15}
                                />
                            </div>
                        </div>
                    )}
                    {data &&
                        menuItems.map((item) => (
                            <MenuItem key={item.screenName} item={item} />
                        ))}
                </Box>
            </Drawer>
        </React.Fragment>
    );
}
