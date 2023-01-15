import Navbar from "./Navbar";
import { Switch, Route } from "react-router-dom";

import './styles.css';
import Users from "./User";

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar></Navbar>
        <div className="admin-content">
          <Switch>
            <Route path='/admin/products'>
              <h1>Product CRUD</h1>
            </Route>
            <Route path='/admin/categories'>
              <h1>Category CRUD</h1>
            </Route>
            <Route path='/admin/users'>
              <Users></Users>
            </Route>
          </Switch>
        </div>
    </div>
  );
};

export default Admin;
