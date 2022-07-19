import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';
import { ButtonContact, FormContact, InputContact, Label } from './Form.styled';

export function Form() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { data: contacts } = useGetContactsQuery();

  const [addContact] = useAddContactMutation();

  const handelInput = e => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
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
      addContact({ name, phone });

      reset();
      return;
    }

    const notify = () => toast.error(`${name}  - is already in contacts`);
    notify();
  };

  const reset = () => {
    setName('');
    setPhone('');
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
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handelInput}
        />
      </Label>

      <ButtonContact type="submit">Add contact</ButtonContact>
      <ToastContainer />
    </FormContact>
  );
}
