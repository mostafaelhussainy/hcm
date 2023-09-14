import { useState } from 'react';

function Dashboard({ toggleDrawer }) {
    const [isPinned, setIsPinned] = useState(false);
    const [isChart, setIsChart] = useState(false);
    const [isGrid, setIsGrid] = useState(false);

    const endPoint = '';

    if (isChart && !isGrid) {
        return (
            <></>
        )
    } else if (!isChart && isGrid) {
        return (
            <></>
        )
    } if (isChart && isGrid) {
        return (
            <></>
        )
    } else {
        return (
            <div className='dashboard empty'>
                <button className='dashboard__btn' onClick={toggleDrawer(true)} >
                    Click to create new insight
                </button>
                <i className='dashboard__icon'></i>
            </div>
        )
    }
}

export default Dashboard