import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Room from "./pages/Room"
const App = () => {

  
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/room/:id" element={<Room/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App