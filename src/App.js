import { fetchData } from './redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NavBar from './components/view/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import SingleTable from './components/features/SingleTable/SingleTable';
import { useState } from 'react';
import Loading from './components/features/Loading';

import { API_URL } from './config';


function App() {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(true);
  console.log(pending)

  useEffect(() => dispatch(fetchData()), [dispatch]);
  fetch(API_URL + '/tables')
    .then((res) => res.json())
    .then(() => setPending(false));
  

  return (
    <Container>
      <NavBar/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/tables/:tableId' element={<SingleTable/>}/>
        <Route path='*' element={<MainPage/>}/>
      </Routes>
      { pending  && <Loading /> }
    </Container>

  );
}

export default App;
