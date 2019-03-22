// React
import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { fetchAssets } from "../../actions/assetActions";
import { setNotification } from "../../actions/notificationActions";

// Components
import Spinner from "../common/Spinner";
import AssetRow from "./AssetRow";

// Utility
import queryString from "query-string";
import validateAssetQuery from "../../validation/assets";
import isEmpty from "../../validation/is-empty";
import { navigate, Link } from "@reach/router";

class AssetList extends Component {
  componentDidMount = () => {
    // Check query string for asset pagination
    let { page, limit } = queryString.parse(this.props.location.search);
    // Validate query strings
    const isValid = validateAssetQuery(page, limit);
    // Default loads the first page with 10 assets
    if (!isValid) {
      navigate("/assets?page=1&limit=10");
      return this.props.fetchAssets(1, 10);
    }
    return this.props.fetchAssets(page, limit);
  };

  render() {
    const { isLoading } = this.props.assets;

    return (
      <div className="container">
        <h1>Eszközlista</h1>
        <Link to="/assets/add" className="btn btn-primary mb-3">
          <i className="fas fa-plus" /> Új eszköz felvétele
        </Link>
        {isLoading ? <Spinner /> : LoadedContent(this.props.assets.items)}
      </div>
    );
  }
}

const LoadedContent = items =>
  // Handle empty array of items
  items.length === 0 ? (
    <div className="assets">
      <h2>Ezen az oldalon nem található eszköz!</h2>
    </div>
  ) : (
    <div className="assets">
      <table className="table table-responsive-lg">
        <thead>
          <tr>
            <th scope="col">Gyártó</th>
            <th scope="col">Modell</th>
            <th scope="col">Kategória</th>
            <th scope="col">Gyári szám</th>
            <th scope="col">Leltári szám</th>
            <th scope="col">Adatlap</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(items) &&
            items.map(item => <AssetRow item={item} key={item._id} />)}
        </tbody>
      </table>
    </div>
  );

const mapStateToProps = state => ({
  assets: state.assets
});

const mapDispatchToProps = {
  fetchAssets,
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetList);
