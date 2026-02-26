import './App.css';
import AllPosts from './components/AllPosts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from './components/Create';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import BookAppointment from './components/BookAppointment';

function App() {
  return (
  <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
   <Route path='/' element={<AllPosts/>}/>
   <Route path="/create" element={<Create />} />
   <Route path="/edit" element={<Edit />} />
   <Route path="/book" element={<BookAppointment />} />
   </Routes>
   </BrowserRouter> 
  </>
  );
}

export default App;