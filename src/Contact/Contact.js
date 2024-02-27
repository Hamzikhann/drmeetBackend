/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Conpic from "./Conpic.jpg";
export default function Contact() {
	return (
		<div>
			<main className="flex overflow-hidden">
				<div className="flex-1 hidden lg:block">
					<img src={Conpic} className="w-full h-screen object-cover" />
				</div>
				<div className="py-12 flex-1 lg:flex lg:justify-center lg:h-screen lg:overflow-auto">
					<div className="max-w-lg flex-1 mx-auto px-4 text-gray-600">
						<div>
							<h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">Get in touch</h3>
							<p className="mt-3">We'd love to hear from you! Please fill out the form bellow.</p>
						</div>
						<form onSubmit={(e) => e.preventDefault()} className="space-y-5 mt-12 lg:pb-12">
							<div>
								<label className="font-medium">Full name</label>
								<input
									type="text"
									required
									className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
								/>
							</div>
							<div>
								<label className="font-medium">Email</label>
								<input
									type="email"
									required
									className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
								/>
							</div>
							<div>
								<label className="font-medium">Phone number</label>
								<div className="relative mt-2">
									<div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
										<select className="text-sm bg-transparent outline-none rounded-lg h-full">
											<option>PK</option>
										</select>
									</div>
									<input
										type="number"
										placeholder="+923000000000"
										required
										className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
									/>
								</div>
							</div>

							<div>
								<label className="font-medium">Message</label>
								<textarea
									required
									className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
									placeholder="Ask a question"
								></textarea>
							</div>
							<button className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150">
								Submit
							</button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}
