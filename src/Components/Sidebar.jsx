import React, { useEffect, useRef } from 'react';
import '../style/Sidebar.css';

const Sidebar = ({ openSidebar }) => {
    const side = useRef();

    useEffect(() => {
        openSidebar ? side.current.style.width = '200px' : side.current.style.width = '0';
    }, [openSidebar])

    return (
        <div className='sidebar text-center' ref={side}>
            <h6 className='mt-2'>Dashboard</h6>
            <hr />
        </div>
    )
}

export default Sidebar