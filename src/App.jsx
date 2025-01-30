import { Routes, Route } from "react-router";
import Home from "./Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
