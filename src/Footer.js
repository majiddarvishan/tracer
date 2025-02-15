import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center py-3" style={{ height: '56px' }}>
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} MyApp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
