import React from 'react';
import { Link } from 'react-router-dom';
import ItemForm from './ItemForm';  // Ensure this path is correct

const App = () => {
  const refreshItems = () => {
    // Function to refresh items if needed
  };

  return (
    <div className="container">
      <h1>Item Manager</h1>
      <ItemForm refreshItems={refreshItems} />
      <nav>
        <Link to="/items">View Items</Link>
      </nav>
    </div>
  );
};

export default App;
