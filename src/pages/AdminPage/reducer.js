import { useReducer, useEffect } from 'react';
import { getAdminDonations, updateDonation } from 'api/donation';

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
    case 'donations-updated':
      return {
        ...state,
        status: 'donation-updated',
        donations: action.donations
      };
    case 'select-donation':
      return {
        ...state,
        status: 'editing-donation',
        selectedDonation: action.donation
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

export function useAdminPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function getDonations() {
      try {
        const donations = await getAdminDonations();
        dispatch({ type: 'load-donations', donations });
      } catch (e) {
        dispatch({ type: 'error', error: e.message });
      }
    }
    getDonations();
  }, [dispatch]);
  async function update(id, updates) {
    try {
      await updateDonation(id, updates);
      const donations = await getAdminDonations();
      dispatch({ type: 'donations-updated', donations });
    } catch (e) {
      dispatch({ type: 'error', error: e.message });
    }
  }
  function selectDonation(donation) {
    dispatch({ type: 'select-donation', donation });
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
    update,
    selectDonation,
    goBack,
    setError
  };
}
