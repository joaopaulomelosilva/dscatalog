import Navbar from "./Navbar";
import { Switch, Route } from "react-router-dom";

import './styles.css';

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
              <h1>User CRUD</h1>
            </Route>
          </Switch>
        </div>
    </div>
  );
};

export default Admin;
