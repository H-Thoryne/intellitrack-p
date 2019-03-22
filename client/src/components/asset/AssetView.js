import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  fetchCurrentAsset,
  deleteCurrentAsset
} from '../../actions/assetActions';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';
import MapContainer from './MapContainer';
import { Link } from '@reach/router';

class AssetView extends Component {
  componentDidMount = () => {
    this.props.fetchCurrentAsset(this.props.itemId);
  };

  componentWillUnmount = () => {
    this.props.deleteCurrentAsset();
  };

  renderAssetView = () => {
    const { item, error } = this.props;

    if (error.message) {
      return (
        <div>
          <p className="text-danger">Hiba: {error.message}</p>
        </div>
      );
    }

    if (!isEmpty(error)) {
      return (
        <div>
          <p className="text-danger">Hiba: {error}</p>
        </div>
      );
    }

    return (
      !isEmpty(item) && (
        <Fragment>
          <div className="profile-left">
            <div className="asset-image__container">
              <img
                src={item.imgUrl}
                alt="asset"
                className="asset-image__image"
              />
            </div>
            <dl>
              <dt>Gyártó:</dt>
              <dd>{item.manufacturer}</dd>
              <dt>Modell:</dt>
              <dd>{item.model}</dd>
              <dt>Típus:</dt>
              <dd>{item.category}</dd>
              <dt>Beszerzés:</dt>
              <dd>{new Date(item.dateBuy).toLocaleDateString()}</dd>
              <dt>Sorozatszám:</dt>
              <dd>{item.serialNumber}</dd>
              <dt>Leltári szám:</dt>
              <dd>{item.companyId}</dd>
            </dl>
          </div>
          <div className="profile-right">
            <div className="mb-3" style={{display: "flex", justifyContent: "space-between", alignItems:"center"}}>
              <h1>Eszköz adatlap</h1>
              <Link to={`/assets/item/edit/${item._id}`} className="btn btn-primary">
                <i className="fas fa-edit" /> Szerkeszt
              </Link>
            </div>

            <div>
              <h2>Utolsó ismert helyszín</h2>
              <MapContainer assetId={item._id} />
            </div>

            <div>
              <h2>Javítások</h2>
              <p>Fejlesztés alatt...</p>
            </div>

            <div>
              <h2>Szállítások</h2>
              <p>Fejlesztés alatt...</p>
            </div>
          </div>
        </Fragment>
      )
    );
  };

  render() {
    return (
      <div className="container" style={{ display: 'flex' }}>
        {this.props.isLoading ? <Spinner /> : this.renderAssetView()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  item: state.assets.currentItem,
  isLoading: state.assets.isLoading
});

const mapDispatchToProps = {
  fetchCurrentAsset,
  deleteCurrentAsset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetView);
