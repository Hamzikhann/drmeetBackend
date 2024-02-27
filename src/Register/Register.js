/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import DoctorForm from "../DoctorForm";
import PatientForm from "../Patientform";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register({ addnewuser }) {
	const navigate = useNavigate();
	const [Fullname, setFullname] = useState("");
	const [Registerpasswords, setRegisterpasswords] = useState("");
	const [Registeremail, setRegisteremail] = useState("");
	const [select, setselect] = useState("");
	const [Phone, setPhone] = useState("");
	const [patient, setpatient] = useState([]);
	const [doctor, setdoctor] = useState([]);

	const handlePhone = (event) => {
		setPhone(event.target.value);
	};

	const handleFullname = (event) => {
		setFullname(event.target.value);
	};
	const handleRegisterpasswords = (event) => {
		setRegisterpasswords(event.target.value);
	};

	const isValidEmail = (input) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(input);
	};

	const handleRegisteremail = (event) => {
		setRegisteremail(event.target.value);
	};
	const handleselect = (event) => {
		setselect(event.target.value);
	};

	const handlesubmit = (userType) => {
		const isEmail = isValidEmail(Registeremail);
		if (isEmail) {
			addnewuser(Fullname, Registerpasswords, Registeremail, select, Phone, userType);
		} else {
			const notify = () =>
				toast.warn(`Invalid Email address`, {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark"
				});
			notify();
		}
	};
	const addnewpatient = (pname, page, pcity, pbio, pfone, pemail, selectedhistory) => {
		const formatpatient = [...patient];
		let newformatpatient = {
			pname,
			page,
			pcity,
			pbio,
			pfone,
			pemail,
			selectedhistory
		};
		formatpatient.push(newformatpatient);
		setpatient(formatpatient);
		handlesubmit(newformatpatient);
	};
	const addnewdoctor = (name, Speciality, City, Hospital, docemail, docphone, docage, experience, bio) => {
		const formatdoctor = [...doctor];
		let newformatdoctor = {
			name,
			Speciality,
			City,
			Hospital,
			docemail,
			docphone,
			docage,
			experience,
			bio
		};
		formatdoctor.push(newformatdoctor);
		setdoctor(formatdoctor);
		handlesubmit(newformatdoctor);
	};
	return (
		<>
			<div className="flex items-center justify-center ">
				<div className="xl:w-10/12 w-full px-8">
					<div className="xl:px-24">
						<br />
						<h1 className="xl:text-4xl text-3xl text-center  text-blue-400 mb-4 font-extrabold">
							Become Our Free Member!
						</h1>

						<div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
							<div className="w-full lg:w-1/2 px-3">
								<div className="flex items-center">
									<h1 className="text-xl font-medium pr-2 leading-5 text-blue-400">Personal Information</h1>
								</div>
								<p className="mt-4 text-sm leading-5 text-gray-600">
									Information about the section could go here and a brief description of how this might be used.
								</p>
							</div>
							<div className="w-full lg:w-1/2 mt-8 lg:mt-0">
								<div className="space-y-4">
									<div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-4">
										<div className="w-full md:w-1/2">
											<label className="text-md leading-none text-blue-400" id="firstName">
												Full name
											</label>
											<input
												onChange={handleFullname}
												value={Fullname}
												type="name"
												tabindex="0"
												className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
												aria-labelledby="firstName"
												placeholder="Enter Full Name"
											/>
										</div>
										<div className="w-full md:w-1/2">
											<label className="text-md leading-none text-blue-400" id="password">
												Password
											</label>
											<input
												onChange={handleRegisterpasswords}
												value={Registerpasswords}
												type="password"
												tabindex="0"
												className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-pink-900"
												aria-labelledby="password"
												placeholder="Enter your password"
											/>
										</div>
									</div>
									<div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
										<div className="w-full md:w-1/2">
											<label className="text-md leading-none text-blue-400" id="emailAddress">
												Email address
											</label>
											<input
												onChange={handleRegisteremail}
												value={Registeremail}
												type="email"
												tabindex="0"
												className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
												aria-labelledby="emailAddress"
												placeholder="Enter Email "
												required
											/>
										</div>
										<div className="w-full md:w-1/2">
											<label className="text-md leading-none text-blue-400" id="phone">
												Phone number
											</label>
											<input
												onChange={handlePhone}
												value={Phone}
												type="number"
												tabindex="0"
												className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
												aria-labelledby="phone"
												placeholder="123-1234567"
											/>
										</div>
									</div>
									<div className="md:flex items-center mt-8">
										<div className="w-full md:w-1/2">
											<label className="text-md leading-none text-blue-400" id="gender">
												Are U ?
											</label>
											<select
												onChange={handleselect}
												value={select}
												tabindex="0"
												className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
												aria-labelledby="gender"
											>
												<option value="none">none</option>
												<option value="Patient">Patient</option>
												<option value="Doctor">Doctor</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{select === "Doctor" ? <DoctorForm addnewdoctor={addnewdoctor} /> : ""}
			{select === "Patient" ? <PatientForm addnewpatient={addnewpatient} /> : ""}
		</>
	);
}

export default Register;
