import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Header} from "./components/Header";
import {Main} from './pages/Main';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {CreateBeerForm} from "./pages/CreateBeerForm";

function App() {
  return (
    <>
        <Router>
            <div className='container'>
                <Header />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/create' element={<CreateBeerForm />} />
                </Routes>
            </div>
        </Router>
        <ToastContainer />
    </>
  );
}

export default App;
