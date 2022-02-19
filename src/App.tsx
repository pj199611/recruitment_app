import { FC } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Screens/Dashboard/Dashboard";
import ForgetPassword from "./Screens/ForgetPassword/ForgetPassword";
import Homepage from "./Screens/Homepage/Homepage";
import Login from "./Screens/Login/Login";
import PostJob from "./Screens/PostJob/PostJob";
import ResetPassword from "./Screens/ResetPassword/ResetPassword";
import Signup from "./Screens/Signup/Signup";

const App: FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/forgetpassword" component={ForgetPassword} />
      <Route exact path="/resetpassword" component={ResetPassword} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/postjob" component={PostJob} />
    </Switch>
  );
};
export default App;
