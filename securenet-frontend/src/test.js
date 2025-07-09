import React, { useEffect, useState } from 'react';

function BootstrapPractice() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="container py-5 ">
      <h1 className="mb-4 border  text-primary">Bootstrap Practice Page</h1>
      
    <div className='card-group'>
      <div className="card " style={{ width: "18rem" }}>
        <div className="card-body ">
            <h5 className="card-header ">Card title</h5>
            <img src="https://via.placeholder.com/150" alt="Card image" className="card-img-top" />
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
        </div>

      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
            <h5 className="card-header">Card title</h5>
            <img src="https://via.placeholder.com/150" alt="Card image" className="card-img-top" />
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
        </div>

        </div>

      <div className="mb-3">
        <label htmlFor="practiceInput" className="form-label">
          Add an item
        </label>
        <div className="input-group ">
          <input
            id="practiceInput"
            type="text"
            className="form-control"
            placeholder="Type something..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
      <ul className="list-group mb-4">
        {items.length === 0 ? (
          <li className="list-group-item text-muted">No items yet.</li>
        ) : (
          items.map((item, idx) => (
            <li key={idx} className="list-group-item">
              {item}
            </li>
          ))
        )}
      </ul>
      <div className="alert alert-info">
        Try editing this page and use different Bootstrap classes!
      </div>
    </div>
  );
}

export default BootstrapPractice;