import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/api_constants";
import custom_axios from "../axios/custom_axios";
import CompletedTodoList from "../components/CompletedTodo";
import NavBar from "../components/NavBar";
import { getLoginInfo } from "../utils/LoginInfo";

interface TodoModel {
	title: string;
	date: string;
	id: number;
}

const Completed = () => {
	const navigate = useNavigate();
	const [todos, setTodos] = React.useState<TodoModel[]>([]);

	const getAllCompletedTodos = async () => {
		const userId = getLoginInfo()?.userId;
		if (userId != null) {
			const response = await custom_axios.get(
				ApiConstants.TODO.FIND_COMPLETED(userId),
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

	React.useEffect(() => {
		if (todos.length == 0) getAllCompletedTodos();
	}, []);

	return (
		<div>
			<NavBar></NavBar>
			<div className="main">
				<div className="container">
					<h1>Completed page</h1>
					<div>
						<ul>
							{todos.map((todo) => {
								return (
									<CompletedTodoList
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
											getAllCompletedTodos();
											toast.success(
												"Todo Deleted Sucessfully!!"
											);
										}}
										id={todo.id}
										todo={todo.title}
									></CompletedTodoList>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Completed;
