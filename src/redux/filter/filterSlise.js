import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: { value: '' },
  reducers: {
    setFilter(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

const getFilter = state => state.filter.value;

export const getVisibleContacts = (state, contacts = []) =>
  contacts.filter(
    ({ name, phone }) =>
      name.toLowerCase().includes(getFilter(state).toLowerCase()) ||
      phone.includes(getFilter(state))
  );
