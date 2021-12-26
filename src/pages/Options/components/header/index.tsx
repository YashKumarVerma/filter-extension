import React from 'react';
import { content } from "../../content"

interface Props { }

/** Header to displayed on all option pages */
const Header: React.FC<Props> = () => {
    return <header className="container">
        <hgroup>
            <h1>{content.app.title}</h1>
            <h2>{content.app.subtitle}</h2>
        </hgroup>
    </header>
};

export default Header