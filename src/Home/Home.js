/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faFemale,
	faHospital,
	faBaby,
	faBone,
	faEarListen,
	faMicroscope,
	faSyringe
} from "@fortawesome/free-solid-svg-icons";

import { AutoComplete } from "antd";
import Lottie from "lottie-react";
import Docter from "./Docter.json";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export default function Home({ match, aad, oncardclick }) {
	const [headingText, setHeadingText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedspeciality, setselectedspeciality] = useState("");
	const [selectedcity, setselectedcity] = useState("");

	const texts = ["15 million+ users served", "25,000+ doctors", "200,000+ patient reviews"];

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
		}, 2000);

		return () => {
			clearInterval(timer);
		};
	}, [texts.length]);

	useEffect(() => {
		setHeadingText(texts[currentIndex]);
	}, [currentIndex]);

	const handleSpecialtySelect = (value) => {
		setselectedspeciality(value);
	};

	const handlecityChange = (value) => {
		setselectedcity(value);
	};

	const search = () => {
		match(selectedcity, selectedspeciality);
	};

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

	return (
		<div>
			<div className="fd flex justify-center flex-col">
				<div className="mt-[4rem] ">
					<h1 className="text-blue-500 text-4xl font-semibold text-center md:text-3xl lg:text-4xl  mb-20">
						Find and book the best doctors near you
					</h1>

					<div className="flex flex-col mt-[6rem] md:flex-row items-center justify-center  ">
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
				</div>
				<h1 className="text-blue-500 text-2xl font-semibold text-center transition duration-500">{headingText}</h1>
			</div>

			{/* <div className="flex flex-wrap justify-center space-x-5 mt-20">
				{aad.map((f) => (
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
			</div> */}

			<div className="conerndiv bg-gray-50">
				<div className="t" id="techdiv">
					<div className="contentt ">
						<div className=" flex flex-row items-center justify-center ">
							<h1 className="font-bold leading-tight text-2xl ml-1 mt-5  text-blue-500 ">
								Find doctors by health concern
							</h1>
						</div>
						<hr className="w-48 h-0.5 mx-auto my-4 bg-gray-900 border-0 rounded md:my-10 " />
						<div className="space-x-10 mt-5 flex flex-row items-center justify-center ">
							<div className=" tech flex flex-col items-center justify-center  ">
								<FontAwesomeIcon icon={faEye} size="2x" style={{ color: "blue" }} />
								<h4 className=" font-large leading-tight text-base mt-0 mb-2 text-blue-500">Eye Specialist</h4>
							</div>
							<div className=" tech flex flex-col items-center justify-center  ">
								<FontAwesomeIcon icon={faFemale} size="2x" style={{ color: "pink" }} />
								<h4 className=" font-large leading-tight text-base mt-0 mb-2 text-blue-500">Gynecologist</h4>
							</div>
							<div className=" tech flex flex-col items-center justify-center  ">
								<FontAwesomeIcon icon={faHospital} size="2x" style={{ color: "green" }} />
								<h4 className=" font-large leading-tight text-base mt-0 mb-2 text-blue-500">Skin Specialist</h4>
							</div>
							<div className=" tech flex flex-col items-center justify-center  ">
								<FontAwesomeIcon icon={faBaby} size="2x" style={{ color: "orange" }} />
								<h4 className=" font-large leading-tight text-base mt-0 mb-2 text-blue-500">Child Specialist</h4>
							</div>
						</div>
						<div className="space-x-10 tech mt-5 flex flex-row items-center justify-center ">
							<div className=" tech flex flex-col items-center justify-center  ">
								<FontAwesomeIcon icon={faBone} size="2x" style={{ color: "brown" }} />
								<h4 className=" font-large leading-tight text-base mt-0 mb-2 text-blue-500">Orthopedic Surgeon</h4>
							</div>
							<div className=" tech flex flex-col items-center justify-center  ">
								<FontAwesomeIcon icon={faEarListen} size="2x" style={{ color: "black" }} />
								<h4 className=" font-large leading-tight text-base mt-0 mb-2 text-blue-500">ENT Specialist</h4>
							</div>

							<div className=" tech flex flex-col items-center justify-center  ">
								<FontAwesomeIcon icon={faMicroscope} size="2x" style={{ color: "purple" }} />
								<h4 className=" font-large leading-tight text-base mt-0 mb-2 text-blue-500">Diagnostics</h4>
							</div>
							<div className=" tech flex flex-col items-center justify-center  ">
								<FontAwesomeIcon icon={faSyringe} size="2x" style={{ color: "red" }} />
								<h4 className=" font-large leading-tight text-base mt-0 mb-2 text-blue-500">Diabetes specialist</h4>
							</div>
						</div>
						<hr className="w-48 h-0.5 mx-auto my-4 bg-gray-900 border-0 rounded md:my-10 " />
					</div>
					<div className="text-center pt-6 pb-2">
						<h1 className="text-3xl font-bold md:text-2xl text-blue-500">Book appointments in 3 easy steps</h1>
					</div>

					<div className="flex flex-col md:flex-row">
						<div className="ml-5 mb-5 md:mb-0 md:ml-0 md:mr-20 md:w-1/2">
							<Lottie className="w-full md:h-full" animationData={Docter} />
						</div>
						<div className="flex flex-col justify-center ml-1 mr-10 md:w-1/2">
							<p className="text-xl mb-5 mt-3 md:mt-0">
								<FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
								Search for doctors by specialty, hospital, service, or disease.
							</p>
							<p className="text-xl mb-5 text-gray-900 dark:text-black mt-3 md:mt-0">
								<FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
								Select based on Experience, Fee, or Rating
							</p>
							<p className="text-xl text-gray-900 dark:text-black mt-3 md:mt-0">
								<FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
								Book a Confirmed Appointment within Seconds
							</p>
							<button
								onClick={search}
								className="mt-10 mx-2 my-2 bg-gray-200 transition duration-150 ease-in-out focus:outline-none hover:bg-gray-300 rounded text-indigo-700 px-4 py-3 text-sm"
							>
								Find a doctor
							</button>
						</div>
					</div>
				</div>
			</div>
			<section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
				<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex flex-col items-center">
						<div className="text-center">
							<h2 className="mt-2 text-3xl font-bold text-blue-500 sm:text-4xl xl:text-5xl font-pj">
								Our happy clients say about us
							</h2>
						</div>

						<div className="relative mt-10 md:mt-24 md:order-2">
							<div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
								<div
									className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
									style={{
										background:
											"linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
									}}
								></div>
							</div>

							<div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
								<div className="flex flex-col overflow-hidden shadow-xl">
									<div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
										<div className="flex-1">
											<div className="flex items-center">
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											</div>

											<blockquote className="flex-1 mt-8">
												<p className="text-lg leading-relaxed text-gray-900 font-pj">
													“DoctorMeet has been a game-changer for me. I'm a busy professional, and the convenience of
													scheduling appointments, whether it's for a hospital visit or home service, has been
													invaluable. I've used it multiple times for both scenarios, and every time, I've received
													prompt and reliable service. Highly recommended!”
												</p>
											</blockquote>
										</div>

										<div className="flex items-center mt-8">
											<img
												className="flex-shrink-0 object-cover rounded-full w-11 h-11"
												src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png"
												alt=""
											/>
											<div className="ml-4">
												<p className="text-base font-bold text-gray-900 font-pj">Leslie Alexander</p>
											</div>
										</div>
									</div>
								</div>

								<div className="flex flex-col overflow-hidden shadow-xl">
									<div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
										<div className="flex-1">
											<div className="flex items-center">
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											</div>

											<blockquote className="flex-1 mt-8">
												<p className="text-lg leading-relaxed text-gray-900 font-pj">
													“I recently had a health concern that needed immediate attention but couldn't leave home due
													to my condition. DoctorMeet saved the day! I was able to book a home service appointment
													swiftly, and a qualified medical professional arrived promptly. It's a fantastic platform that
													caters to diverse needs and ensures quality healthcare reaches your doorstep.”
												</p>
											</blockquote>
										</div>

										<div className="flex items-center mt-8">
											<img
												className="flex-shrink-0 object-cover rounded-full w-11 h-11"
												src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png"
												alt=""
											/>
											<div className="ml-4">
												<p className="text-base font-bold text-gray-900 font-pj">Jacob Jones</p>
											</div>
										</div>
									</div>
								</div>

								<div className="flex flex-col overflow-hidden shadow-xl">
									<div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
										<div className="flex-1">
											<div className="flex items-center">
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<svg
													className="w-5 h-5 text-[#FDB241]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											</div>

											<blockquote className="flex-1 mt-8">
												<p className="text-lg leading-relaxed text-gray-900 font-pj">
													“As someone with a hectic schedule, finding time for hospital appointments was always a
													hassle. DoctorMeet changed the game by offering a seamless booking experience for both
													hospital visits and home services. The platform's user-friendly interface and the option for
													home services have made managing my health much easier. It's a reliable service that I trust.”
												</p>
											</blockquote>
										</div>

										<div className="flex items-center mt-8">
											<img
												className="flex-shrink-0 object-cover rounded-full w-11 h-11"
												src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png"
												alt=""
											/>
											<div className="ml-4">
												<p className="text-base font-bold text-gray-900 font-pj">Jenny Wilson</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
