import React from "react";

interface ActiveTodoListProps {
	id: number;
	todo: string;
	dateTime: string;
	markCompelte: (id: number) => void;
	deleteTodo: (id: number) => void;
}

const ActiveTodoList = (props: ActiveTodoListProps) => {
	return (
		<li>
			<div className="Alists">
				<span
					className="list-item-activeTask"
					onClick={() => props.markCompelte(props.id)}
				>
					✔️
				</span>
				<div className="list-item">
					<div>{props.todo}</div>
					<div style={{ fontSize: "10px" }}>{props.dateTime}</div>
				</div>

				<span
					className="list-item-activeTask"
					onClick={() => props.deleteTodo(props.id)}
				>
					❌
				</span>
			</div>
		</li>
	);
};

export default ActiveTodoList;
