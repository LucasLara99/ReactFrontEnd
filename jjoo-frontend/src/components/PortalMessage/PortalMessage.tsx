import React from 'react';
import ReactDOM from 'react-dom';
import { portalId } from '../Portal/Portal';

type PortalMessageProps = {
    label: string;
};

const PortalMessage = ({ label }: PortalMessageProps) => {
    const el = document.getElementById(portalId);
    if (!el) {
        return null;
    }
    return ReactDOM.createPortal(label, el);
};

export default PortalMessage;