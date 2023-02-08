import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from "../features/user/UserSlice"

function Sidebar() {
	const navigate = useNavigate();
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.user)

	const onLogout = () => {
		dispatch(logout());
		navigate('/login')
	}

	const toggle = () => {
		let sidebar = document.querySelector('nav');
		sidebar.classList.toggle('close');
	}

	return (
		<nav className="sidebar">
			<header>
				<div className="image-text">
					<span className="image">
						<img src={user && user.image} alt="" />
					</span>

					<div className="text logo-text">
						<span className="name">{user && user.name}</span>
						<span className="profession">Web developer</span>
					</div>
				</div>

				<i className='bx bx-chevron-right toggle' onClick={toggle}></i>
			</header>

			<div className="menu-bar">
				<div className="menu">
					<ul className="menu-links">
						<li className="nav-link">
							<Link to="/dashboard">
								<i className='bx bx-home-alt icon' ></i>
								<span className="text nav-text">Dashboard</span>
							</Link>
						</li>

						<li className="nav-link">
							<Link to="/timelogs">
								<i className='bx bx-time-five icon'></i>
								<span className="text nav-text">Time Logs</span>
							</Link>
						</li>
						<li className="nav-link">
							<Link to="/timelogs">
								<i className='bx bx-spreadsheet icon'></i>
								<span className="text nav-text">Today's Schedule</span>
							</Link>
						</li>
					</ul>
				</div>

				<div className="bottom-content">
					<li>
						<Link to="/my-account">
							<i className='bx bx-user icon' ></i>
							<span className="text nav-text">My Account</span>
						</Link>
					</li>
					<li className="logout">
						<a href="#" onClick={onLogout}>
							<i className='bx bx-log-out icon' ></i>
							<span className="text nav-text">Logout</span>
						</a>
					</li>
				</div>
			</div>
		</nav>
	)
}

export default Sidebar;