import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { portalId } from '../Portal/Portal';

type PortalMessageProps = {
    children: ReactNode;
};

const PortalMessage = ({ children }: PortalMessageProps) => {
    const el = document.getElementById(portalId);
    if (!el) {
        return null;
    }
    return ReactDOM.createPortal(children, el);
};

export default PortalMessage;