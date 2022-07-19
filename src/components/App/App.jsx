import { Contacts } from 'components/Contacts';
import { Filter } from 'components/Filter';
import { Form } from 'components/Form';
import { Container, MainTitle, Title } from './App.styled';

export function App() {
  return (
    <Container>
      <MainTitle>Phone book</MainTitle>
      <Form />
      <Title>Contacts</Title>
      <Filter />
      <Contacts />
    </Container>
  );
}
