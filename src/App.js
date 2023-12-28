import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import CLOUD_ANIMATION from './components/cloudBg';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=9038e4654ab95a7c669375a0ed4fe415`;
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          setError(null); // Reset error state on successful response
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            setError('Request failed with status: ' + error.response.status);
            window.alert('Request failed with status: ' + error.response.status);
          } else if (error.request) {
            // The request was made but no response was received
            setError('No response received from the server');
            window.alert('No response received from the server');
          } else {
            // Something happened in setting up the request that triggered an error
            setError('Error setting up the request');
            window.alert('Error setting up the request');
          }
        });
      setLocation(''); // Clear the input field after making the request
    }
  };
  
  return (
    <div className="App">
      <CLOUD_ANIMATION/>
      <div className='container top'>
        <div className='search'>
          <input 
          
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter City'
          type='text'/>
        </div>
        {data.name != undefined && 
        <div className='city '>
          <h1>{data.name}</h1>
        </div>
        }
      </div>
      {data.name == undefined && <div className='weatherApp'><h1>WEATHER APP</h1></div> }
      <div className='containerResp'>
      {data.name != undefined && 
       <div className='container buttom'>
          <div className='temp '>
           <p> temperature</p>
            {data.main ? <h2>{data.main.temp.toFixed()}°C</h2> : null}
            </div>
          <div className='humidity '>
            <p>humidity</p>
            {data.main ? <h2>{data.main.humidity}%</h2> : null}
            </div>
          <div className='status '>
            <p>formation</p>
            {data.weather ? <h2>{data.weather[0].main}</h2> : null}
            </div>
       </div>
      }   
       {data.name != undefined && 
       <div className='extra boxes'>
            <div className='feels '><p>feels like</p> {data.main ? <h2>{data.main.feels_like.toFixed()} °C</h2> : null}</div>
            <div className='wind '><p>wind</p>{data.wind ? <h2>{data.wind.speed.toFixed()} kph</h2> : null}</div>
            <div className='descript '><p>desciption</p>{data.weather ? <h2>{data.weather[0].description}</h2> : null}</div>
        </div>
      }
      </div>
    </div>
  );
}

export default App;
