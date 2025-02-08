import './styles/App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageCourse from "./pages/ManageCourse";
import ManageStudent from "./pages/ManageStudent";
import Logout from "./pages/Logout";

function App() {
  return (
      <>
        <div className="App">
            <header className="App-header">
                <h2>
                    Welcome to Student Course System
                </h2>
                <div>
                    <nav>
                        <Link to="/login"> [Login] </Link> ||
                        <Link to="/courses"> [Manage Course] </Link> ||
                        <Link to="/students"> [Manage Students] </Link> ||
                        <Link to="/logout"> [Logout] </Link>
                    </nav>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/courses"
                            element={
                                <ProtectedRoute>
                                    <ManageCourse />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/students"
                            element={
                                <ProtectedRoute adminOnly={true}>
                                    <ManageStudent />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/logout"
                            element={
                                <ProtectedRoute>
                                    <Logout />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </header>
        </div>
      </>
  );
}

export default App;
