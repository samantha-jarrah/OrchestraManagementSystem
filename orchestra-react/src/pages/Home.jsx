import React from 'react';
import iconImage from '../icons/noun-orchestra-4236365.png'

function Home() {
  return (
    <div className='container'>
      <h1>Orchestra Management System</h1>
      
      <img src={iconImage} alt="Orchestra Icon" className='icon' />

      <footer>
        <p>&copy; 2023 Jared Norris & Samantha Jarrah</p>
      </footer>
    </div>
  );
}

export default Home;
