import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getuser = () => {
	return axios
		.get("http://localhost:5002/api/users/")
		.then((response) => {
			return response.data;
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
