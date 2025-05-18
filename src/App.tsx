import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
