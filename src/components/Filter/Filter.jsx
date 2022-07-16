import { FcFilledFilter } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/contactsSlice';
import { InputFilter, TitleFilter, Wrapper } from './Filter.styled';

export function Filter() {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <TitleFilter>
        Find contacts by name <FcFilledFilter />
      </TitleFilter>
      <InputFilter
        type="text"
        onChange={e => dispatch(setFilter(e.currentTarget.value))}
      />
    </Wrapper>
  );
}
