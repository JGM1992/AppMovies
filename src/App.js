import React from "react"
import Login from './components/login';
import { useSelector } from "react-redux"
import { selectUser } from "./redux/userSlice"
import Menu from "./components/menu"

function App() {
  const user = useSelector(selectUser);

  return (
        <React.Fragment>
            { user ? <Menu /> : <Login />}
        </React.Fragment>
    )
}

export default App;
