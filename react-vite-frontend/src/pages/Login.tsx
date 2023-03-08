import React from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import custom_axios from "../axios/custom_axios";
import { ApiConstants } from "../api/api_constants";

const Login = () => {
	let navigate = useNavigate();
	let email: any = React.useRef();
	let password: any = React.useRef();

	const loginApp = async () => {
		if (email.current.value == "" || password.current.value == "") {
			toast.info("Please fill the information");
			return;
		}
		try {
			const response = await custom_axios.post(ApiConstants.LOGIN, {
				email: email.current.value,
				password: password.current.value,
			});
			localStorage.setItem("token", response.data.token);
			dispatchEvent(new Event("storage"));
			toast.info("Login Successfull!");
			navigate("/");
		} catch (error: any) {
			if (error.response.status == 401)
				toast.warn(error.response.data.message);
		}
	};
	return (
		<div>
			<h2>Login page</h2>

			<div>
				<h3>My Account</h3>
				<div>
					<form>
						<label>Email</label>
						<input ref={email} type="email" />
						<label>Paasword</label>
						<input ref={password} type="passowrd" />

						<button onClick={loginApp} type="button">
							Register Account
						</button>
					</form>
					<div>
						Haven't Registered Yet?
						<a
							onClick={() => {
								navigate("/signUp");
							}}
						>
							SignUp!
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
