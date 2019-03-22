import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCurrentAsset,
  deleteCurrentAsset,
  editCurrentAsset
} from "../../actions/assetActions";
import { resetErrors } from "../../actions/errorActions";
import TextFieldGroup from "../common/TextFieldGroup";

class EditAsset extends Component {
  state = {
    fields: {
      manufacturer: "",
      model: "",
      category: "",
      serialNumber: "",
      companyId: "",
      imgUrl: "",
      dateBuy: ""
    },
    isLoaded: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !prevState.isLoaded &&
      nextProps.item &&
      nextProps.item.manufacturer !== prevState.fields.manufacturer
    ) {
      const {
        manufacturer,
        model,
        category,
        serialNumber,
        companyId,
        imgUrl,
        dateBuy
      } = nextProps.item;
      return {
        isLoaded: true,
        fields: {
          manufacturer,
          model,
          category,
          serialNumber,
          companyId,
          imgUrl,
          dateBuy: new Date(dateBuy).toISOString().slice(0, 10)
        }
      };
    }
    return null;
  }

  componentDidMount = () => {
    this.props.fetchCurrentAsset(this.props.itemId);
  };

  componentWillUnmount = () => {
    this.props.deleteCurrentAsset();
    this.props.resetErrors();
  };

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      fields: { ...prevState.fields, [e.target.name]: e.target.value }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const updatedAsset = { ...this.state.fields, id: this.props.item._id };
    if(window.confirm("Biztos, hogy frissíted az eszközt? A művelet visszavonhatatlan!")){
      this.props.editCurrentAsset(updatedAsset);
    }
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="container">
        <h1>Eszköz szerkesztése:</h1>
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
            <i className="fas fa-plus" /> Eszköz szerkesztése
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.assets.currentItem,
  errors: state.errors
});

const mapDispatchToProps = {
  fetchCurrentAsset,
  deleteCurrentAsset,
  editCurrentAsset,
  resetErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAsset);
