import React from "react";

function WindowHeader({ children }) {
    return (
        <ul className="Results-select">
            {children.map((child, index) => (
                React.cloneElement(child, { index })
            ))}
        </ul>
    );
}

export default WindowHeader;