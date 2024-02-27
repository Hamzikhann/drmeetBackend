/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Emergency() {
	const [directionsService, setDirectionsService] = useState(null);
	const [directionsRenderer, setDirectionsRenderer] = useState(null);
	const [locationName, setName] = useState("");
	const [speciality, setSpeciality] = useState("");
	const [emergencyType, setEmergencyType] = useState("");
	const [city, setCity] = useState("");
	const [contactInfo, setcontactInfo] = useState("");

	const navigate = useNavigate();

	const handlespecialitychange = (event) => {
		setSpeciality(event.target.value);
	};

	useEffect(() => {
		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBa5eT9M-gjFKfpl7NFwNAtbH01CjEZTcU`;
		script.async = true;
		script.defer = true;
		document.head.appendChild(script);
		script.onload = () => {
			initMap();

			setDirectionsService(new window.google.maps.DirectionsService());
			setDirectionsRenderer(new window.google.maps.DirectionsRenderer());
		};
		document.head.appendChild(script);
		return () => {
			document.head.removeChild(script);
		};
	}, []);
	const geocoder = new window.google.maps.Geocoder();

	const getCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	};

	const showPosition = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		initMap(latitude, longitude);
		const latlng = new window.google.maps.LatLng(latitude, longitude);

		geocoder.geocode({ location: latlng }, (results, status) => {
			if (status === "OK") {
				if (results[0]) {
					setName(results[0].formatted_address);
				} else {
					console.error("No results found");
				}
			} else {
				console.error(`Geocoder failed due to: ${status}`);
			}
		});
	};

	const initMap = (lat = 31.5204, lng = 74.3587) => {
		const map = new window.google.maps.Map(document.getElementById("map"), {
			center: { lat, lng },
			zoom: 16
		});
		let marker = new window.google.maps.Marker({
			position: { lat, lng },
			map
		});
		return map;
	};

	const createEmergencyData = () => {
		const emergencyObj = {
			locationName: locationName,
			city: city,
			doctorSpeciality: speciality,
			emergencyType: emergencyType,
			contactInfo: contactInfo
		};

		axios
			.post("http://localhost:5002/api/emergency/create", emergencyObj)
			.then((response) => {
				console.log(response);
				const notify = () =>
					toast.success(`${response ? response.data.message : response.message}`, {
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
				navigate("/");
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

	return (
		<div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
			<h1 className="text-2xl mb-6">{locationName}</h1>
			<div id="map" style={{ height: "400px", width: "600px" }}></div>
			<button
				onClick={getCurrentLocation}
				className="block mt-4 mb-8 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 hover:bg-blue-600"
			>
				Get Current Location
			</button>

			<div className="mb-6">
				<label className="block mb-2 text-lg">Speciality</label>
				<select
					onChange={handlespecialitychange}
					className="w-full p-4 border rounded-lg focus:outline-none focus:border-gray-600"
					required
				>
					<option className="px-4 py-2 hover:bg-gray-100">Select</option>
					<option className="px-4 py-2 hover:bg-gray-100">Anaesthesiologists</option>
					<option className="px-4 py-2 hover:bg-gray-100">Family medicine</option>
					<option className="px-4 py-2 hover:bg-gray-100">Internal medicine</option>
					<option className="px-4 py-2 hover:bg-gray-100">Gastroenterologist</option>
					<option className="px-4 py-2 hover:bg-gray-100">Cardiologist</option>
					<option className="px-4 py-2 hover:bg-gray-100">Critical care medicine specialist</option>
					<option className="px-4 py-2 hover:bg-gray-100">Dermatologist</option>
					<option className="px-4 py-2 hover:bg-gray-100">Endocrinologist</option>
					<option className="px-4 py-2 hover:bg-gray-100">Emergency medicine</option>
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
				</select>
			</div>

			<div className="mb-6">
				<label className="block mb-2 text-lg">Emergency Type</label>
				<select
					onChange={(e) => setEmergencyType(e.target.value)}
					value={emergencyType}
					className="w-full p-4 border rounded-lg focus:outline-none focus:border-gray-600"
					required
				>
					<option className="px-4 py-2 hover:bg-gray-100">Select</option>
					<option className="px-4 py-2 hover:bg-gray-100">Cardiac Arrest</option>
					<option className="px-4 py-2 hover:bg-gray-100">Stroke</option>
					<option className="px-4 py-2 hover:bg-gray-100">Respiratory Distress:</option>
					<option className="px-4 py-2 hover:bg-gray-100">Allergic Reactions</option>
					<option className="px-4 py-2 hover:bg-gray-100">Trauma or Injury</option>
					<option className="px-4 py-2 hover:bg-gray-100">Seizures</option>
					<option className="px-4 py-2 hover:bg-gray-100">Poisoning</option>
					<option className="px-4 py-2 hover:bg-gray-100">Diabetic Emergencies</option>
				</select>
			</div>

			<div className="mb-6">
				<label className="block mb-2 text-lg">Contact Information</label>
				<input
					type="text"
					placeholder="Please Enter your contact number"
					onChange={(e) => setcontactInfo(e.target.value)}
					className="w-full p-4 border rounded-lg focus:outline-none focus:border-gray-600"
				/>
			</div>

			<div className="mb-6">
				<label className="block mb-2 text-lg">City</label>
				<select
					onChange={(e) => setCity(e.target.value)}
					value={city}
					className="w-full p-4 border rounded-lg focus:outline-none focus:border-gray-600"
					required
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

			<button
				onClick={createEmergencyData}
				className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 hover:bg-green-600"
			>
				Create Emergency Data
			</button>
		</div>
	);
}

export default Emergency;
