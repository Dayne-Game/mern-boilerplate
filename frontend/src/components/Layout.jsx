import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";

const Layout = ({ hideHeaderPaths = [] }) => {
	const location = useLocation();
	
	const hideHeader = hideHeaderPaths.some(path => location.pathname.startsWith(path));

	return (
		<>
			{!hideHeader ? (
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