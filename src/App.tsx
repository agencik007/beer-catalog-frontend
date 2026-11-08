import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { BeerBackground } from './components/BeerBackground';
import { Main } from './pages/Main';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CreateBeerForm } from './pages/CreateBeerForm';
import { UserBeers } from './pages/UserBeers';
import { BeerDetails } from './pages/BeerDetails';
import { AuthCallback } from './pages/AuthCallback';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { store } from './app/store';
import { clearUser } from './features/auth/authSlice';
import { clearStoredUser } from './features/auth/authService';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

// Expired or revoked session: drop it so the UI shows the logged-out state
axios.interceptors.response.use(undefined, function sessionExpiredInterceptor(err) {
	if (err?.response?.status === 401) {
		clearStoredUser();
		store.dispatch(clearUser());
	}
	return Promise.reject(err);
});

function App() {
	return (
		<>
			<BeerBackground />

			<Router>
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/beer/:id" element={<BeerDetails />} />
						<Route path="/login" element={<Login />} />
						<Route path="/user" element={<UserBeers />} />
						<Route path="/register" element={<Register />} />
						<Route path="/auth/callback" element={<AuthCallback />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/reset-password" element={<ResetPassword />} />
						<Route path="/create" element={<CreateBeerForm />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
