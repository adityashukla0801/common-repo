// logic/stateManagement.js

import React, { createContext, useContext, useReducer } from "react";

// Initial state for the application
const initialState = {
  formData: {},
  modalVisible: false,
  buttonState: {
    loading: false,
    disabled: false,
  },
};

// Actions
const SET_FORM_DATA = "SET_FORM_DATA";
const TOGGLE_MODAL = "TOGGLE_MODAL";
const SET_BUTTON_STATE = "SET_BUTTON_STATE";

// Reducer function to manage state updates
const reducer = (state, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modalVisible: !state.modalVisible,
      };
    case SET_BUTTON_STATE:
      return {
        ...state,
        buttonState: {
          ...state.buttonState,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

// Create a context for state management
const StateContext = createContext();

// Custom hook to use the StateContext
export const useAppState = () => {
  return useContext(StateContext);
};

// StateProvider component to wrap the application
export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Action creators
  const setFormData = (data) => {
    dispatch({ type: SET_FORM_DATA, payload: data });
  };

  const toggleModal = () => {
    dispatch({ type: TOGGLE_MODAL });
  };

  const setButtonState = (buttonState) => {
    dispatch({ type: SET_BUTTON_STATE, payload: buttonState });
  };

  return (
    <StateContext.Provider
      value={{ state, setFormData, toggleModal, setButtonState }}
    >
      {children}
    </StateContext.Provider>
  );
};
