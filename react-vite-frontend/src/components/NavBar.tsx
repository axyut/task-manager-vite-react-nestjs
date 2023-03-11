import React from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import "../assets/Navbar.css";

const NavBar = () => {
	let navigate = useNavigate();
	const role = getLoginInfo()?.role;
	const firstName = getLoginInfo()?.firstName;
	return (
		<nav className="navbar-whole">
			<div className="text-logo-container">
				<span
					id="nav-span"
					onClick={() => {
						navigate("/");
					}}
				>
					<img className="logo" src={Logo} alt="todo-done-logo" />{" "}
					Task Manager App
				</span>
			</div>
			<div className="link-items-last">
				<a
					className="button-tans"
					onClick={() => {
						localStorage.removeItem("token");
						navigate("/login");
					}}
				>
					<span>{firstName}</span>
					Log Out
				</a>
			</div>
			<div className="link-items">
				<div className="link-items-middle">
					<a onClick={() => navigate("/active")}> Active Tasks</a>
					<a onClick={() => navigate("/completed")}>
						Completed Tasks
					</a>
					<a
						onClick={() =>
							role === "ADMIN"
								? navigate("/users")
								: toast.error(
										"Only Authorized to Admin User!"
								  ) && navigate("/active")
						}
					>
						All Users
					</a>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
