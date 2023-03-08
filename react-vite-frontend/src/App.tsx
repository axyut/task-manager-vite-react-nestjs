import { useState } from "react";
import reactLogo from "./assets/react.svg";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ActiveTodos from "./pages/activeTodos";
import Login from "./pages/Login";
import UsersPage from "./pages/UsersPage";
import SignUp from "./pages/SignUp";
import Completed from "./pages/Completed";
import ProtectedRoute from "./protectedRoute";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<ToastContainer
					autoClose={2000}
					position={"top-center"}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					draggable={false}
					pauseOnHover
					theme="dark"
				></ToastContainer>
				<Routes>
					<Route path="/login" element={<Login></Login>}></Route>
					<Route path="/signUp" element={<SignUp></SignUp>}></Route>
					<Route
						path="/active"
						element={<ActiveTodos></ActiveTodos>}
					></Route>
					<Route
						path="/completed"
						element={<Completed></Completed>}
					></Route>
					<Route
						path="/users"
						element={<UsersPage></UsersPage>}
					></Route>

					{/* Default page active todos */}
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<ActiveTodos></ActiveTodos>
							</ProtectedRoute>
						}
					></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
