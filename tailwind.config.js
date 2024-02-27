/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		fontFamily: {
			roboto: ["Roboto", "sans-serif"],
			montserrat: ["Montserrat", "sans-serif"],
			lato: ["Lato", "sans-serif"],
			poppins: ["Poppins", "sans-serif"],
			pacifico: ["Pacifico", "cursive"],
			lobster: ["Lobster", "cursive"]
			// Add your custom fonts here
		},
		extend: {}
	},
	plugins: []
};
