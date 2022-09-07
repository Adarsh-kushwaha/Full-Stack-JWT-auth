import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import LoginScreen from './components/LoginScreen';
import PrivateRoute from './components/Private/PrivateRoute';
//import PrivateScreen from './components/Private/PrivateScreen';
import RegisterScreen from './components/RegisterScreen';
import ResetPasswordScreen from './components/ResetPasswordScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path='/register' element={<RegisterScreen />} />
        <Route exact path="/forgotpassword" element={<ForgotPasswordScreen />} />
        <Route exact path="/resetpassword/:resetToken" element={<ResetPasswordScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App