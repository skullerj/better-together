import { useReducer, useEffect } from 'react';
import { loadLocations } from 'api/locations';

const initialState = {
  status: 'loading',
  selectedDonation: null,
  error: null,
  donations: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'load-donations':
      return { ...state, status: 'idle', donations: action.donations };
    case 'donation-registered':
      return {
        ...state,
        status: 'donation-registered'
      };
    case 'return':
      return {
        ...state,
        status: 'idle'
      };
    case 'error':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
};

export function useDonatePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function getLocations() {
      try {
        const locations = await loadLocations();
        dispatch({ type: 'load-locations', locations });
      } catch (e) {
        dispatch({ type: 'error', error: e.message });
      }
    }
    getLocations();
  }, []);
  function donationRegistered() {
    dispatch({ type: 'donation-registered' });
  }
  function goBack() {
    dispatch({ type: 'return' });
  }
  function setError(error) {
    dispatch({ type: 'error', error });
  }
  return {
    ...state,
    loading: state.status === 'loading',
    donationRegistered,
    goBack,
    setError
  };
}
