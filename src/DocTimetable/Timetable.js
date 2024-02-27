/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Timetable = ({ ada }) => {
	const navigate = useNavigate();

	let location = useLocation();

	const [selectedOptions, setSelectedOptions] = useState([]);

	const [selectedslots, setselectedslots] = useState([]);

	const [appointments, setAppointment] = useState([]);

	let email = location.state.email;
	let id = location.state.id;

	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	const TimeSlots = [
		"09:00-09:20",
		"09:20-09:40",
		"09:40-10:00",
		"10:00-10:20",
		"10:20-10:40",
		"10:40-11:00",
		"11:00-11:20",
		"11:20-11:40",
		"11:40-12:00",
		"12:00-12:20",
		"12:20-12:40",
		"12:40-13:00",
		"13:00-13:20",
		"13:20-13:40",
		"13:40-14:00",
		"14:00-14:20",
		"14:20-14:40",
		"14:40-15:00",
		"15:00-15:20",
		"15:20-15:40",
		"15:40-16:00",
		"16:00-16:20",
		"16:20-16:40",
		"16:40-17:00",
		"17:00-17:20",
		"17:20-17:40",
		"17:40-18:00",
		"18:00-18:20",
		"18:20-18:40",
		"18:40-19:00",
		"19:00-19:20",
		"19:20-19:40",
		"19:40-20:00",
		"20:00-20:20",
		"20:20-20:40",
		"20:40-21:00"
	];

	const options = days.map((day) => ({
		value: day.toLowerCase(),
		label: day
	}));

	const optionstime = TimeSlots.map((Time) => ({
		value: Time.toLowerCase(),
		label: Time
	}));

	const handleChangedays = (selectedOptions) => {
		setSelectedOptions(selectedOptions);
	};

	const handleChangetime = (selectedslots) => {
		setselectedslots(selectedslots);
	};

	const addapointmentt = (e) => {
		e.preventDefault();
		let slot = [];
		selectedslots.forEach((e) => {
			slot.push(e.value);
		});

		const existingAppointmentIndex = appointments.findIndex((appointment) => appointment.day === selectedOptions.value);

		if (existingAppointmentIndex !== -1) {
			appointments[existingAppointmentIndex].time = slot;
		} else {
			let appointment = {
				day: selectedOptions.value,
				time: slot
			};
			appointments.push(appointment);
		}

		console.log(appointments);
		setAppointment([...appointments]);
	};

	const handlesubmit = (e) => {
		e.preventDefault();
		let newdata = {
			appointments: appointments
		};
		if (email) {
			newdata.email = email;
		} else {
			newdata.id = id;
		}
		updateAppointments(newdata);
	};

	const updateAppointments = (data) => {
		axios
			.put(`https://drmeetbackend.onrender.com/api/doctor/update`, data)
			.then((response) => {
				if (response) {
					if (email) {
						setTimeout(() => {
							let message = response.data ? response.data.message : response.message;
							const notify = () =>
								toast.success(`${message}`, {
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
						}, 1000);
						navigate("/login");
					} else {
						setTimeout(() => {
							let message = response.data ? response.data.message : response.message;
							const notify = () =>
								toast.success(`${message}`, {
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
						}, 3000);
						navigate("/doctorinfo");
					}
				}
			})
			.catch((err) => {
				let message = err.response ? err.response.data.message : err.message;
				const notify = () =>
					toast.warn(`${message}`, {
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
			});
	};

	return (
		<div className="flex flex-col items-center justify-center w-full ">
			<h1 className=" font-bold lg:text-4xl text-sm mb-4 lg:leading-10 leading-9 text-black">
				Select your Availability
			</h1>
			<form
				className="bg-white rounded-lg p-8 shadow-lg shadow-indigo-100"
				style={{
					maxWidth: "500px",
					width: "100%",
					height: "auto",
					maxHeight: "800px"
				}}
			>
				<div className="flex flex-col items-center justify-center w-full space-y-3 ">
					<Select
						placeholder="Select your working days"
						className="w-1/2"
						value={selectedOptions}
						options={options}
						onChange={handleChangedays}
					/>
					<Select
						placeholder="Select your time slots"
						className="w-1/2"
						isMulti
						value={selectedslots}
						options={optionstime}
						onChange={handleChangetime}
					/>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="mt-5 mb-5 bg-indigo-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
						onClick={addapointmentt}
					>
						Add Slots
					</button>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="mt-5 mb-5 bg-indigo-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
						onClick={handlesubmit}
					>
						Finish
					</button>
				</div>
			</form>
		</div>
	);
};

export default Timetable;
