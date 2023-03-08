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
			<div>
				<div>
					<div>{props.todo}</div>
					<div>{props.dateTime}</div>
				</div>
				<button onClick={() => props.markCompelte(props.id)}>
					Mark Completed
				</button>
				<button onClick={() => props.deleteTodo(props.id)}>
					Delete
				</button>
			</div>
		</li>
	);
};

export default ActiveTodoList;
