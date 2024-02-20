import React from 'react';
import './Portal.css';

export const portalId = 'message-root';

const Portal = () => {
    return <div id={portalId} className="portal"></div>;
};

export default Portal;