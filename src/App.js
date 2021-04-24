import React from "react"
import Login from './components/login';
import { useSelector } from "react-redux"
import { selectUser } from "./redux/userSlice"
import Home from "./components/home"

function App() {
  const user = useSelector(selectUser);

  return (
        <React.Fragment>
            { user ? <Home /> : <Login />}
        </React.Fragment>
    )
}

export default App;
