import React from "react";

interface CompeletedTodosProps {
	id: number;
	todo: string;
	dateTime: string;
	deleteTodo: (id: number) => void;
}

const CompletedTodoList = (props: CompeletedTodosProps) => {
	return (
		<li>
			<div>
				<div>
					<div>{props.todo}</div>
					<div>{props.dateTime}</div>
				</div>
				<button onClick={() => props.deleteTodo(props.id)}>
					Delete
				</button>
			</div>
		</li>
	);
};

export default CompletedTodoList;
