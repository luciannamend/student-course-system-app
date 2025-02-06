import './styles/App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageCourse from "./pages/ManageCourse";
import ManageStudent from "./pages/ManageStudent";

function App() {
  return (
      <>
        <div className="App">
            <header className="App-header">
                <p>
                    Welcome to Student Course System
                </p>
                <div>
                    <nav>
                        <Link to="/login"> [Login] </Link> ||
                        <Link to="/courses"> [Manage Course] </Link> ||
                        <Link to="/students"> [Manage Students] </Link>
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
                                <ProtectedRoute>
                                    <ManageStudent />
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
