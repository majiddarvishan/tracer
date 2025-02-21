import React from 'react';
import '../assets/css/Home.css'; // Updated import path

const Home = () => {
  return (
    <div className="home-container">
      <div className="mt-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Welcome to Shayan Pardaz</h2>
            <p className="card-text">
              Explore the features of this application using the menu on the left.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
