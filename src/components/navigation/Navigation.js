import React, { useState } from "react";

import { Link, withRouter } from "react-router-dom";

const Navigation = (props) => {
	const signOut = () => {
		fetch(`https://reactblogbackend.herokuapp.com/api/v1/signout`, {
			method: "GET",
		});

		localStorage.removeItem("jwt");
		props.history.push("/");
	};

	const showAuth = () => {
		if (typeof window == undefined) {
			return false;
		} else {
			if (localStorage.getItem("jwt")) {
				return JSON.parse(localStorage.getItem("jwt"));
			} else {
				return false;
			}
		}
	};

	return (
		<ul className="nav bg-dark">
			<li className="nav-item">
				<Link className="nav-link text-success" to="/">
					Blog
				</Link>
			</li>
			{showAuth() && (
				<li className="nav-item">
					<Link className="nav-link text-success" to="/myblog">
						My Blog
					</Link>
				</li>
			)}
			{showAuth() && (
				<li className="nav-item">
					<Link className="nav-link text-success" to="/newblog">
						New Blog
					</Link>
				</li>
			)}

			{!showAuth() && (
				<li className="nav-item">
					<Link className="nav-link text-success" to="/signup">
						Sign UP
					</Link>
				</li>
			)}

			{!showAuth() && (
				<li className="nav-item">
					<Link className="nav-link text-success" to="/signin">
						LogIn
					</Link>
				</li>
			)}

			{showAuth() && (
				<li className="nav-item">
					<Link className="nav-link text-success" onClick={signOut}>
						SingOut
					</Link>
				</li>
			)}
		</ul>
	);
};

export default withRouter(Navigation);
