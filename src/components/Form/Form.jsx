import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addContact, getContacts } from 'redux/contactsSlice';
import { ButtonContact, FormContact, InputContact, Label } from './Form.styled';

export function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handelInput = e => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        throw new Error();
    }
  };

  const onSubmitForm = e => {
    e.preventDefault();

    const isContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!isContact) {
      dispatch(addContact({ name, number }));
      reset();
      return;
    }

    const notify = () => toast.error(`${name}  - is already in contacts`);
    notify();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormContact onSubmit={onSubmitForm}>
      <Label>
        Name
        <InputContact
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handelInput}
        />
      </Label>
      <Label>
        Num
        <InputContact
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handelInput}
        />
      </Label>

      <ButtonContact type="submit">Add contact</ButtonContact>
      <ToastContainer />
    </FormContact>
  );
}
