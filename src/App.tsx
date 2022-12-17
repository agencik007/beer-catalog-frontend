import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { Main } from './pages/Main';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CreateBeerForm } from './pages/CreateBeerForm';
import { UserBeers } from './pages/UserBeers';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

function App() {
	axios.interceptors.response.use(
		undefined,
		function axiosRetryInterceptor(err) {
			if (err.response.status === 401) {
				// console.log('err', err.response.status);
				localStorage.removeItem('user');
			}
			return Promise.reject(err);
		}
	);

	return (
		<>
			<Router>
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/login" element={<Login />} />
						<Route path="/user" element={<UserBeers />} />
						<Route path="/register" element={<Register />} />
						<Route path="/create" element={<CreateBeerForm />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
