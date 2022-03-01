import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import Toast from './components/Toast'
import LayoutDefault from './components/LayoutDefault'
import Home from './pages/Home'
import List from './pages/List'
import Create from './pages/Create'

function Routes() {

  return (
    <Router>
      <LayoutDefault>
        <Switch>
          <Route key={2} path="/listMeds" element={<List/>} />
          <Route key={3} path="/createMeds" element={<Create/>} />
          <Route key={1} path="/" element={<Home/>} />
        </Switch>
      </LayoutDefault>
      <Toast></Toast>
    </Router >
  )
}

export default Routes;
