import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Pages/HomePage';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              {/* Link to the home page */}
              <Link to="/homepage" style={{ color: 'blue', textDecoration: 'none', padding: '10px' }}>Home</Link>
            </li>
            {/* Add more <li> tags with <Link> components for additional navigation options */}
          </ul>
        </nav>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/homepage' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
