import { Menu, Item, useContextMenu } from "react-contexify";

import "react-contexify/dist/ReactContexify.css";

const MENU_ID = "menu-id";

export default function CxtMenu() {
    // 🔥 you can use this hook from everywhere. All you need is the menu id
    const { show } = useContextMenu({
        id: MENU_ID,
    });

    function handleItemClick({ event, props, triggerEvent, data }) {
        console.log(event, props, triggerEvent, data);
    }

    function displayMenu(e) {
        // put whatever custom logic you need
        // you can even decide to not display the Menu
        show({
            event: e,
        });
    }

    return (
        <div>
            <Menu id={MENU_ID}>
                <Item onClick={handleItemClick}>View Info</Item>
                <Item onClick={handleItemClick}>Drilldown</Item>
            </Menu>
        </div>
    );
}
