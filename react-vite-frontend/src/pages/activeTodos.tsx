import React from "react";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/api_constants";
import custom_axios from "../axios/custom_axios";
import ActiveTodoList from "../components/Activetodolist";
import NavBar from "../components/NavBar";
import { getLoginInfo } from "../utils/LoginInfo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface TodoModel {
	title: string;
	date: string;
	id: number;
}

export default function ActiveTodos() {
	const navigate = useNavigate();
	const [todos, setTodos] = React.useState<TodoModel[]>([]);
	const [title, setTitle] = useState("");

	// get all todos not completed with respect to userid
	const getAllNotCompletedTodos = async () => {
		const userId = getLoginInfo()?.userId;
		if (userId != null) {
			const response = await custom_axios.get(
				ApiConstants.TODO.FIND_NOT_COMPLETED(userId),
				{
					headers: {
						Authorization:
							"Bearer " + localStorage.getItem("token"),
					},
				}
			);
			setTodos(response.data);
		} else {
			toast.info("Sorry you are not authenticated");
			navigate("/");
		}
	};

	const saveTodo = async () => {
		if (title == "") {
			toast.info("Please Provide Title");
			return;
		}
		const userId = getLoginInfo()?.userId;
		if (userId != null) {
			const response = await custom_axios.post(
				ApiConstants.TODO.ADD(userId),
				{
					title: title,
				},
				{
					headers: {
						Authorization:
							"Bearer " + localStorage.getItem("token"),
					},
				}
			);
			getAllNotCompletedTodos();
			setTitle("");
			toast.success("Todo Added Scuessfully!!");
		} else {
			toast.info("Sorry you are not authenticated");
		}
	};

	React.useEffect(() => {
		if (todos.length == 0) getAllNotCompletedTodos();
	}, []);

	return (
		<>
			<NavBar></NavBar>
			<div className="main">
				<div className="container">
					<h1>Your actives</h1>

					<div className="heading">
						{/* <span>Enter a task:</span> */}
						<input
							value={title}
							type="text"
							onChange={(event) => {
								setTitle(event.target.value);
							}}
						/>
						<button className="active-btn" onClick={saveTodo}>
							<span>Add</span>
						</button>
					</div>
					<div>
						<ul>
							{todos.map((todo) => {
								return (
									<ActiveTodoList
										key={todo.id}
										dateTime={todo.date}
										deleteTodo={async () => {
											const response =
												await custom_axios.delete(
													ApiConstants.TODO.DELETE(
														todo.id
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
											getAllNotCompletedTodos();
											toast.success(
												"Todo Deleted Sucessfully!!"
											);
										}}
										markCompelte={async () => {
											const response =
												await custom_axios.patch(
													ApiConstants.TODO.MARK_COMPLETE(
														todo.id
													),
													{},
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
											getAllNotCompletedTodos();
											toast.success(
												"Todo Marked Completed"
											);
										}}
										id={todo.id}
										todo={todo.title}
									></ActiveTodoList>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
