import React, { useState, useEffect } from 'react'

const Home = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [localStorage.getItem('token')]); 

  console.log(token);

  return (
    <section>
      <div>
        <h1>Home</h1>
        <p>Welcome to the Home</p>
      </div>
    </section>  
  )
}

export default Home