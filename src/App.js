import React from "react";

import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Signup from "./components/signup/Signup";
import LogIn from "./components/login/Login";
import { API } from "./backend";
import Navigation from "./components/navigation/Navigation";
import Blog from "./components/blog/Blog";
import NewBlog from "./components/newblog/NewBlog";

import "./App.css";
import UpdateBlog from "./components/blog/UpdateBlog";
import MyBlog from "./components/blog/MyBlog";

function App() {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route path="/signin" exact component={LogIn}></Route>
				<Route path="/" exact component={Blog}></Route>
				<Route path="/myblog" exact component={MyBlog}></Route>
				<Route path="/newblog" exact component={NewBlog}></Route>
				<Route path="/signup" exact component={Signup}></Route>
				<Route
					path={`/updateblog/:postId`}
					component={UpdateBlog}></Route>
			</Switch>
		</Router>
	);
}

export default App;
