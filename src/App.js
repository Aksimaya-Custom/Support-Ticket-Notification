import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Default from './pages/Default';
import Homepage from './pages/Homepage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='*' element={<Default />} />
      </Routes>
    </Router>
  )
}

export default App;