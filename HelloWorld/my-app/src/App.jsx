import { Routes, Route } from "react-router-dom";
import TableComponent from "./components/TableComponent";
import DetailsPage from "./components/DetailsPage";
import CompareColumns from "./components/CompareColumns";
import CompareRows from "./components/CompareRows";
import LoginPage from "./components/LoginPage"; // ✅ Import Login Page
import RegisterPage from "./components/RegisterPage"; // ✅ Import Register Page

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<TableComponent />} />
      <Route path="/details" element={<DetailsPage />} />
      <Route path="/compare" element={<CompareColumns />} />
      <Route path="/compare-rows" element={<CompareRows />} />
    </Routes>
  );
}

export default App;
