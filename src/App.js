import React from 'react';
import './App.css';
import ProfitForm from './ProfitForm';

function App() {
  return (
    <div className="App">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="heading">💰 The DGH Profit Calculator 💷</h1>
            </div>
          </div>

          <ProfitForm />

        </div>
    </div>
  );
}

export default App;
