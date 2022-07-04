import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Header} from "./components/Header";
import {Main} from './pages/Main';
import {Login} from './pages/Login';
import {Register} from './pages/Register';

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
                </Routes>
            </div>
            <footer>
                <a href="https://www.freepik.com/vectors/cold-beer">Cold beer vector created by upklyak - www.freepik.com</a>
            </footer>
        </Router>
        <ToastContainer />
    </>
  );
}

export default App;
