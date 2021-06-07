import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HeaderSidebar from './components/HeaderSidebar.js';
// import Header from './components/Header.js';
import QuotationScreen from './screens/QuotationScreen.js'
import QuotationCreateScreen from './screens/QuotationCreateScreen.js';
import QuotationListScreen from './screens/QuotationListScreen.js';
import CustomerScreen from './screens/CustomerScreen.js'
import CustomerListScreen from './screens/CustomerListScreen.js';
import HomeScreen from './screens/HomeScreen.js';

// TO DO
// ADD CHECKING FOR NONEXISTING ROUTES TO CODE
// + add register and login function + JWT TOKEN ??
// functionalities of quotations + email to customer after creating
// confirm quotations -> to deliver/delivered status -> to invoice status (display status na lang)
// Table view of sales/transactions made (all delivered, iba pa po yung sales sa e-commerce)

function App() {
  return (
    <BrowserRouter>
      <HeaderSidebar />
      <main>
        <Container>
          <Route path='/sales/quotations/:id' component={QuotationScreen} />
          <Route path='/sales/create-quotation' component={QuotationCreateScreen} />
          <Route path='/sales/quotations' exact component={QuotationListScreen} />
          <Route path='/sales/customerlist/:id' component={CustomerScreen} />
          <Route path='/sales/customerlist' exact component={CustomerListScreen} />
          <Route path='/' exact component={HomeScreen} />
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
