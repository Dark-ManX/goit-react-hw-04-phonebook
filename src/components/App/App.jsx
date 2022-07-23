import { useState, useEffect } from "react";
import shortid from "shortid";
import "./App.css";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";

export default function App() {

  const localStorageContacts = JSON.parse(localStorage.getItem('contacts')) 

  const [contacts, setContacts] = useState(localStorageContacts ?? [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {localStorage.setItem('contacts', JSON.stringify(contacts))}, [contacts])

  const addContacts = text => {

    const contactsNames = contacts.find(
      el => (el.name.toLowerCase() === text.name.toLowerCase())
      );

    if (contactsNames) {    
      return alert('This contact already exist');
    };
    
    text.id = shortid.generate();

    setContacts([...contacts, text])
    };

  const deleteContacts = id => {
    setContacts(contacts.filter(item => item.id !== id))
  }

  const changeFilter = (e) => {
    const {value} = e.target;
    return setFilterName(value);
  }

  const getFilteredContacts = (filterName) => {
    return contacts.filter(contact => contact.name.includes(filterName));
  }

  const filteredContacts = getFilteredContacts(filterName);
    
  return (

    <div className="App">
      <h2>Phonebook </h2>
      <ContactForm onSubmit={addContacts} />

      <h2>Contacts</h2>
      <Filter value={filterName} onChange={changeFilter} />
      <ContactList data={filteredContacts} onDeleteContact={deleteContacts} />
    </div>
  )
  
}

