import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// styling
import "../src/style/app.css"
import "bootstrap/dist/css/bootstrap.min.css";

// pages
import LandingPage from "./pages/landingPage";
import AfterLogin from "./pages/afterLogin";
import Detailbooks from "./pages/detailBooks";
import ReadBook from "./pages/readBook";
import Subscribe from "./pages/subscribe";
import ProfileActive from "./pages/profileActive";
import Transaction from "./pages/admin/transaction";
import AddBook from "./pages/admin/addBook";
import Complain from "./pages/complain";
import ComplainAdmin from "./pages/complainAdmin";
import Product from "./pages/admin/product";

// API
import { API, setAuthToken } from "./config/api";

// private route
import PrivateRoute from "./pages/components/privateRoute/private";

// useComtext
import { UserContextToken } from "./context/useContext";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContextToken);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (!state.isLogin) {
      navigate("/");
    } else {
      if (state.user.role === "admin") {
        navigate("/transaction");
      } else if (state.user.role == "user") {
        navigate("/afterLogin");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // data user
      let payload = response.data.data.user;
      payload.token = localStorage.token;

      // send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    // <Router>
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/transaction" element={<Transaction />} />
      <Route exact path="/addBook" element={<AddBook />} />
      <Route exact path="/afterLogin" element={<AfterLogin />} />
      <Route exact path="/subscribe" element={<Subscribe />} />
      <Route exact path="/complain" element={<Complain />} />
      <Route exact path="/complainAdmin" element={<ComplainAdmin />} />
      <Route exact path="/product" element={<Product />} />
      <Route exact path="/detailBooks/:id" element={<Detailbooks />} />
      <Route exact path="/readBook/:id" element={<ReadBook />} />
      <Route exact path="/profileActive" element={<ProfileActive />} />
      <Route exact path="/" element={<PrivateRoute />}>
        {/*  */}
      </Route>
    </Routes>
    // </Router>
  );
}

export default App;
