import React, { useReducer, ReducerState, ReducerAction, Dispatch, Reducer } from 'react';
import './App.css';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';

export interface Store {
  text: string[],
  fontSize: number,
  size: number[]
}
export interface Action {
  type: keyof Store,
  payload: Store[keyof Store]
}
const initState = { text: ['Git', 'hub'], fontSize: 52, size: [400, 300] }

const reducer = (state: Store, action: Action) => {
  return { ...state, [action.type]: action.payload }
}

export const StoreContext = React.createContext<{state: ReducerState<typeof reducer>, dispatch: Dispatch<ReducerAction<typeof reducer>>}|null>(null)

function App() {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
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
