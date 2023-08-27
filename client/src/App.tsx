import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignInPage from "./screens/SignInPage";
import RegistrationPage from "./screens/RegistrationPage";
import { useAppSelector } from "./store/store";
import HomePage from "./screens/HomePage";
import OtpVerification from "./screens/OtpVerification";

const App = () => {
  const isAuth = useAppSelector(state => state.person.userInfo)
  const isVerified = useAppSelector(state => state.person.userInfo?.verified === true)
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isVerified ? <HomePage/> : <SignInPage/>}/>
          <Route path="/register" element={isVerified ? <HomePage/> : <RegistrationPage/>}/>
          <Route path="/home" element={isVerified ? <HomePage/> : <SignInPage/>} />
          <Route path="/otp-verification" element={isAuth ? <OtpVerification/> : <SignInPage/>}/>
          <Route path="*" element={<Navigate to={isVerified ? "/home" : '/'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App