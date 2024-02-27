/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Select from "react-select";

export default function Patientform({ addnewpatient }) {
	const [pcity, setpcity] = useState("");
	const [pname, setpname] = useState("");
	const [pemail, setpemail] = useState("");
	const [pfone, setpfone] = useState("");
	const [page, setpage] = useState("");
	const [pbio, setpbio] = useState("");
	const [history, setHistory] = useState([]);

	const historySlots = [
		"Asthma",
		"Diabetes",
		"High blood pressure",
		"Heart disease",
		"High cholesterol",
		"TB",
		"Hepatitis A, B,C,D",
		"Cancer",
		"Allergy",
		"Medications ",
		"Surgery ",
		"smoker",
		"Alchoalic"
	];
	const historyOptions = historySlots.map((slot) => ({
		value: slot,
		label: slot
	}));

	const [errorMessage, setErrorMessage] = useState("");

	const handlepcitychange = (event) => {
		setpcity(event.target.value);
	};

	const handlepagechange = (event) => {
		let value = parseInt(event.target.value, 10);

		if (value < 1) {
			setErrorMessage("Age must be posetive.");
		} else if (value > 100) {
			setErrorMessage("Age must be less than or equal to 100.");
		} else {
			setErrorMessage("");
			setpage(value);
		}
	};

	const handlepbio = (event) => {
		setpbio(event.target.value);
	};

	const newpatient = () => {
		let hisObj = [];
		history.forEach((e) => {
			hisObj.push(e.value);
		});
		addnewpatient(pname, page, pcity, pbio, pfone, pemail, hisObj);
	};
	const handlesubmit = () => {
		newpatient();
	};

	const handleChangeHistory = (selectedslots) => {
		setHistory(selectedslots);
	};

	return (
		<div>
			<div className="flex items-center justify-center">
				<div className="xl:w-10/12 w-full px-8">
					<div className="xl:px-24">
						<br />
						<h1 className="xl:text-4xl text-3xl text-center text-blue-400 mb-4 font-extrabold">
							Patient Registration Form
						</h1>
						<div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
							<div className="w-full mr-6 lg:w-1/2">
								<div className="flex items-center">
									<h1 className="text-xl font-medium pr-2 leading-5 text-blue-400">Personal Information</h1>
								</div>
								<p className="mt-4 text-sm leading-5 text-gray-600">
									Information about the section could go here and a brief description of how this might be used.
								</p>
								<p className="mt-4 text-xl leading-5 text-gray-600">Please provide below details.</p>

								<div className="mt-10">
									<label className="font-large text-blue-400">Bio</label>
									<textarea
										required
										placeholder="Enter your Bio"
										value={pbio}
										onChange={handlepbio}
										className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
									></textarea>
								</div>
							</div>

							<div className="w-full lg:w-1/2 mt-8 lg:mt-0">
								<div className="space-y-1">
									<div className="md:flex items-center space-y-1 md:space-y-0 md:space-x-1">
										<div className="w-full ">
											<label className=" leading-none text-blue-400" id="phone">
												Age
											</label>
											<input
												placeholder="Age"
												onChange={handlepagechange}
												value={page}
												type="number"
												className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
											/>
											{errorMessage && <p className="text-red-300">{errorMessage}</p>}
										</div>
									</div>
									<div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-4">
										<div className="w-full">
											<label className=" leading-none text-blue-400" id="firstName">
												City
											</label>
											<input
												className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
												type="text"
												value={pcity}
												onChange={handlepcitychange}
												placeholder="City"
											/>
										</div>
									</div>
									<div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-4">
										<div className="w-full ">
											<h1 className=" leading-none text-blue-400">Select History</h1>

											<Select
												placeholder="Select History"
												className="w-full p-4 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-lg font-medium leading-none text-gray-800"
												isMulti
												value={history}
												options={historyOptions}
												onChange={handleChangeHistory}
											/>
											<p className="text-sm text-gray-500">
												Please select all the diseases you have for better treatment.
											</p>
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
