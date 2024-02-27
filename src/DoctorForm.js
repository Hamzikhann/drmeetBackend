/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AutoComplete } from "antd";

export default function DoctorForm({ addnewdoctor }) {
	const DrCityOptions = [
		{ value: "Lahore" },
		{ value: "Islamabad" },
		{ value: "Multan" },
		{ value: "Karachi" },
		{ value: "Faisalabad" }
	];

	useEffect(() => {}, []);

	let [Name, setName] = useState("");
	let [City, setCity] = useState("");
	let [Speciality, setSpeciality] = useState("");
	let [Hospital, setHospital] = useState("");
	let [docage, setdocage] = useState("");
	let [experience, setexperience] = useState("");
	let [docphone, setdocphone] = useState("");
	let [docemail, setdocemail] = useState("");
	let [bio, setbio] = useState("");
	const [Image, setImage] = useState("");
	const [ageErrorMessage, setAgeErrorMessage] = useState("");
	const [expErrorMessage, setExpErrorMessage] = useState("");

	const handlebiochange = (event) => {
		setbio(event.target.value);
	};
	const handlehospchange = (event) => {
		setHospital(event.target.value);
	};

	const handlecityChange = (event) => {
		setCity(event.target.value);
	};

	const handlespecialitychange = (event) => {
		setSpeciality(event.target.value);
	};

	const handledocagechange = (event) => {
		let value = parseInt(event.target.value, 10);

		if (value < 1) {
			setAgeErrorMessage("Experience must be posetive.");
		} else if (value >= 101) {
			setAgeErrorMessage("Experience must be less than or equal to 100");
		} else {
			setAgeErrorMessage("");
			setdocage(event.target.value);
		}
	};
	const handleexperience = (event) => {
		let value = parseInt(event.target.value, 10);

		if (value < 1) {
			setExpErrorMessage("Experience must be posetive.");
		} else if (value >= 51) {
			setExpErrorMessage("Experience must be less than or equal to 50.");
		} else {
			setExpErrorMessage("");
			setexperience(value);
		}
	};

	const onchangeimage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};

	const handlesubmit = () => {
		adddoctor();
	};

	const adddoctor = () => {
		addnewdoctor(Name, Speciality, City, Hospital, docemail, docphone, docage, experience, bio);
	};
	return (
		<div>
			<div className="flex items-center justify-center">
				<div className="xl:w-10/12 w-full px-8">
					<div className="xl:px-24">
						<br />
						<h1 className="xl:text-4xl text-3xl text-center text-blue-400 mb-4 font-extrabold">
							Doctor Registration Form
						</h1>

						<div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
							<div className="w-full mr-6 lg:w-1/2">
								<div className="flex items-center">
									<h1 className="text-xl font-medium pr-2 leading-5 text-blue-400">Personal Information</h1>
								</div>
								<p className="mt-4 text-sm leading-5 text-gray-600">
									Information about the section could go here and a brief description of how this might be used.
								</p>
								<p className="mt-4 text-xl leading-5 text-blue-400">Please provide below details.</p>

								<div className="mt-5">
									<label className="font-large text-blue-400">Bio</label>
									<textarea
										required
										onChange={handlebiochange}
										value={bio}
										placeholder="Enter your Bio"
										className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
									></textarea>
								</div>
							</div>

							<div className="w-full lg:w-1/2 mt-8 lg:mt-0">
								<div className="space-y-4">
									<div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
										<div className="w-full ">
											<label className="text-sm leading-none text-blue-400" id="phone">
												Experience
											</label>
											<input
												className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
												type="number"
												placeholder="Your work Experience in Years"
												onChange={handleexperience}
												value={experience}
											/>
											{expErrorMessage && <p className="text-red-300">{expErrorMessage}</p>}
										</div>
									</div>

									<div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-4">
										<div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-4">
											<div className="w-full ">
												<label className="text-sm leading-none text-blue-400" htmlFor="city">
													City
												</label>
												<select
													onChange={handlecityChange}
													value={City}
													type="text"
													placeholder="City"
													className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
												>
													<option className="px-4 py-2 hover:bg-gray-100">Select</option>
													<option className="px-4 py-2 hover:bg-gray-100">Lahore</option>
													<option className="px-4 py-2 hover:bg-gray-100">Islamabad</option>
													<option className="px-4 py-2 hover:bg-gray-100">Karachi</option>
													<option className="px-4 py-2 hover:bg-gray-100">Multan</option>
													<option className="px-4 py-2 hover:bg-gray-100">Faisalabad</option>
													<option className="px-4 py-2 hover:bg-gray-100">Peshawar</option>
													<option className="px-4 py-2 hover:bg-gray-100">Quetta</option>
													<option className="px-4 py-2 hover:bg-gray-100">Rawalpindi</option>
												</select>
											</div>
										</div>
										<div className="w-full md:w-1/2">
											<label className="text-sm leading-none text-blue-400" id="phone">
												Age
											</label>
											<input
												className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
												type="number"
												placeholder="Enter your Age Years"
												onChange={handledocagechange}
												value={docage}
											/>
											{ageErrorMessage && <p className="text-red-300">{ageErrorMessage}</p>}
										</div>
									</div>
									<div className="w-full">
										<label className="text-sm leading-none text-blue-400" id="firstName">
											Hospital
										</label>
										<input
											className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
											onChange={handlehospchange}
											value={Hospital}
											placeholder="Hospital"
										/>
									</div>
									<div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-4">
										<div className="w-full ">
											<label className="text-sm leading-none text-blue-400" id="emailAddress">
												Speciality
											</label>
											<select
												onChange={handlespecialitychange}
												value={Speciality}
												type="text"
												placeholder="Speciality"
												className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
												aria-labelledby="emailAddress"
												required
											>
												<option className="px-4 py-2 hover:bg-gray-100">Select</option>
												<option className="px-4 py-2 hover:bg-gray-100">Anaesthesiologists</option>
												<option className="px-4 py-2 hover:bg-gray-100">Family medicine</option>
												<option className="px-4 py-2 hover:bg-gray-100">Internal medicine</option>
												<option className="px-4 py-2 hover:bg-gray-100">Gastroenterologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Cardiologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Critical care medicine specialist</option>{" "}
												<option className="px-4 py-2 hover:bg-gray-100">Dermatologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Endocrinologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Emergency medicine</option>{" "}
												<option className="px-4 py-2 hover:bg-gray-100">Haematologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Infectious disease specialist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Nephrologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Neurologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Oncologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Obstetrics and Gynaecology</option>
												<option className="px-4 py-2 hover:bg-gray-100">Ophthalmologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Osteopaths</option>
												<option className="px-4 py-2 hover:bg-gray-100">Otolaryngologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Pathologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Paediatrician</option>
												<option className="px-4 py-2 hover:bg-gray-100">Paediatric surgeon</option>
												<option className="px-4 py-2 hover:bg-gray-100">Physiotherapist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Psychiatrist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Plastic surgeon</option>
												<option className="px-4 py-2 hover:bg-gray-100">Podiatrist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Pulmonologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">
													Radiologist ( Diagnostic stic radiologist, interventional radiologist)
												</option>
												<option className="px-4 py-2 hover:bg-gray-100">Rheumatologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">General surgeon</option>
												<option className="px-4 py-2 hover:bg-gray-100">Urologist</option>
												<option className="px-4 py-2 hover:bg-gray-100">Cardio thoracic surgeon</option>
												<option className="px-4 py-2 hover:bg-gray-100">Neurosurgeon</option>
												<option className="px-4 py-2 hover:bg-gray-100">Orthopaedic surgeon</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center mt-3">
				<button
					className="ml-0 mt-4 md:ml-4 md:mt-0 bg-blue-400 text-white px-4 py-2 rounded-md"
					onClick={handlesubmit}
				>
					Register
				</button>
				<br />
			</div>
		</div>
	);
}
