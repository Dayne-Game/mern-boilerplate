import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";

const Layout = ({ hideHeaderPaths = [] }) => {
	const { pathname } = useLocation();

	return (
		<>
			{!hideHeaderPaths.includes(pathname) ? (
				<>
					<Sidebar />
					<section className="home">
						<Outlet />
					</section>
				</>
			) : (
				<Outlet />
			)}
		</>
	)
}

export default Layout;