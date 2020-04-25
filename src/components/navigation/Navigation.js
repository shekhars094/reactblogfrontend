import React, { useState } from "react";

import { Link } from "react-router-dom";

const Navigation = ({ history }) => {
	const signOut = () => {
		fetch(`http://reactblogbackend.herokuapp.com/api/v1/signout`, {
			method: "GET",
		});

		localStorage.removeItem("jwt");
	};

	// const showAuth = () => {
	// 	if (typeof window == undefined) {
	// 		return false;
	// 	} else {
	// 		if (localStorage.getItem("jwt")) {
	// 			return JSON.parse(localStorage.getItem("jwt"));
	// 		} else {
	// 			return false;
	// 		}
	// 	}
	// };

	return (
		<ul className="nav bg-dark mb-4">
			<li className="nav-item">
				<Link className="nav-link text-success" to="/">
					Blog
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link text-success" to="/myblog">
					My Blog
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link text-success" to="/newblog">
					New Blog
				</Link>
			</li>

			<li className="nav-item">
				<Link className="nav-link text-success" to="/signup">
					Sign UP
				</Link>
			</li>

			<li className="nav-item">
				<Link className="nav-link text-success" to="/signin">
					LogIn
				</Link>
			</li>

			<li className="nav-item">
				<Link
					className="nav-link text-success"
					onClick={() => {
						signOut(() => {
							history.push("/");
						});
					}}>
					SingOut
				</Link>
			</li>
		</ul>
	);
};

export default Navigation;
