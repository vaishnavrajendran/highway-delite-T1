import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./screens/SignInPage";
import RegistrationPage from "./screens/RegistrationPage";
import { useAppSelector } from "./store/store";
import HomePage from "./screens/HomePage";
import OtpVerification from "./screens/OtpVerification";

const App = () => {
  const isAuth = useAppSelector(state => state.person.userInfo)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth ? <HomePage/> : <SignInPage/>}/>
          <Route path="/register" element={isAuth ? <HomePage/> : <RegistrationPage/>}/>
          <Route path="/home" element={isAuth ? <HomePage/> : <SignInPage/>} />
          <Route path="/otp-verification" element={isAuth ? <OtpVerification/> : <SignInPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App