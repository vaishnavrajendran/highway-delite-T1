import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { setLogout } from "../store/Features/userSlice";
import { useAppDispatch } from "../store/store";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear()
    dispatch(setLogout())
    navigate('/')
  };
  
  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div className="container mx-auto mt-8 text-center">
        <h1 className="text-4xl font-bold">Welcome to Our Website!</h1>
        <p className="mt-4 text-lg">Enjoy your stay.</p>
      </div>
    </div>
  );
}

export default HomePage