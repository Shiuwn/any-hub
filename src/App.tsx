import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import store from './store';

export const StoreContext = React.createContext(store);

function App() {
  return (
    <StoreContext.Provider value={store}>
      <div className='flex flex-col h-full'>
        <Nav />
        <div className='flex flex-grow '>
          <Sidebar />
          <MainPanel />
        </div>
      </div>
    </StoreContext.Provider>

  );
}

export default App;
