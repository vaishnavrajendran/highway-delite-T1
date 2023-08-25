import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./screens/SignInPage";
import RegistrationPage from "./screens/RegistrationPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage/>}/>
          <Route path="/register" element={<RegistrationPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App