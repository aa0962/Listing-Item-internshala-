import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/items');
        setItems(response.data);
      } catch (error) {
        setError('Error fetching items');
      }
    };

    fetchItems();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2>Item List</h2>
      <ul className="item-list">
        {items.map(item => (
          <li key={item._id} className="item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
