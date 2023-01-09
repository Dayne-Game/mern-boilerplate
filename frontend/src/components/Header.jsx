import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from "../features/user/UserSlice"

function Header() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.user)

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/login')
	}

	return (
		<div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
			<Link to="/" className='d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none'>
				<span className='fs-4'>Dynamik</span>
			</Link>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<Link to="/login">Login</Link>
				</li>
				<li className="nav-item">
					<Link to="/register">Register</Link>
				</li>
				<li className="nav-item"></li>
				<li className="nav-item"></li>
			</ul>
			{user ? (
				<div className='dropdown'>
					<a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						<strong>Dayne Game</strong>
					</a>
					<ul class="dropdown-menu text-small shadow">
						<li><a className="dropdown-item" onClick={onLogout} href="#">Sign out</a></li>
					</ul>
				</div>
			) : (
				<hr />
			)}
		</div>
	)
}

export default Header;