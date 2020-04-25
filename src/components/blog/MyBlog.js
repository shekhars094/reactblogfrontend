import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyBlog = () => {
	const [postValue, setPostValue] = useState({ data: [] });

	const userData = JSON.parse(localStorage.getItem("jwt"));

	const getPost = async () => {
		if (userData) {
			const response = await fetch(
				`https://reactblogbackend.herokuapp.com/api/v1/user/${userData._id}/posts`,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${userData.token}`,
					},
				}
			);
			const res = await response.json();
			setPostValue({ data: res.data });
		} else {
			return;
		}
	};

	const deletePost = async (postId) => {
		const userData = JSON.parse(localStorage.getItem("jwt"));
		const response = await fetch(
			`https://reactblogbackend.herokuapp.com/api/v1/user/${userData._id}/post/${postId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${userData.token}`,
				},
			}
		);
	};

	useEffect(() => {
		getPost();
	}, [postValue]);

	return (
		<div className="container">
			<h3 className="text-center bg-success p-3">My Blogs</h3>

			{postValue.data.map((post) => {
				return (
					<div className="row bg-info m-5" key={post._id}>
						<div className="col-6 offset-3">
							<h4 className="text-center bg-warning p-3">
								{post.title}
							</h4>
							<p className="bg-dark p-5 text-white">
								{post.post}
							</p>
							<button
								className="btn btn-danger mb-3"
								onClick={() => deletePost(post._id)}>
								DELETE POST
							</button>
							<Link
								to={`/updateblog/${post._id}`}
								className="btn btn-success mb-3 ml-3">
								UPDATE POST
							</Link>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default MyBlog;
