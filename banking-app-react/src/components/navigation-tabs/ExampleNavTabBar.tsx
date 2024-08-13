import { NavTabBar, NavTabLink } from './NavTab';

// Example page for how to implement a standardized NavTabBar as we will want all over the site
// Although you could theoretically put anything inside it, a NavTabBar is meant to hold
// NavTabLink items.
export const ExampleNavTabBar = () => {
	return (
		<div className="container">
			<NavTabBar>
				<NavTabLink to="/test/navtabbar1">Test NavTabBar 1</NavTabLink>
				<NavTabLink to="/test/navtabbar2">Test NavTabBar 2</NavTabLink>
				<NavTabLink to="/test/navtabbar3">Test NavTabBar 3</NavTabLink>
				<NavTabLink to="/test/navtabbar4">Test NavTabBar 4</NavTabLink>
			</NavTabBar>
		</div>
	)
}