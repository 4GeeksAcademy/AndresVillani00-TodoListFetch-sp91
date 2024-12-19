import React from "react";
import { FetchTodoList } from "./FetchTodoList.jsx";

//create your first component
const Home = () => {
	return (
		<div className="Container">
            <h1 className="text-center">Todo List con Fetch</h1>
			<FetchTodoList/>
		</div>
	);
};

export default Home;
