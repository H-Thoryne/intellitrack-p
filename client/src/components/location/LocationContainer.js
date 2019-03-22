import React, { Component } from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { fetchProjects, deleteProject } from "../../actions/projectActions";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";

class LocationContainer extends Component {
  componentWillMount = () => {
    console.log("cdm")
    this.props.fetchProjects();
  };

  onDeleteClick = (id, e) => {
    if (
      window.confirm(
        "A művelet visszavonhatatlan, tényleg törlöd a projektet a térképről?"
      )
    ) {
      this.props.deleteProject(id);
    }
  };

  render() {
    const { projects, isLoading } = this.props;
    return (
      <div className="container">
        <h1>Raktárak</h1>
        <Link to="/locations/add" className="btn btn-primary mb-3">
          Új raktár hozzáadása
        </Link>
        {projects && !isEmpty(projects) ? (
          <table className="table table-responsive-m ">
            <thead>
              <tr>
                <th>Projekt neve</th>
                <th>Projekt címe</th>
                <th>Szerkesztés</th>
                <th>Törlés</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id}>
                  <td>{project.projectName}</td>
                  <td>{project.address}</td>
                  <td>
                    <Link
                      to={`/locations/${project._id}`}
                      className="btn btn-primary"
                    >
                      <i className="fas fa-edit" />
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={this.onDeleteClick.bind(this, project._id)}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <div>
            <p>Még nincs egyetlen projekt sem az adatbázisban!</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ projects }) => ({
  projects: projects.all,
  isLoading: projects.isLoading
});

const mapDispatchToProps = {
  fetchProjects,
  deleteProject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationContainer);
