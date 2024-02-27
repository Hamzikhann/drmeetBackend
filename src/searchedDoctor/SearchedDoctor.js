/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AutoComplete } from "antd";

export default function SearchedDoctor({ oncardclick, match }) {
	const location = useLocation();
	const ids = location.state.id;
	const [message, setMessage] = useState("");
	// console.log(ids);
	const [doctor, setDoctor] = useState([]);

	const [selectedspeciality, setselectedspeciality] = useState("");
	const [selectedcity, setselectedcity] = useState("");
	const options = [
		{ value: "Anaesthesiologists" },
		{ value: "Family medicine" },
		{ value: "Internal medicine" },
		{ value: "Gastroenterologist" },
		{ value: "Cardiologist" },
		{ value: "Critical care medicine specialist" },
		{ value: "Dermatologist" },
		{ value: "Endocrinologist" },
		{ value: "Emergency medicine" },
		{ value: "Haematologist" },
		{ value: "Infectious disease specialist" },
		{ value: "Nephrologist" },
		{ value: "Neurologist" },
		{ value: "Oncologist" },
		{ value: "Obstetrics and Gynaecology" },
		{ value: "Ophthalmologist" },
		{ value: "Osteopaths" },
		{ value: "Otolaryngologist" },
		{ value: "Pathologist" },
		{ value: "Paediatrician" },
		{ value: "Paediatric surgeon" },
		{ value: "Physiotherapist" },
		{ value: "Psychiatrist" },
		{ value: "Plastic surgeon" },
		{ value: "Podiatrist" },
		{ value: "Pulmonologist" },
		{
			value: "Radiologist (Diagnostic stic radiologist, interventional radiologist)"
		},
		{ value: "Rheumatologist" },
		{ value: "General surgeon" },
		{ value: "Urologist" },
		{ value: "Cardio thoracic surgeon" },
		{ value: "Neurosurgeon" },
		{ value: "Orthopaedic surgeon" }
	];

	const DrCityOptions = [
		{ value: "Lahore" },
		{ value: "Islamabad" },
		{ value: "Multan" },
		{ value: "Karachi" },
		{ value: "Faisalabad" }
	];
	const handleSpecialtySelect = (value) => {
		setselectedspeciality(value);
	};

	const handlecityChange = (value) => {
		setselectedcity(value);
	};

	const search = () => {
		setselectedcity("");
		setselectedspeciality("");
		match(selectedcity, selectedspeciality);
	};

	useEffect(() => {
		getSearchedDoctors(ids);
	}, [selectedcity || selectedspeciality]);

	const getSearchedDoctors = (ids) => {
		const doctorId = {
			ids: ids
		};
		axios
			.post("https://drmeetbackend.onrender.com/api/doctor/list", doctorId)
			.then((response) => {
				console.log(response);
				setMessage(response.data.message);
				setDoctor(response.data.data);
			})
			.catch((err) => {
				const notify = () => toast(`${err.response.data.message}`);
				notify();

				console.log(err);
			});
	};

	return (
		<>
			<ToastContainer />
			<div>
				<div>
					<div className="flex flex-col mt-[2rem] mb-[2rem] md:flex-row items-center justify-center  ">
						<div>
							<AutoComplete
								style={{ width: 350, height: 50 }}
								options={options}
								onChange={handleSpecialtySelect}
								value={selectedspeciality}
								placeholder="Search Speciality"
								filterOption={(inputValue, option) =>
									option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
								}
							/>
						</div>

						<div className="p-2">
							<AutoComplete
								style={{ width: 350, height: 50 }}
								options={DrCityOptions}
								onChange={handlecityChange}
								value={selectedcity}
								placeholder="Search City"
								filterOption={(inputValue, option) =>
									option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
								}
							/>
						</div>

						<button className="ml-0 mt-4 md:ml-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={search}>
							Search
						</button>
					</div>
					<hr className="sm:w-1/2 md:w-1/2 lg:w-[60rem] h-0.5 mx-auto  bg-gray-300 border-1 rounded md:my-5 " />
				</div>
			</div>
			<h1 className="xl:text-2xl text-3xl text-center  text-blue-400 mb-4 font-extrabold">{message}!</h1>
			<div className="flex flex-wrap justify-center space-x-5 mt-20">
				{doctor.map((f) => (
					<button
						className="mb-10"
						onClick={() => {
							oncardclick(f.id);
						}}
						key={f.did}
					>
						<div className="bg-white dark:bg-gray-800 ml-9 rounded w-64 overflow-hidden">
							<div
								className="bg-gray-100 dark:bg-gray-800 py-4 border-gray-300 dark:border-gray-200 border-b px-4 rounded-t"
								style={{ boxShadow: "0px 0px 8px 0px #0074D9" }}
							>
								<div className="flex flex-col items-center">
									<p className="mb-1 text-lg font-bold text-gray-900 dark:text-gray-100">{f.name}</p>
									<p className="mb-2 text-sm text-gray-700 dark:text-gray-400">{f.doctorEmail}</p>
								</div>
							</div>
							<div className="px-4 py-4">
								<div className="border-b pb-2">
									<p className="mb-1 text-sm text-gray-700 text-lg font-bold dark:text-gray-400">Speciality</p>
									<p className="text-sm text-gray-700 dark:text-gray-400">{f.speciality}</p>
								</div>
								<div className="border-b pb-2">
									<p className="mb-1 text-sm text-gray-700 text-lg font-bold dark:text-gray-400">Hospital</p>
									<p className="text-sm text-gray-700 dark:text-gray-400">{f.hospital}</p>
								</div>
								<div className="border-b pb-2">
									<p className="mb-1 text-sm text-gray-700 dark:text-gray-400 text-lg font-bold">City</p>
									<p className="text-sm text-gray-700 dark:text-gray-400">{f.city}</p>
								</div>
							</div>
						</div>
					</button>
				))}
			</div>
		</>
	);
}
