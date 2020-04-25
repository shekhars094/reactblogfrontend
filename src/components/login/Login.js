import React, { useState } from "react";

import { Container, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

function LogIn() {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		success: false,
	});

	const { email, password, error, success } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		const logInData = { email, password };
		const response = await fetch(
			`https://reactblogbackend.herokuapp.com/api/v1/login`,
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(logInData),
			}
		);

		const result = await response.json();
		console.log(typeof result);
		localStorage.setItem("jwt", JSON.stringify(result));
		console.log(result);

		setValues({
			...values,
			email: "",
			password: "",
			error: false,
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
						<Link to="/">Go to Blog</Link>
					</div>
				</div>
			</div>
		);
	};

	const LogInForm = () => {
		return (
			<div>
				<Container>
					{successMessage()}
					<Form>
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
			<h1 className="text-center">LogIn</h1>
			{LogInForm()}
		</div>
	);
}

export default LogIn;
