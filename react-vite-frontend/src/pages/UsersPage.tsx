import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/api_constants";
import custom_axios from "../axios/custom_axios";
import NavBar from "../components/NavBar";
import { getLoginInfo } from "../utils/LoginInfo";

interface UserModel {
	firstName: string;
	lastName: string;
	email: string;
	id: number;
	role: string;
}

const UsersPage = () => {
	const navigate = useNavigate();
	const [users, setUsers] = React.useState<UserModel[]>([]);

	const getAllUsers = async () => {
		const role = getLoginInfo()?.role;
		if (role != null && role == "ADMIN") {
			const response = await custom_axios.get(
				ApiConstants.USER.FIND_ALL,
				{
					headers: {
						Authorization:
							"Bearer " + localStorage.getItem("token"),
					},
				}
			);
			setUsers(response.data);
		} else {
			toast.info("Forbidden Resource");
			navigate("/");
		}
	};

	React.useEffect(() => {
		if (users.length == 0) getAllUsers();
	}, []);

	return (
		<div>
			<NavBar></NavBar>
			<div className="main">
				<div className="container">
					<div>
						<table>
							<thead>
								<tr>
									<th scope="col">Full Name</th>

									<th scope="col">Email</th>
									<th scope="col">Active</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => {
									return (
										<tr key={user.id}>
											<td>
												{user.firstName}_{user.lastName}
											</td>

											<td>{user.email}</td>
											<td>
												<button
													hidden={
														user.role == "ADMIN"
															? true
															: false
													}
													onClick={async () => {
														const response =
															await custom_axios.delete(
																ApiConstants.USER.DELETE(
																	user.id
																),
																{
																	headers: {
																		Authorization:
																			"Bearer " +
																			localStorage.getItem(
																				"token"
																			),
																	},
																}
															);
														getAllUsers();
														toast.success(
															"User Deleted Sucessfully!!"
														);
													}}
												>
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsersPage;
