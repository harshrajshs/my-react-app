import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowDetails from './Page2/ShowDetails';
import WelcomePage from './Page1/WelcomePage';
import ModifyUserForm from './Page2/ModifyUserForm';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/details" element={<ShowDetails />} />
        <Route
          path="/modify-user/:employeeId" element={<ModifyUserForm />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
