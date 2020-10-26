import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "../src/Components/Nav/Nav";
import Main from "./Pages/Main/Main";
import SignUp from "./Pages/Login/SignUp";
import SignIn from "./Pages/Login/SignIn";
import ProductsList from "./Pages/ProductsList/ProductsList";
import Cart from "./Pages/Cart/Cart";
import ProductsDetails from "../src/Pages/ProductsList/productDetails";
import Footer from "../src/Components/Footer/Footer";
import SearchResult from "./Pages/Search/SearchResult";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/search" component={SearchResult} />
          <Route exact path="/product/list" component={ProductsList} />
          <Route exact path="/order/cart" component={Cart} />
          <Route
            exact
            path="/product/list/:id"
            // path="/product/list/:id?sub=:sub"
            component={ProductsDetails}
          />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default Routes;
