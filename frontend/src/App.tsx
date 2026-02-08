import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<h1>Welcome to MERN App (TypeScript)</h1>} />
        </Routes>
        app
      </div>
    </Router>
  );
}

export default App;
