import { NavLink } from "react-router-dom";
import "./NavTab.scss";

// The component for a link inside a navbar with underlined tabs
// 		to => a route that the tab link goes to
//		children => the label used for the link
export const NavTabLink = (props) => {
	console.log(props);
	return <NavLink className="nav-link" to={props.to}>{props.children}</NavLink>;
}

// Looks and works the same way as the link above, but doesn't take a link or automatically show if the page is selected.
// With this, the active class must be decided with a prop rather than link checking
export const NavTabNoLink = (props: any) => {
	console.log(props);
	return <button className={"nav-link" + (props.active ? " active" : "")} onClick={props.onClick}>{props.children}</button>;
}

// The component a navbar with underlined tabs
//		children => the links (NavTabLink) contained on the navbar
export const NavTabBar = (props) => {
	return (
		<nav className="nav nav-underline">
			{props.children}
		</nav>
	)
}

export const NavProgressBar = (props) => {
	return (
		<nav className="nav nav-progress">
			{props.children}
		</nav>
	)
}