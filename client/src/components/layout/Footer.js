import React from 'react';

export default () => {
  return (
    <div className="footer">
      <footer className="bg-dark text-white mt-4 p-3 text-center">
        Copyright &copy; {new Date().getFullYear()} StudLogBook
      </footer>
    </div>
  );
};
