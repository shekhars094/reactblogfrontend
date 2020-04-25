import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyBlog = () => {
	const [postValue, setPostValue] = useState({ data: [] });

	const getPost = async () => {
		const response = await fetch(`http://localhost:5000/api/v1/posts`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		const res = await response.json();
		console.log(res);
		setPostValue({ data: res.data });
	};

	useEffect(() => {
		getPost();
	}, [postValue]);

	return (
		<div className="container">
			<h3 className="text-center bg-success p-3">Blogs</h3>

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
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default MyBlog;
