/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Doctor_info({ setAuthHeader, patientAppointment }) {
	const location = useLocation();

	const navigate = useNavigate();

	const [showDoctorAppoint, setDoctorAppoint] = useState(false);
	const [currentLocation, setCurrentLocation] = useState("");
	const [locationName, setName] = useState("");
	const [doctorAppointments, setDoctorAppointments] = useState([]);
	const [select, setSelect] = useState();
	const [selectedTime, setSelectedTime] = useState([]);
	const [doc, setDoc] = useState([]);
	const [renderAppoint, setRenderAppoint] = useState([]);
	const [selectedDay, setSelectedDay] = useState(null);
	const [selectType, setSeletedType] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [showEmergencyModal, setShowEmergencyModal] = useState(false);
	const [emergency, setEmergencyAppointment] = useState([]);
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [token, setToken] = useState("");
	const [emergencySet, setEmergencyActivation] = useState(false);

	let id = sessionStorage.getItem("docid");

	let docid = location.state ? location.state.id : id;

	useEffect(() => {
		let select = sessionStorage.getItem("select");
		setToken(sessionStorage.getItem("token"));
		setSelect(select);
		if (select == 1) {
			setDoctorAppoint(true);
		}

		if (id == docid) {
			getAdoctor(id);
		} else {
			getAdoctor(docid);
		}
	}, []);

	const docAppointments = (id) => {
		const accessToken = sessionStorage.getItem("token"); // Replace with your actual token
		setAuthHeader(accessToken);
		axios
			.post(`https://drmeetbackend.onrender.com/api/doctor/find/${id}`)
			.then((response) => {
				setDoctorAppointments(response.data.data);
			})
			.catch((err) => {
				const notify = () =>
					toast.warn(`${err.response ? err.response.data.message : err.message}`, {
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

	const emergencyAppointment = (id) => {
		const accessToken = sessionStorage.getItem("token"); // Replace with your actual token
		setAuthHeader(accessToken);
		const idd = {
			id
		};
		axios
			.post(`https://drmeetbackend.onrender.com/api/emergency/list`, idd)
			.then((response) => {
				if (response.data.data.length != 0) {
					setEnd(response.data.data[0].emergency.location);
					setEmergencyAppointment(response.data.data);
				} else {
				}
			})
			.catch((err) => {
				const notify = () =>
					toast.warn(`${err.response.data.message}`, {
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
		return 1;
	};

	const getAdoctor = (id) => {
		const doctorid = { doctorid: id };
		const accessToken = sessionStorage.getItem("token"); // Replace with your actual token
		setAuthHeader(accessToken);
		axios
			.post(`https://drmeetbackend.onrender.com/api/doctor/detail`, doctorid)
			.then((response) => {
				setDoc(response.data.doctor);
				let appoint = JSON.parse(response.data.doctor.appointments);
				setRenderAppoint(appoint);
			})
			.catch((err) => {
				const notify = () =>
					toast.warn(`${err.response.data.message}`, {
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

	const onAddAppointment = () => {
		patientAppointment(selectedDay, selectedTime, doc, selectType);
	};
	const onAddinfo = (e) => {
		setSelectedDay(selectedDay);
		setSelectedTime(e);
	};

	const handleDaySelect = (e) => {
		const selected = e.target.value;
		setSelectedDay(selected);
	};

	const showDoctorAppointment = () => {
		docAppointments(id);
		setShowModal(true);
	};

	////////////////////////////////////

	const showEmergencyAppoinrmant = () => {
		emergencyAppointment(id);
		setShowEmergencyModal(true);
	};

	const showPosition = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		const location = `Lat: ${latitude}, Lng: ${longitude}`;
		setCurrentLocation(location);
		const latlng = new window.google.maps.LatLng(latitude, longitude);
		const geocoder = new window.google.maps.Geocoder();

		geocoder.geocode({ location: latlng }, (results, status) => {
			if (status === "OK") {
				if (results[0]) {
					setStart(results[0].formatted_address);
					setName(results[0].formatted_address);
				} else {
					console.error("No results found");
				}
			} else {
				console.error(`Geocoder failed due to: ${status}`);
			}
		});
	};

	const navigateToUpdateAppointment = (id) => {
		navigate("/timetable", { state: { id: id } });
	};

	const activateTheEmergency = (emergencyAppointmentId, emergencyId, flag = 0, index) => {
		const accessToken = sessionStorage.getItem("token");
		setAuthHeader(accessToken);
		if (flag === 1) {
			const updatedEmergency = [...emergency];
			updatedEmergency.splice(index, 1);
			setEmergencyAppointment(updatedEmergency);
		}
		setEmergencyActivation(true);
		const obj = {
			emergencyId: emergencyId,
			emergencyAppointmentId: emergencyAppointmentId,
			doctorId: id,
			flag: flag
		};

		axios
			.post(`http://localhost:5002/api/emergency/update`, obj)
			.then((response) => {
				// 	const notify = () =>
				//   toast.success(`${err.response.data.message}`, {
				//     position: "bottom-right",
				//     autoClose: 5000,
				//     hideProgressBar: false,
				//     closeOnClick: true,
				//     pauseOnHover: true,
				//     draggable: true,
				//     progress: undefined,
				//     theme: "dark",
				//   });
				// notify();
			})
			.catch((err) => {
				const notify = () =>
					toast.warn(`${err.response.data.message}`, {
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
	const deleteAppointment = (appointmentId) => {
		let id = {
			appointmentId
		};
		axios
			.post("https://drmeetbackend.onrender.com/api/patient/delete/appointment", id)
			.then((response) => {})
			.catch((err) => {
				const notify = () => toast(`${err.response.data.message}`);
				notify();
			});
	};

	const handleCompleteAppointment = (id, index) => {
		const updatedAppointments = [...doctorAppointments];
		updatedAppointments.splice(index, 1);
		setDoctorAppointments(updatedAppointments);
		deleteAppointment(id);
	};

	return (
		<>
			<div className="flex flex-row flex-wrap content-stretch justify-between items-baseline bg-">
				<div className="w-1/4 ml-4">
					{token && select == 1 && id == docid && (
						<button
							onClick={() => navigateToUpdateAppointment(id)}
							className="bg-blue-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600"
						>
							Update TimeTable
						</button>
					)}
				</div>
				<div className="w-1/4 ">
					{token && select == 1 && id == docid ? (
						<div>
							<div className="mt-4">
								<button
									onClick={() => showDoctorAppointment()}
									className="bg-blue-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600"
								>
									View Appointments
								</button>
								{showModal && (
									<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
										<div className="modal w-3/4 ">
											<div className="modal-content p-4 bg-white rounded-lg shadow-lg  max-h-screen overflow-y-auto ">
												<span className="modal-close text-3xl cursor-pointer" onClick={() => setShowModal(false)}>
													&times;
												</span>
												<h3 className="text-xl font-semibold mb-4">Your Appointments:</h3>
												{doctorAppointments.length != 0 ? (
													doctorAppointments.map((appointment, index) => (
														<div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
															<h4 className="text-lg font-semibold mb-2">Appointment {index + 1}</h4>
															<p>Day: {appointment.day}</p>
															<p>Time: {appointment.time}</p>
															<p>Location: {appointment.place}</p>
															<div className="mt-2">
																<h4 className="text-lg font-semibold mb-2">Patient Information:</h4>
																<p>Name: {appointment.patient.patientName}</p>
																<p>Email: {appointment.patient.patientEmail}</p>
																<p>Age: {appointment.patient.patientAge}</p>
																<p>History: {JSON.parse(appointment.patient.selectedHistory).join(", ")}</p>
															</div>
															<button
																onClick={() => handleCompleteAppointment(appointment.id, index)}
																className="bg-green-500 text-white py-1 px-2 rounded-md mt-2"
															>
																<FontAwesomeIcon icon={faCheck} /> Mark Completed
															</button>
														</div>
													))
												) : (
													<p>NO APPOINTMENTS</p>
												)}
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					) : (
						""
					)}
				</div>
				<div className="w-1/4">
					{token && select == 1 && id == docid ? (
						<div className="mt-4">
							<button
								onClick={() => showEmergencyAppoinrmant()}
								className="bg-blue-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600"
							>
								View Emergency Appointments
							</button>
							{showEmergencyModal && (
								<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
									<div className="modal w-3/4 ">
										<div className="modal-content p-4 bg-white rounded-lg shadow-lg  max-h-screen overflow-y-auto ">
											<span
												className="modal-close text-3xl cursor-pointer"
												onClick={() => setShowEmergencyModal(false)}
											>
												&times;
											</span>
											<h3 className="text-xl font-semibold mb-4">Your Appointments:</h3>
											{emergency.length != 0 ? (
												emergency.map((emer, index) => (
													<div id="floating-panel">
														<b>Destination: </b>
														<h3 className="text-xl font-semibold mb-4" id="end">
															{emer.emergency.location}
														</h3>
														<h3 className="text-xl font-semibold mb-4">
															<p>Contact Info: {emer.emergency.contactInfo}</p>
														</h3>
														<div>
															<button
																onClick={() => activateTheEmergency(emer.id, emer.emergency.id)}
																className={
																	`bg-transparent hover:bg-blue-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent rounded ` +
																	(emergencySet ? "cursor-not-allowed" : "")
																}
																disabled={emergencySet}
															>
																ACTIVATE
															</button>
															<button
																onClick={() => activateTheEmergency(emer.id, emer.emergency.id, 1, index)}
																className="bg-green-500 text-white py-1 px-2 rounded-md mt-2"
															>
																<FontAwesomeIcon icon={faCheck} /> Mark Completed
															</button>
														</div>
														{emer.active == "A" ? (
															<div key={index} id="map" style={{ height: "40px", width: "60px" }}></div>
														) : (
															""
														)}
													</div>
												))
											) : (
												<p>"NO EMERGENCIES"</p>
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					) : (
						""
					)}
				</div>
			</div>

			<div className="bg-gray-100 rounded-lg shadow-lg p-6 mt-8">
				<div>
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">This is some information about the user.</p>
					</div>
					<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
						<dl className="sm:divide-y sm:divide-gray-200">
							<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Full name</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doc.name}</dd>
							</div>
							<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Specialiaty</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doc.speciality}</dd>
							</div>
							<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Email Address</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doc.docEmail}</dd>
							</div>
							<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Contact No#</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doc.doctorPhone}</dd>
							</div>
							<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Age</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doc.doctorAge}</dd>
							</div>
							<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">City</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doc.city}</dd>
							</div>
							<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Hospital</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doc.hospital}</dd>
							</div>
							<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Experience</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doc.experience}</dd>
							</div>
							<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Bio</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doc.doctorBio}</dd>
							</div>
						</dl>
					</div>
				</div>
				<div className="mt-6">
					<dt className="text-sm font-medium text-gray-900">Days Available</dt>
					<dd className="mt-1">
						<select onChange={handleDaySelect} className="block w-full p-2 border border-gray-300 rounded-lg">
							<option value="">Select a day</option>
							{renderAppoint.map((appointment) => (
								<option key={appointment.day} value={appointment.day}>
									{appointment.day}
								</option>
							))}
						</select>
					</dd>
				</div>
				{selectedDay && (
					<div className="mt-4">
						<h4 className="text-lg font-semibold mb-2">Appointment Timings for {selectedDay}:</h4>
						<ul>
							{JSON.parse(doc.appointments)
								.find((appointment) => appointment.day == selectedDay)
								.time.map((time, index) => (
									<li
										key={index}
										value={time}
										onClick={(e) => onAddinfo(time)}
										className="cursor-pointer text-blue-400 hover:underline"
									>
										{time}
									</li>
								))}
						</ul>
					</div>
				)}
				<div className="mt-6">
					<dt className="text-sm font-medium text-gray-900">Appointment Type</dt>
					<dd className="mt-1">
						<select
							onChange={(e) => {
								setSeletedType(e.target.value);
							}}
							className="block w-full p-2 border border-gray-300 rounded-lg"
						>
							<option value="" disable>
								Select an option
							</option>
							<option value="Hospital">Hospital</option>
							<option value="Home">Home</option>
						</select>
					</dd>
				</div>

				{select == 2 && (
					<button
						onClick={onAddAppointment}
						className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full mt-8 shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
					>
						Add Appointment
					</button>
				)}
			</div>
		</>
	);
}
