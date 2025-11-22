import "./index.css"
import "@fontsource/merriweather"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import Register from "./views/Register"
import Login from "./views/Login"
import MyRegistrations from "./views/MyRegistrations"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
