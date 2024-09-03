import { Route, Routes } from "react-router-dom";
import API from "./pages/aplication";
import TeamsPage from "./pages/TeamsPages";
import TeamsForm from "./pages/TeamsForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/navbar";
function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<API />} />
    <Route path="/equipo" element={<TeamsPage />} />
    <Route path="/new" element={<TeamsForm/>} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
