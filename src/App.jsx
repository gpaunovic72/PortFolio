import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/index.jsx";
import Header from "./components/Header/index.jsx";
import ScrollToTop from "./components/ScrollToTop/index.jsx";
import AdminPage from "./pages/Admin/index.jsx";
import Experiences from "./pages/Experiences/index.jsx";
import Home from "./pages/Home/index.jsx";
import ProjectDetail from "./pages/ProjectDetail/index.jsx";

function App() {
  return (
    <BrowserRouter basename="/PortFolio">
      <div className="app">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Home />} />
          <Route path="/experience" element={<Experiences />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
