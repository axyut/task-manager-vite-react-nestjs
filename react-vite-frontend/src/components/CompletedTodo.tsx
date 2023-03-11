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
			<div className="Alists">
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

export default CompletedTodoList;
