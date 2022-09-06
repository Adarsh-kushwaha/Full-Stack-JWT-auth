import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import LoginScreen from './components/LoginScreen';
import PrivateRoute from './components/Private/PrivateRoute';
import PrivateScreen from './components/Private/PrivateScreen';
import RegisterScreen from './components/RegisterScreen';
import ResetPasswordScreen from './components/ResetPasswordScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <PrivateRoute exact path="/" component={<PrivateScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path='/register' element={<RegisterScreen />} />
        <Route exact path="/forgotpassword" element={<ForgotPasswordScreen />} />
        <Route exact path="/resetpassword" element={<ResetPasswordScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App