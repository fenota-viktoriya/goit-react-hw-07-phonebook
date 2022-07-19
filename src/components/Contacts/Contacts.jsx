import { FcFullTrash } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import {
  DeleteBtn,
  ItemContacts,
  ListContacts,
  TextContacts,
} from './Contacts.styled';

import { useGetContactsQuery } from 'redux/contactsSlice';
import { getVisibleContacts } from 'redux/filter/filterSlise';
import { useDeleteContactMutation } from 'redux/contactsSlice';

export function Contacts() {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const { data: contacts } = useGetContactsQuery();
  const visibleContacts = useSelector(state =>
    getVisibleContacts(state, contacts)
  );

  return (
    <ListContacts>
      {visibleContacts.map(({ id, name, phone }) => (
        <ItemContacts key={id}>
          <TextContacts>
            {name} : {phone}
          </TextContacts>
          <DeleteBtn
            type="button"
            disabled={isLoading}
            onClick={() => deleteContact(id)}
          >
            <FcFullTrash />
          </DeleteBtn>
        </ItemContacts>
      ))}
    </ListContacts>
  );
}
