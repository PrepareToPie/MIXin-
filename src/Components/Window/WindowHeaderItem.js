import React, { useContext } from 'react';
import useJumpy from '../../Hooks/useJumpy';
import WindowContext from './Window';

function WindowHeaderItem({ index, className, children, id, onClick = () => { } }) {
    const [jumpy, toggleJumpy] = useJumpy()
    const { activeDisplay, setActiveDisplay } = useContext(WindowContext)

    let classNames = `${index === activeDisplay ? "active" : ""} ${jumpy} ${className}`

    return (
        <li className={classNames}
            id={id}
            onClick={() => {
                toggleJumpy()
                setActiveDisplay(index)
                onClick()
            }}>
            {children}
        </li>
    );
}

export default WindowHeaderItem;