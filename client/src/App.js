import React, { Component } from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/authentication/Login";
import { Router } from "@reach/router";

// Components
import Navbar from "./components/layout/Navbar";
import NotExist from "./components/common/NotExist";
import Landing from "./components/layout/Landing";
import checkToken from "./utils/checkToken";
import AssetList from "./components/asset/AssetList";
import AssetView from "./components/asset/AssetView";
import LocationContainer from "./components/location/LocationContainer";
import CreateLocation from "./components/location/CreateLocation";
import CreateAsset from "./components/asset/CreateAsset";
import EditAsset from "./components/asset/EditAsset";
import AuthCheck from "./components/authentication/AutchCheck";
import Notification from "./components/common/Notification";

// Check if auth token valid
checkToken(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navbar />
        <Notification />
        <Router>
          <Landing path="/" />
          <NotExist default />
          <Login path="/login" />
          <AuthCheck path="/">
            <NotExist default />
            <AssetList path="assets" />
            <CreateAsset path="assets/add" />
            <AssetView path="assets/item/:itemId" />
            <EditAsset path="assets/item/edit/:itemId" />
            <LocationContainer path="/locations" />
            <CreateLocation path="/locations/add" />
          </AuthCheck>
        </Router>
      </Provider>
    );
  }
}

export default App;
