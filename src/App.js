import React from 'react';
import './App.css';
import GameScreen from './container/gameScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
      <Provider store={store}>
            <GameScreen/>
      </Provider>
  );
}

export default App;

//asdijasodijasoidjosad
