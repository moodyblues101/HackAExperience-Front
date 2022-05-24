import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage';
import ExperiencesPage from './pages/ExperiencesPage';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/experiences' element={<ExperiencesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
