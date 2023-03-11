import React from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import custom_axios from "../axios/custom_axios";
import { ApiConstants } from "../api/api_constants";
import { useState } from "react";

const SignUp = () => {
	let navigate = useNavigate();
	//let firstName: any = React.useRef();
	const [firstName, setFirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");

	function putfirst(event: any) {
		setFirstName(event.target.value);
	}

	function putlast(event: any) {
		setlastName(event.target.value);
	}
	function putEmail(event: any) {
		setemail(event.target.value);
	}

	function putpassword(event: any) {
		setpassword(event.target.value);
	}
	function putconfirm(event: any) {
		setconfirmPassword(event.target.value);
	}

	const register = async () => {
		if (!firstName || !lastName || !email || !password) {
			toast.info("Please fill all the fields");
			return;
		}
		if (password != confirmPassword) {
			toast.info("password doesn't match!");
			return;
		}
		try {
			const response = await custom_axios.post(
				ApiConstants.USER.SIGN_UP,
				{
					firstName,
					lastName,
					email,
					password,
				}
			);
			toast.success(`Congratulations! ${firstName}. Please Log in.`);
			console.log(response);
			navigate("/login");
		} catch (error: any) {
			if (error.response.status == 400)
				toast.warn(error.response.data.message[0]);
		}
	};

	return (
		<div className="main">
			<div>
				<h3>Create an Account.</h3>
				<div className="container">
					<form>
						<div className="inputFields">
							<label>First Name</label>
							<input
								value={firstName}
								type="text"
								onChange={putfirst}
							/>
						</div>
						<div className="inputFields">
							<label>Last Name</label>
							<input
								value={lastName}
								type="text"
								onChange={putlast}
							/>
						</div>
						<div className="inputFields">
							<label>Email</label>
							<input
								value={email}
								type="email"
								onChange={putEmail}
							/>
						</div>
						<div className="inputFields">
							<label>Paasword</label>
							<input
								value={password}
								type="password"
								onChange={putpassword}
							/>
						</div>
						<div className="inputFields">
							<label>Confirm Paasword</label>
							<input
								value={confirmPassword}
								type="password"
								onChange={putconfirm}
							/>
						</div>
						<div>
							<button
								className="active-btn"
								onClick={register}
								type="button"
							>
								<span>Register Account</span>
							</button>
						</div>
					</form>
					<span>
						Already have an account?
						<a
							onClick={() => {
								navigate("/login");
							}}
						>
							Login!
						</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
