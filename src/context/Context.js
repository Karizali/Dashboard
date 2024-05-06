import React, { createContext, useReducer } from 'react'
import { reducer } from './Reducer';
import PropTypes from 'prop-types';

export const GlobalContext = createContext("Initial Value");

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    };

let data = {
  user: {},
  isLogin: null,
  baseUrl: (window.location.href.includes('localhost'))
    ?
    `http://localhost:5000` : ``
}

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

