import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { createNewAsset } from '../../actions/assetActions';

class CreateAsset extends Component {
  state = {
    fields: {
      manufacturer: '',
      model: '',
      category: '',
      serialNumber: '',
      companyId: '',
      imgUrl: '',
      dateBuy: ''
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.createNewAsset(this.state.fields);
  };

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      fields: { ...prevState.fields, [e.target.name]: e.target.value }
    }));
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="container">
        <h1>Új eszköz regisztrálása:</h1>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            name="manufacturer"
            error={errors.manufacturer}
            text={this.state.fields.manufacturer}
            onChange={this.onChange}
            placeholder="Márkanév"
            label="Gyártó:"
          />
          <TextFieldGroup
            name="model"
            error={errors.model}
            text={this.state.fields.model}
            onChange={this.onChange}
            label="Modell:"
          />
          <TextFieldGroup
            name="category"
            error={errors.category}
            text={this.state.fields.category}
            onChange={this.onChange}
            label="Kategória:"
            placeholder="pl: fúrógép"
          />
          <TextFieldGroup
            name="serialNumber"
            error={errors.serialNumber}
            text={this.state.fields.serialNumber}
            onChange={this.onChange}
            label="Sorozatszám:"
          />
          <TextFieldGroup
            name="companyId"
            error={errors.companyId}
            text={this.state.fields.companyId}
            onChange={this.onChange}
            label="Leltári szám:"
          />
          <TextFieldGroup
            name="imgUrl"
            error={errors.imgUrl}
            text={this.state.fields.imgUrl}
            onChange={this.onChange}
            label="Eszköz kép hivatkozás:"
          />
          <TextFieldGroup
            name="dateBuy"
            type="date"
            error={errors.dateBuy}
            text={this.state.fields.dateBuy}
            onChange={this.onChange}
            label="Beszerzés dátuma"
          />
          <button onClick={this.onSubmit} className="btn btn-primary mb-3">
            <i className="fas fa-plus" /> Eszköz felvétele
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = {
  createNewAsset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAsset);
