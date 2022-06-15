import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Books, Notfound, Rent, Students } from "./pages";
import { ProtectedRoutes } from "./ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/books" element={<Books />} />
          <Route path="/students" element={<Students />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/*" element={<Notfound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
