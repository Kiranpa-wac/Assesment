// Home.js
import React from 'react';
import LogoutButton from '../Components/LogoutButton';
import EmployeeTable from '../Components/EmployeeTable';


function Home() {


  return (
    <div>
      <h2>Welcome to the Homepage</h2>
      {/* Other homepage content */}
      <LogoutButton />
     
      <EmployeeTable />
    </div>
  );
}

export default Home;
