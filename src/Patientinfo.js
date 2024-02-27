import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Patientinfo({ patient, patientAppoint }) {
	const [patientInfo, setPatientInfo] = useState([]);
	const [showAppointments, setShowAppointments] = useState(false);
	const [appointment, setAppointment] = useState([]);

	useEffect(() => {
		let id = sessionStorage.getItem("pid");
		getApatient(id);
	}, []);

	const showMyAppointments = () => {
		setShowAppointments(true);
	};

	const getApatient = (id) => {
		let pid = {
			id
		};
		axios
			.post(`https://drmeetbackend.onrender.com/api/patient/detail`, pid)
			.then((response) => {
				response.data.patient.selectedHistory = JSON.parse(response.data.patient.selectedHistory);
				setPatientInfo(response.data.patient);
				setAppointment(response.data.appointment);
			})
			.catch((err) => {
				const notify = () => toast(`${err.response.data.message}`);
				notify();
			});
	};

	const deleteAppointment = (appointmentId) => {
		let id = {
			appointmentId
		};
		axios
			.post("http://localhost:5002/api/patient/delete/appointment", id)
			.then((response) => {})
			.catch((err) => {
				const notify = () => toast(`${err.response.data.message}`);
				notify();
			});
	};

	const handleCompleteAppointment = (id, index) => {
		const updatedAppointments = [...appointment];
		updatedAppointments.splice(index, 1);
		setAppointment(updatedAppointments);
		deleteAppointment(id);
	};

	return (
		<>
			<ToastContainer />
			<div className="bg-gray-100">
				<div className="mx-auto container py-8">
					<div className="flex justify-center items-center">
						<div className="bg-white p-8 rounded-lg shadow-lg">
							<div className="text-center mb-6">
								<h2 className="text-2xl font-bold text-indigo-700">{patientInfo.patientName}</h2>
								<p className="text-sm text-gray-600">Age: {patientInfo.patientAge} years</p>
								<p className="text-sm text-gray-600">City: {patientInfo.patientCity}</p>
							</div>
							<div className="flex flex-col justify-between">
								<div>
									<h3 className="text-lg font-semibold text-indigo-700">Bio</h3>
									<p className="text-sm text-gray-600">{patientInfo.patientBio}</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-indigo-700">Selected History</h3>
									<p className="text-sm text-gray-600">{patientInfo.selectedHistory}</p>
								</div>
							</div>
							<div className="mt-6">
								<h3 className="text-lg font-semibold text-indigo-700">Contact</h3>
								<p className="text-sm text-gray-600">Phone: {patientInfo.patientPhone}</p>
								<p className="text-sm text-gray-600">Email: {patientInfo.patientEmail}</p>
							</div>
						</div>
					</div>
					<div className="mt-6 text-center">
						<button
							onClick={showMyAppointments}
							className="bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-800"
						>
							My Appointments
						</button>
					</div>

					{showAppointments && (
						<div className="mt-8">
							<h3 className="text-2xl font-semibold text-indigo-700 mb-4">Patient Appointments:</h3>
							{appointment.length !== 0 ? (
								appointment.map((appointment, index) => (
									<div key={index} className="bg-white p-6 rounded-lg shadow-lg mb-4">
										<p className="text-sm">Doctor Name: {appointment.doctor.name}</p>
										<p className="text-sm">Doctor Email: {appointment.doctor.docEmail}</p>
										<p className="text-sm">Doctor Hospital: {appointment.doctor.hospital}</p>
										<p className="text-sm">Doctor Specialty: {appointment.doctor.speciality}</p>
										<p className="text-sm">Day: {appointment.day}</p>
										<p className="text-sm">Time: {appointment.time}</p>
										<p className="text-sm">Location: {appointment.place}</p>
										<button
											onClick={() => handleCompleteAppointment(appointment.id, index)}
											className="bg-red-500 text-white py-1 px-2 rounded-md mt-2"
										>
											<FontAwesomeIcon icon={faCancel} /> Cancel
										</button>
									</div>
								))
							) : (
								<div>No Appointments</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
