import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate  } from 'react-router-dom';
import TaskForm from './Tasks/TaskForm';
import TaskList from './Tasks/TaskList';
import Login from './Auth/Login';
import Signup from './Auth/signup';
import './style.css';
import axios from 'axios';
import Cookies from 'js-cookie';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(Cookies.get('Admin') != null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate loading tasks from an API
        const response = await axios.get('http://localhost:8000/tasks/');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false); // Set loading to false after tasks are loaded or if there's an error
      }
    };
    setIsAdminLoggedIn(Cookies.get('Admin') != null);
    fetchData();

  }, []);

  const handleLogout = () => {
    Cookies.remove('Admin');
    setIsAdminLoggedIn(false);
  };

  const handleSubmit = async (title, description, due_date) => {
    const response = await axios.post('http://localhost:8000/tasks/', { title, description, due_date });
    setTasks([...tasks, response.data]);
   };




   
const [input, setInput] = useState(''); 
const [weather, setWeather] = useState({ 
    loading: false, 
    data: {}, 
    error: false, 
}); 

const toDateFunction = () => { 
    const months = [ 
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December', 
    ]; 
    const WeekDays = [ 
        'Sunday', 
        'Monday', 
        'Tuesday', 
        'Wednesday', 
        'Thursday', 
        'Friday', 
        'Saturday', 
    ]; 
    const currentDate = new Date(); 
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()] 
        }`; 
        console.log(date);
    return date; 
}; 

const search = async (event) => { 
    if (event.key === 'Enter') { 
        event.preventDefault(); 
        setInput(''); 
        setWeather({ oading: true }); 
        const url = 'https://api.openweathermap.org/data/2.5/weather'; 
        const api_key = 'f00c38e0279b7bc85480c3fe775d518c'; 
        await axios 
            .get(url, { 
                params: { 
                    q: input, 
                    units: 'metric', 
                    appid: api_key, 
                }, 
            }) 
            .then((res) => { 
                console.log('res', res); 
                setWeather({ data: res.data, loading: false, error: false }); 
            }) 
            .catch((error) => { 
                setWeather({ ...weather, data: {}, error: true }); 
                setInput(''); 
                console.log('error', error); 
            }); 
    } 
}; 


  return (
    <Router>
      <div className="App container mt-5">
      
      {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )
      :
      <Link to="/" className='ms-4'>
      <div className="container">
 <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
   <div className="col-md-3 mb-2 mb-md-0">
     <h3 className="d-inline-flex link-body-emphasis text-decoration-none fs-1">
       SS
     </h3>
   </div>

   <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
     <li><h4 className=" px-2 ">Task Management System</h4></li>
   </ul>


   <div className="modal fade" id="weatherApp" tabIndex="-1" aria-labelledby="weatherAppLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="weatherAppLabel">Weather App</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="col-12">
    <label className="visually-hidden" htmlFor="inlineFormInputGroupUsername">Username</label>
    <div className="input-group">
      <div className="input-group-text">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
      </div>
      <input 
                    type="text"
                    className="city-search form-control"
                    placeholder="Enter City Name.."
                    name="query"
                    id="inlineFormInputGroupUsername" 
                     value={input} 
                    onChange={(event) => setInput(event.target.value)} 
                    onKeyPress={search} 
                /> 
    </div>
  </div>

     <span className='text-center '>
     {weather.loading && ( 
                <> 
                    <br /> 
                    <br /> 
                    <Oval type="Oval" color="black" height={100} width={100} /> 
                </> 
            )} 
            {weather.error && ( 
                <> 
                    <br /> 
                    <br /> 
                    <span className="error-message"> 
                        <span style={{ fontSize: '20px' }}>City not found</span> 
                    </span> 
                </> 
            )} 
            {weather && weather.data && weather.data.main && ( 
                <div> 
                    <div className="city-name mt-3 pt-3"> 
                        <h2> 
                            {weather.data.name}, <span>{weather.data.sys.country}</span> 
                        </h2> 
                    </div> 
                    <div className="date"> 
                        <span>{toDateFunction()}</span> 
                    </div> 
                    <div className="icon-temp"> 
                        <img 
                            className=""
                            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} 
                        /> 
                        {Math.round(weather.data.main.temp)} 
                        <sup className="deg">°C</sup> 
                    </div> 
                    <div className="des-wind"> 
                        <p>{weather.data.weather[0].description.toUpperCase()}</p> 
                        <p>Wind Speed: {weather.data.wind.speed}m/s</p> 
                    </div> 
                </div> 
            )} 
     </span>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

   {
         isAdminLoggedIn ? 
         <div className="col-md-3 text-end">
        <button type="button" className="btn btn-info me-2 text-white"  data-bs-toggle="modal" data-bs-target="#weatherApp">Weather App</button>
 <button type="button" className="btn btn-outline-primary me-2" onClick={handleLogout}>Logout</button>
       </div>
        : 
         <div className="col-md-3 text-end">
         <button type="button" className="btn btn-outline-primary me-2">Login</button>
         <Link to="/signup" className="btn btn-primary me-2">Sign-up</Link>
       </div>
       }
 </header>
</div>
     </Link>
     }

<Routes>
  <Route path="/" element={isAdminLoggedIn ? <Navigate to="/tasks" /> : <Login />} />
  <Route path="/tasks" element={isAdminLoggedIn ?
    <>
      <TaskForm onSubmit={handleSubmit} />
      <TaskList tasks={tasks} />
    </>
    : <Navigate to="/" />}
  />
  <Route path="/signup" element={<Signup />} />
</Routes>

      </div>

    </Router>
  );
}

export default App;
