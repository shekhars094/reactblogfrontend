import React, { useState, useEffect } from "react";
import { Col, Row, Form, FormGroup, Input, Label, Container } from "reactstrap";
import { Link } from "react-router-dom";

const UpdateBlog = (props) => {
	const [values, setValues] = useState({
		title: "",
		post: "",
		success: false,
		error: "",
	});

	const { title, post, success } = values;

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			[name]: event.target.value,
		});
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		const data = { title, post };

		const userData = JSON.parse(localStorage.getItem("jwt"));
		const postId = props.match.params.postId;
		console.log(postId);

		const response = await fetch(
			`https://reactblogbackend.herokuapp.com/api/v1/user/${userData._id}/post/${postId}`,
			{
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${userData.token}`,
				},
				body: JSON.stringify(data),
			}
		);

		setValues({
			...values,
			title: "",
			post: "",
			success: true,
		});
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-6 offset-3">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}>
						Post Updated Succesfully
						<Link to="/">Go to Blogs</Link>
					</div>
				</div>
			</div>
		);
	};

	return (
		<Container>
			{successMessage()}
			<Form>
				<Row>
					<Col className="col-6 offset-3">
						<FormGroup>
							<Label className="text-center">Title</Label>
							<Input
								type="text"
								value={title}
								onChange={handleChange("title")}></Input>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col className="col-6 offset-3">
						<FormGroup>
							<Label className="text-center">Blog</Label>
							<Input
								type="textarea"
								rows="15"
								value={post}
								onChange={handleChange("post")}></Input>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col className="col-6 offset-3">
						<FormGroup>
							<Input
								type="submit"
								value="Submit"
								className="bg-success"
								onClick={onSubmit}></Input>
						</FormGroup>
					</Col>
				</Row>
			</Form>
		</Container>
	);
};

export default UpdateBlog;
