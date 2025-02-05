import './styles/App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from "./pages/Login";

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
                        <Link to="/login"> Login </Link>
                    </nav>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>

            </header>
        </div>
      </>
  );
}

export default App;
