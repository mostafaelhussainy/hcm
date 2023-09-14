import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tooltip from "@mui/material/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import {
    removeAllCurrentSlecetedNods,
    changeCurrentSlecetedNods,
    addToCurrentSlecetedNods,
    addSelectedNodeID,
    removeSelectedNodeID,
    removeSlectedList,
} from "../../../features/shared/locationTreeSlice";
import Checkbox from "@mui/material/Checkbox";
import Skeleton from "@mui/material/Skeleton";
import "./locationTree.scss";
import CircularProgress from "@mui/material/CircularProgress";

export default function LocationTree({ listToRender, moduleID }) {
    let stateObj = {};

    const token = useSelector((state) => state.auth.userToken);
    const systemLang = useSelector((state) => state.auth.systemLang);
    const [childNodes, setChildNodes] = useState(null);
    const [expandedData, setExpandedData] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [nodeDataLoading, setNodeDataLoading] = useState(false);
    const [currentlyExpandingNode, setCurrentlyExpandingNode] = useState(null);
    const [checkedList, setchecked] = React.useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [loadChild, setloadChild] = useState(false);
    const globalState = useSelector((state) => state);

    const findTargetNode = (dataset, childList, nodeId) => {
        let currentnode = null;
        dataset.reduce((a, node) => {
            if (node.locId == nodeId) {
                currentnode = node;
                if (node.children == null && childList !== null) {
                    node.children = childList;
                }
            }
        }, null);
        if (currentnode == null) {
            let children = [];
            const flattenMembers = dataset.map((m) => {
                if (m.children && m.children.length) {
                    children = [...children, ...m.children];
                    for (let childnode in m.children) {
                        if (m.children[childnode].locId == nodeId) {
                            currentnode = childnode;
                        }
                    }
                }
                return m;
            });

            return flattenMembers.concat(
                children.length
                    ? findTargetNode(children, childList, nodeId)
                    : children
            );
        }
        if (childList == null) {
            return currentnode;
        }
    };
    const findChildTargetNode = (dataset, childList, nodeId) => {
        let currentnode = null;

        dataset.reduce((a, node) => {
            if (node.locId == nodeId) {
                currentnode = node;
                if (node.children == null && childList !== null) {
                    node.children = childList;
                }
            }
        }, null);
        if (currentnode == null) {
            let children = [];
            const flattenMembers = dataset.map((m) => {
                if (m.children && m.children.length) {
                    children = [...children, ...m.children];
                    for (let childnode in m.children) {
                        if (m.children[childnode].locId == nodeId) {
                            currentnode = m.children[childnode];
                        }
                    }
                }
            });
            //return flattenMembers.concat(children.length ? findChildTargetNode(children,nodeId) : children);
            return currentnode;
        }
    };
    const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
        color: theme.palette.text.secondary,
        [`& .${treeItemClasses.content}`]: {
            color: theme.palette.text.secondary,
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            "&.Mui-expanded": {
                fontWeight: theme.typography.fontWeightRegular,
            },
            "&:hover": {
                backgroundColor: theme.palette.action.hover,
            },
            "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
                color: "var(--tree-view-color)",
            },
            [`& .${treeItemClasses.label}`]: {
                fontWeight: "inherit",
                color: "inherit",
            },
        },
        [`& .${treeItemClasses.group}`]: {
            marginLeft: 0,
            [`& .${treeItemClasses.content}`]: {
                paddingLeft: theme.spacing(2),
            },
        },
    }));
    const treeImgStyle = {
        width: "25px",
        height: "25px",
        margin: "0px 5px",
    };
    function StyledTreeItem(props) {
        const dispatch = useDispatch();

        const theme = useTheme();
        const {
            bgColor,
            color,
            //labelIcon: LabelIcon,
            labelInfo,
            locationImage,
            labelText,
            colorForDarkMode,
            bgColorForDarkMode,
            isSelected,
            nodecId,
            checked,
            ...other
        } = props;
        const handleNodeSlecect = (event) => {
            event.stopPropagation();
            const currentObj = findTargetNode(
                childNodes.children,
                null,
                event.target.id
            );
            let isFirstelemnt =
                Object.entries(checkedList)[0][0] == event.target.id
                    ? true
                    : false;
            if (!isFirstelemnt) {
                if (
                    currentObj.children !== null &&
                    currentObj.children !== undefined
                ) {
                    stateObj = { ...checkedList };

                    currentObj.children.forEach((element) => {
                        if (event.target.checked) {
                            stateObj = { ...stateObj, [element.locId]: true };
                            dispatch(
                                changeCurrentSlecetedNods(
                                    element.locId.toString()
                                )
                            );
                        } else {
                            stateObj = { ...stateObj, [element.locId]: false };
                            dispatch(
                                removeSelectedNodeID(element.locId.toString())
                            );
                        }
                        const parentLI = document
                            .getElementById(event.target.id)
                            .closest("li");
                        const currentChildObj =
                            parentLI.querySelectorAll('[type="checkbox"]');
                        currentChildObj.forEach((element) => {
                            if (event.target.checked) {
                                stateObj = { ...stateObj, [element.id]: true };
                                dispatch(
                                    changeCurrentSlecetedNods(
                                        element.id.toString()
                                    )
                                );
                            } else {
                                stateObj = { ...stateObj, [element.id]: false };
                                dispatch(
                                    removeSelectedNodeID(element.id.toString())
                                );
                            }
                        });
                    });
                    if (event.target.checked) {
                        stateObj = { ...stateObj, [event.target.id]: true };
                        setchecked(stateObj);

                        dispatch(changeCurrentSlecetedNods(event.target.id));
                    } else {
                        stateObj = { ...stateObj, [event.target.id]: false };
                        setchecked(stateObj);

                        dispatch(removeSelectedNodeID(event.target.id));
                    }
                } else {
                    stateObj = { ...checkedList };
                    const parentLI = document
                        .getElementById(event.target.id)
                        .closest("li");
                    const currentChildObj =
                        parentLI.querySelectorAll('[type="checkbox"]');
                    currentChildObj.forEach((element) => {
                        if (event.target.checked) {
                            stateObj = { ...stateObj, [element.id]: true };
                            dispatch(
                                changeCurrentSlecetedNods(element.id.toString())
                            );
                        } else {
                            stateObj = { ...stateObj, [element.id]: false };
                            dispatch(
                                removeSelectedNodeID(element.id.toString())
                            );
                        }
                    });
                    if (event.target.checked) {
                        stateObj = { ...stateObj, [event.target.id]: true };
                        // setchecked(stateObj)
                        dispatch(changeCurrentSlecetedNods(event.target.id));
                    } else {
                        stateObj = { ...stateObj, [event.target.id]: false };

                        dispatch(removeSelectedNodeID(event.target.id));
                    }
                    setchecked(stateObj);
                }
            } else {
                stateObj = { ...checkedList };
                if (event.target.checked) {
                    for (const element in stateObj) {
                        stateObj[element] = true;
                        dispatch(changeCurrentSlecetedNods(element));
                    }
                    stateObj = { ...stateObj, [event.target.id]: true };

                    setchecked(stateObj);
                    dispatch(changeCurrentSlecetedNods(event.target.id));
                } else {
                    for (const element in stateObj) {
                        stateObj[element] = false;
                        dispatch(removeSelectedNodeID(element));
                    }
                    stateObj = { ...stateObj, [event.target.id]: false };
                    setchecked(stateObj);
                    dispatch(removeAllCurrentSlecetedNods());
                }
            }
        };
        const styleProps = {
            "--tree-view-color":
                theme.palette.mode !== "dark" ? color : colorForDarkMode,
            "--tree-view-bg-color":
                theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
        };

        return (
            <StyledTreeItemRoot
                label={
                    <Tooltip title={labelText}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 0.5,
                                pr: 0,
                            }}>
                            {/*<Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />*/}
                            <Checkbox
                                id={nodecId}
                                checked={checkedList[nodecId]}
                                onChange={handleNodeSlecect}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            />
                            {locationImage ? (
                                <img
                                    src={locationImage}
                                    sx={{ mr: 1 }}
                                    style={treeImgStyle}
                                    alt={labelText}
                                />
                            ) : (
                                ""
                            )}
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "inherit", flexGrow: 1 }}>
                                {labelText}
                            </Typography>
                            <Typography variant="caption" color="inherit">
                                {labelInfo}
                            </Typography>
                        </Box>
                    </Tooltip>
                }
                style={styleProps}
                {...other}
            />
        );
    }

    StyledTreeItem.propTypes = {
        bgColor: PropTypes.string,
        bgColorForDarkMode: PropTypes.string,
        color: PropTypes.string,
        colorForDarkMode: PropTypes.string,
        //labelIcon: PropTypes.elementType.isRequired, //option to add icon in tree node
        labelInfo: PropTypes.string,
        locationImage: PropTypes.string,
        nodecId: PropTypes.string,
        labelText: PropTypes.string,
        isSelected: PropTypes.bool,
        checked: PropTypes.bool,
    };

    const firstLevelApi = `${globalState.baseURL}/Location/GetLocationTree?modulecode=`;
    const expandNodeApi = `${globalState.baseURL}/Location/ExpandNode?`;
    const dispatch = useDispatch();

    const loadTreeFirstLevel = () => {
        setIsLoading(true);
        fetch(firstLevelApi + moduleID, {
            method: "GET",
            headers: { LangCode: systemLang, UserToken: token },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.isAuthinticated) {
                    stateObj = { ...stateObj, [data.data.locId]: true };
                    dispatch(removeSlectedList());
                    setExpanded([data.data.locId.toString()]);
                    setChildNodes(data.data);
                    setExpandedData(data.data.children);
                    data.data.children.forEach((element) => {
                        dispatch(addSelectedNodeID(element.locId));
                        dispatch(changeCurrentSlecetedNods(element.locId));
                        dispatch(addToCurrentSlecetedNods(element.locId));
                        stateObj = { ...stateObj, [element.locId]: true };
                    });
                    setchecked(stateObj);
                    setIsLoading(false);
                }
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        (async () => {
            loadTreeFirstLevel();
        })();
    }, [moduleID]);
    /**
     * Transform flat array of objects into tree.
     * @param {(Array|Object)} dataset Tree items.
     * @returns {JSX.Element} Element.
     */

    const toTree = (dataset, childList, nodeId) => {
        setloadChild(false);
        findTargetNode(dataset.children, childList, nodeId);
        stateObj = checkedList;
        childList.forEach((element) => {
            // dispatch(addSelectedNodeID(element.locId))
            dispatch(changeCurrentSlecetedNods(element.locId));
            dispatch(addToCurrentSlecetedNods(element.locId));
            if (document.getElementById(nodeId).checked) {
                stateObj = { ...stateObj, [element.locId]: true };
            } else {
                stateObj = { ...stateObj, [element.locId]: false };
            }
        });

        setchecked(stateObj);
        return dataset;
    };

    /**
     * Render a tree.
     * @param {Event} event Toggle event.
     * @param {(Array|Object)} nodes Tree items.
     */
    const handleChange = async (event, nodes) => {
        event.stopPropagation();
        const currentNode = findTargetNode(childNodes.children, null, nodes);
        let exandedArray = expanded;
        if (!expanded.includes(nodes)) {
            if (currentNode.children == null) {
                setNodeDataLoading(true);
                setCurrentlyExpandingNode(nodes);

                if (nodes) {
                    setloadChild(true);
                    const fetchChildren = await fetch(
                        expandNodeApi +
                            "nodeId=" +
                            nodes +
                            "&modulecode=CS0201",
                        {
                            method: "GET",
                            headers: { LangCode: systemLang, UserToken: token },
                        }
                    );
                    const childdata = await fetchChildren.json();
                    setExpandedData(childdata.data);
                    setChildNodes(
                        await toTree(childNodes, childdata.data, nodes)
                    );
                    setNodeDataLoading(false);
                }
            }
            exandedArray.push(nodes);
            setExpanded(exandedArray);
        } else {
            const index = exandedArray.indexOf(nodes);
            exandedArray.splice(index, index);
            setExpanded(exandedArray);
        }
    };
    const renderTree = (nodes) => (
        <StyledTreeItem
            className={nodes.hasChild ? "" : "lastLvl"}
            isSelected={false}
            key={nodes.locId}
            nodeId={nodes.locId + ""}
            labelText={nodes.locationName}
            locationImage={nodes.locationImg}
            nodecId={nodes.locId + ""}>
            {nodes.hasChild ? (
                <ChevronRightIcon style={{ display: "none" }} />
            ) : null}
            {nodes.children
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </StyledTreeItem>
    );

    return (
        <>
            {childNodes && !isLoading ? (
                <TreeView
                    aria-label="rich object"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    //defaultExpanded={['1']}
                    expanded={expanded}
                    defaultExpandIcon={<ChevronRightIcon />}
                    onNodeSelect={handleChange}
                    sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}>
                    <StyledTreeItem
                        isSelected={false}
                        key={childNodes.locId}
                        nodeId={childNodes.locId + ""}
                        labelText={childNodes.locationName}
                        locationImage={childNodes.locationImg}
                        nodecId={childNodes.locId + ""}>
                        {childNodes.hasChild ? (
                            <ChevronRightIcon style={{ display: "none" }} />
                        ) : null}
                        {Array.isArray(childNodes.children)
                            ? childNodes.children.map((node) =>
                                  renderTree(node)
                              )
                            : null}
                    </StyledTreeItem>
                </TreeView>
            ) : (
                <Box sx={{ width: 400, margin: "0 23px" }}>
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                </Box>
            )}

            {loadChild ? (
                <div className="spinnerCont">
                    <CircularProgress />
                </div>
            ) : null}
        </>
    );
}
