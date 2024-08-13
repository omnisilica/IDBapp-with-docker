import { useState } from "react";

export const NavTabBar = ({ children }) => {
    return (
        <nav className="nav nav-underline">
            {children}
        </nav>
    )
}

export const NavTabLink = ({ children, onClick, active }) => {
    return (
        <div className={`nav-link ${active ? 'active' : ''}`} onClick={onClick}>
            {children}
        </div>
    );
}

const NavBarContainer = ({ handleTabClick, activeTab }) => {

    return (
        <NavTabBar>
            <NavTabLink onClick={() => handleTabClick(1)} active={activeTab === 1}>Business Structure</NavTabLink>
            <NavTabLink onClick={() => handleTabClick(2)} active={activeTab === 2}>Business Information</NavTabLink>
            <NavTabLink onClick={() => handleTabClick(3)} active={activeTab === 3}>Owner Information</NavTabLink>
            {/* Add more tab links as needed */}
        </NavTabBar>
    );
}

export default NavBarContainer;
