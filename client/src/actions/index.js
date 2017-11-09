import axios from "axios";

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');
	dispatch({
		type: "FETCH_USER",
		payload: res.data
	});
	console.log(res.data);
}

export const logout = () => async (dispatch) => {
	await axios.get('/api/logout');
	dispatch({
		type: "LOGOUT"
	});
}

export const handleToken = (token) => async (dispatch) => {
	const res = await axios.post('/api/stripe',token);
	dispatch({
		type: "FETCH_USER",
		payload: res.data
	});
}

// export const login = (service='google') => async (dispatch) => {
// 	const res = await axios.get('/api/auth/'+service);
// 	dispatch({
// 		type: "LOGIN",
// 		payload: res.data
// 	});
// }
