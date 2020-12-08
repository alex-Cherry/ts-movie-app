import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from 'react-redux';
// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Store
import { store } from './store';
// Custom Components
import MainPage from './pages/mainPage';
import SearchPage from './pages/searchPage';
import PosterBg from './components/posterBg';
import Header from './components/header';
import { ToastsContainer } from './components/toast';
// Bootstrap
import { Container as BContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
        <Header />
        <BContainer>
          <PosterBg />
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/search">
              <SearchPage />
          </Route>
          </Switch>
        </BContainer>
        <ToastsContainer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
