import React from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import custom_axios from "../axios/custom_axios";
import { ApiConstants } from "../api/api_constants";

const SignUp = () => {
	let navigate = useNavigate();
	let firstName: any = React.useRef();
	let lastName: any = React.useRef();
	let password: any = React.useRef();
	let confirmPassword: any = React.useRef();
	let email: any = React.useRef();

	const register = async () => {
		if (password.current.value != confirmPassword.current.value) {
			toast.info("password doesn't match!");
			return;
		}
		console.log(firstName, lastName, email, password);

		const response = await custom_axios.post(ApiConstants.USER.SIGN_UP, {
			firstName,
			lastName,
			email,
			password,
		});
		toast.success(response.data);
		navigate("/login");
	};

	return (
		<div>
			<h2>Sign up page</h2>

			<div>
				<h3>Create an Account.</h3>
				<div>
					<form action="" method="post">
						<label>First Name</label>
						<input ref={firstName} type="text" />
						<label>Last Name</label>
						<input ref={lastName} type="text" />
						<label>Email</label>
						<input ref={email} type="email" />
						<label>Paasword</label>
						<input ref={password} type="passowrd" />
						<label>Confirm Paasword</label>
						<input ref={confirmPassword} type="password" />

						<button onClick={register} type="button">
							Register Account
						</button>
					</form>
					<div>
						Already have an account?
						<a
							onClick={() => {
								navigate("/login");
							}}
						>
							Login!
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
