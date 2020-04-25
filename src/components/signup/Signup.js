import React, { useState } from "react";

import { Container, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

function Signup() {
	const [values, setValues] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
		error: "",
		success: false,
	});

	const { name, email, username, password, error, success } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, success: true });
		const data = { name, email, username, password };

		const response = await fetch(`http://localhost:5000/api/v1/users`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();
		setValues({
			...values,
			name: "",
			email: "",
			username: "",
			password: "",
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
						New Accout Created Succesfully Please
						<Link to="/signin">Login Here</Link>
					</div>
				</div>
			</div>
		);
	};

	const SingUpForm = () => {
		return (
			<div>
				<Container>
					{successMessage()}
					<Form>
						<Row>
							<Col className="col-6 offset-3">
								<FormGroup>
									<Label>Name</Label>
									<Input
										type="text"
										onChange={handleChange("name")}
										value={name}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col className="col-6 offset-3">
								<FormGroup>
									<Label>Email</Label>
									<Input
										type="email"
										onChange={handleChange("email")}
										value={email}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col className="col-6 offset-3">
								<FormGroup>
									<Label>Username</Label>
									<Input
										type="text"
										onChange={handleChange("username")}
										value={username}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col className="col-6 offset-3">
								<FormGroup>
									<Label>Password</Label>
									<Input
										className="form-control"
										type="password"
										onChange={handleChange("password")}
										value={password}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col className="col-6 offset-3">
								<FormGroup>
									<Input
										type="submit"
										className="bg-primary"
										onClick={onSubmit}
									/>
								</FormGroup>
							</Col>
						</Row>
					</Form>
				</Container>
			</div>
		);
	};

	return (
		<div className="bg-info">
			<h1 className="text-center">Sign Up</h1>
			{SingUpForm()}
		</div>
	);
}

export default Signup;
