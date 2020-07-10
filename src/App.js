import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';


const storeForProvider = ConfigureStore();

class App extends Component {

  //no constructor needed because no props being passed down to it and it has no state

  render() {
    return (
      <Provider store={storeForProvider}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
