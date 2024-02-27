/* eslint-disable react/jsx-pascal-case */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import "./App.css";
import "./index.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import DoctorProfile from "./DoctorProfile";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Doctor_info from "./Doctor_info";
import Timetable from "./DocTimetable/Timetable";
import Patientinfo from "./Patientinfo";
import { getuser } from "./apis/backendApis";
import Contact from "./Contact/Contact";
import SearchedDoctor from "./searchedDoctor/SearchedDoctor";
import Emergency from "./emergency/Emergency";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const navigate = useNavigate();

	const [patient, setpatient] = useState([]);

	const [patientAppoint, setPatientAppoint] = useState([]);

	const [filterdoctors, setfilterdoctors] = useState([]);

	const [doctor, setdoctor] = useState([]);

	const [user, setuser] = useState([]);

	useEffect(() => {
		getUser();
		getdoc();
		getpat();
	}, []);

	const patientAppointment = (day, time, doc, type) => {
		let id = sessionStorage.getItem("pid");

		let appoint = {
			doctorId: doc.id,
			day: day,
			slots: time,
			patientId: id,
			place: type
		};
		patientAppoint.push(appoint);
		setPatientAppoint(patientAppoint);
		createPatientAppointment(appoint);
	};

	const login = (email, password) => {
		let log = {
			Registeremail: email,
			Registerpasswords: password
		};

		auth(log);
	};

	const addnewuser = (Fullname, Registerpasswords, Registeremail, select, phone, userType) => {
		if (user) {
			const newuserformat = [...user];
			let newuser = {
				Fullname,
				Registerpasswords,
				select,
				phone,
				Registeremail
			};

			newuserformat.push(newuser);
			setuser(newuserformat);

			if (select == "Doctor") {
				const formatdoctor = [...doctor];
				let newformatdoctor = {
					name: userType.name,
					Speciality: userType.Speciality,
					City: userType.City,
					Hospital: userType.Hospital,
					docemail: userType.docemail,
					docphone: userType.docphone,
					docage: userType.docage,
					experience: userType.experience,
					bio: userType.bio
				};

				formatdoctor.push(newformatdoctor);
				newuser.doctor = newformatdoctor;
				setdoctor(formatdoctor);
			} else {
				const formatpatient = [...patient];
				let newformatpatient = {
					pname: userType.pname,
					page: userType.page,
					pcity: userType.pcity,
					pbio: userType.pbio,
					pfone: userType.pfone,
					pemail: userType.pemail,
					selectedhistory: userType.selectedhistory
				};

				formatpatient.push(newformatpatient);
				newuser.patient = newformatpatient;
				setpatient(formatpatient);
			}
			postuser(newuser);
		} else {
			const notify = () =>
				toast.warn(`Some Error`, {
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

	const navigateToForm = (newUser) => {
		if (newUser.select == "Doctor") {
			navigate("/Timetable", { state: { email: newUser.registerEmail } });
		} else if (newUser.select == "Patient") {
			navigate("/Login");
		}
	};

	const match = (city, speciality) => {
		let doctors = doctor.filter((doctor) => {
			return doctor.city === city || doctor.speciality === speciality;
		});
		let ids = [];
		doctors.forEach((e) => {
			ids.push(e.id);
		});
		setfilterdoctors(doctors);
		navigate("/searchedDoctor", { state: { id: ids } });
	};

	const oncardclick = (id) => {
		navigate("/Doctor_info", { state: { id, location: "oncardclick" } });
	};

	// API Started below
	const setAuthHeader = (token) => {
		axios.defaults.headers.common["access-token"] = token;
	};

	const auth = (data) => {
		axios
			.post("http://localhost:5002/api/auth/login", data)
			.then((response) => {
				sessionStorage.removeItem("pid");
				sessionStorage.removeItem("docid");
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("select");

				if (response.data.select == 1) {
					sessionStorage.setItem("select", response.data.select);
					sessionStorage.setItem("docid", response.data.doctor.id);
					sessionStorage.setItem("token", response.data.accessToken);
					let id = response.data.doctor.id;
					setTimeout(() => {
						const notify = () =>
							toast.success(`${response.data.message}`, {
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

					navigate("/Doctor_info", { state: { id, location: "app auth" } });
				} else if (response.data.select == 2) {
					sessionStorage.setItem("select", response.data.select);
					sessionStorage.setItem("pid", response.data.patient.id);
					sessionStorage.setItem("token", response.data.accessToken);

					let id = response.data.patient.id;
					setTimeout(() => {
						const notify = () =>
							toast.success(`${response.data.message}`, {
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

					navigate("/Patientinfo", { state: { id } });
				}
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

	const createPatientAppointment = async (data) => {
		const accessToken = sessionStorage.getItem("token"); // Replace with your actual token
		setAuthHeader(accessToken);

		await axios
			.post("http://localhost:5002/api/patient/create/appointment", data)
			.then((response) => {
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

	const postuser = (data) => {
		axios
			.post("http://localhost:5002/api/users/post/user", data)
			.then((response) => {
				if (response) {
					navigateToForm(response.data.newuser);
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

	const getUser = async () => {
		try {
			const response = await getuser();
			setuser(response.data);
		} catch (err) {
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
		}
	};

	const getdoc = () => {
		axios
			.get("http://localhost:5002/api/doctor/")
			.then((response) => {
				setdoctor(response.data);
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

	const getpat = () => {
		axios
			.get("http://localhost:5002/api/patient")
			.then((response) => {
				setpatient(response.data.patient);
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
		<div>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>

			<Navbar />
			<Routes>
				<Route path="/" element={<Home match={match} aad={doctor} oncardclick={oncardclick} />} />
				<Route path="/Login" element={<Login login={login} />} />
				<Route path="/Register" element={<Register addnewuser={addnewuser} />} />
				<Route
					path="/Doctor_info"
					element={<Doctor_info patientAppointment={patientAppointment} setAuthHeader={setAuthHeader} />}
				/>
				<Route path="/Patientinfo" element={<Patientinfo patient={patient} patientAppoint={patientAppoint} />} />
				<Route path="/Timetable" element={<Timetable />} />
				<Route path="/DoctorProfile" element={<DoctorProfile fd={filterdoctors} oncardclick={oncardclick} />} />
				<Route path="/Contact" element={<Contact />} />
				<Route path="/searchedDoctor" element={<SearchedDoctor oncardclick={oncardclick} match={match} />} />
				<Route path="/emergency" element={<Emergency />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
