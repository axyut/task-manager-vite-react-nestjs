import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import custom_axios from "../axios/custom_axios";
import { ApiConstants } from "../api/api_constants";
import { getLoginInfo } from "../utils/LoginInfo";

const Login = () => {
	let navigate = useNavigate();
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

	const loginApp = async () => {
		if (email == "" || password == "") {
			toast.info("Please fill the information");
			return;
		}
		try {
			const response = await custom_axios.post(ApiConstants.LOGIN, {
				email: email,
				password: password,
			});

			// Setting Up recieved token for the user
			localStorage.setItem("token", response.data.token);
			dispatchEvent(new Event("storage"));

			// Welcoming User by decoding token
			const firstName = getLoginInfo()?.firstName;
			toast.info(`Welcome Back! ${firstName}`);

			navigate("/");
		} catch (error: any) {
			if (error.response.status == 401)
				toast.warn(error.response.data.message);
		}
	};
	return (
		<div className="main">
			<div>
				<h3>My Account</h3>
				<div className="container">
					<form>
						<div className="inputFields">
							<label>Email</label>
							<input
								value={email}
								type="email"
								onChange={(event) => {
									setemail(event.target.value);
								}}
							/>
						</div>
						<div className="inputFields">
							<label>Paasword</label>
							<input
								value={password}
								type="passowrd"
								onChange={(event) => {
									setpassword(event.target.value);
								}}
							/>
						</div>
						<div>
							<button
								className="active-btn"
								onClick={loginApp}
								type="button"
							>
								<span>Login</span>
							</button>
						</div>
					</form>
					<span>
						Haven't Registered Yet?
						<a
							onClick={() => {
								navigate("/signUp");
							}}
						>
							Sign Up!
						</a>
					</span>

					<span>
						<a
							href="https://github.com/axyut/task-manager-vite-react-nestjs"
							target="_blank"
						>
							About?
						</a>
					</span>
					<span>
						<a
							onClick={() => {
								navigate("/api");
							}}
						>
							API?
						</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Login;
