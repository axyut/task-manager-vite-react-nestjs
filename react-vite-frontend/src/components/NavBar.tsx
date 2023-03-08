import React from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import "../assets/Navbar.css";

const NavBar = () => {
	let navigate = useNavigate();
	const role = getLoginInfo()?.role;

	return (
		<nav className="navbar-whole">
			<div className="text-logo-container">
				<span
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
					onClick={() => {
						localStorage.removeItem("token");
						navigate("/login");
					}}
				>
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
