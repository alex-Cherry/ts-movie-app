import React, { useState, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// Bootstrap
import {
  Navbar as BNavbar,
  Container as BContainer,
  Button as BButton,
  Form as BForm
} from 'react-bootstrap';
// Store
import {
  setPosterBg
} from '../../store';
// CSS
import './header.scss';


// MAP DISPATCH
const mapDsipatch = (dispatch: any) => {
  return {
    setPosterBg: (path: string) => dispatch(setPosterBg(path)),
  };
}

// CONNECTOR
const connector = connect(null, mapDsipatch);

// PROPS TYPE
type HeaderProps = ConnectedProps<typeof connector>
  & RouteComponentProps;


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const Header = (props: HeaderProps) => {

  // STATE
  const [ searchText, setSearchText ] = useState('');
  // REFS
  const targetSearch = useRef(null);


  // PROPS
  const {
    setPosterBg
  } = props;


  // ===< UTILS >===
  // 
  const doSearch = (text: string) => {
    const { history: { push } } = props;

    const query = text.trim();
    if (query) {
      // Zero bg of the page
      setPosterBg('');
      // Push to the search page with the specified query
      push(`/search?q=${query}`);
    }
  }

  // useEffect(() => {
  //   console.log('header - creation')
  // }, []);


  // ===< EVENT HANDLERS >===
  // 
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  const onClickSearchHandler = () => {
    doSearch(searchText);
  }
  const onClickClearHandler = () => {
    setSearchText('');
  }
  const onClickNavbarBrandHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    // Zero the search text
    setSearchText('');
    // Push to the main page
    const { history: { push } } = props;
    push('/');
  }


  // ===< RENDER >===
  // 
  return (
    <header className="header">
      <BNavbar
        bg="dark"
        className="header__navbar"
        variant="dark"
      >
        <BContainer>
          {/* Brand */}
          <BNavbar.Brand onClick={ onClickNavbarBrandHandler } href='/'>
            MovieDB
          </BNavbar.Brand>
          {/* Form */}
          <BForm onSubmit={ onSubmitHandler } className="d-flex">
            <div className="d-flex align-items-center position-relative">

              {/* Search Input */}
              <BForm.Control
                className="mr-sm-2 header__search-input"
                placeholder="Поиск..."
                value={ searchText }
                onChange={ event => { setSearchText(event.target.value) } }
                ref={ targetSearch }
                // debounce="500"
              ></BForm.Control>
              
              {/* Clear Button */}
              {
                searchText && (
                  <span
                    className="header__clear-button"
                    onClick={ onClickClearHandler }
                  >
                    &times;
                  </span>
                )
              }
              
            </div>

            {/* Submit Button */}
            <BButton
              type="submit"
              variant="outline-light"
              onClick={ onClickSearchHandler }
            >
              Поиск
            </BButton>
          </BForm>
        </BContainer>
      </BNavbar>
    </header>
  );
};

export default withRouter(connector(Header));
