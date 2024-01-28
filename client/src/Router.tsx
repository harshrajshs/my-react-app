import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowDetails from './Page2/ShowDetails';
import WelcomePage from './Page1/WelcomePage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/details" element={<ShowDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
