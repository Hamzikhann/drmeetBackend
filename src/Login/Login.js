import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import "./Login.css";
export default function Login({ login }) {
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");

	const handleEmailchange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordchange = (event) => {
		setPassword(event.target.value);
	};

	const handlesubmit = () => {
		login(Email, Password);
	};

	return (
		<div className="">
			<main className="w-full h-[25rem] flex  flex-col items-center justify-center ">
				<div className="max-w-sm w-full text-gray-600 ">
					<div className="text-center">
						<div className=" space-y-2">
							<h3 className="text-blue-400 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
							<Link to={"/register"}>
								<p className="font-medium text-blue-400 hover:text-indigo-500">Don't have an account? Sign up</p>
							</Link>
						</div>
					</div>
					<form className="mt-8 space-y-5">
						<Form.Item
							label="UserEmail"
							name="userEmail"
							rules={[{ required: true, message: "Please input your username!" }]}
						>
							<Input value={Email} onChange={handleEmailchange} />
						</Form.Item>
						<Form.Item
							label="Password"
							name="password"
							rules={[{ required: true, message: "Please input your password!" }]}
						>
							<Input.Password value={Password} onChange={handlePasswordchange} />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button
								type="primary"
								htmlType="button"
								onClick={handlesubmit}
								className="ml-0 mt-4 md:ml-4 md:mt-0 bg-blue-400 text-white px-4  rounded-md"
							>
								Submit
							</Button>
						</Form.Item>
					</form>
				</div>
			</main>
		</div>
	);
}
