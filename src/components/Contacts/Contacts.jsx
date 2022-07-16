import { FcFullTrash } from 'react-icons/fc';
import {
  DeleteBtn,
  ItemContacts,
  ListContacts,
  TextContacts,
} from './Contacts.styled';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContacts, getFilter } from 'redux/contactsSlice';

export function Contacts() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getFilteredContacts = () => {
    const normalized = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalized)
    );
  };

  const visibleContacts = getFilteredContacts();

  return (
    <ListContacts>
      {visibleContacts.map(({ id, name, number }) => (
        <ItemContacts key={id}>
          <TextContacts>
            {name} : {number}
          </TextContacts>
          <DeleteBtn onClick={() => dispatch(deleteContact(id))}>
            <FcFullTrash />
          </DeleteBtn>
        </ItemContacts>
      ))}
    </ListContacts>
  );
}
