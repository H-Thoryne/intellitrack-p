import axios from "axios";
import {
  LOAD_ALL_PROJECTS_REQUEST,
  LOAD_ALL_PROJECTS_SUCCESS,
  LOAD_ALL_PROJECTS_FAILURE
} from "./types";
import { getErrors, resetErrors } from "./errorActions";
import { setNotification } from "./notificationActions";

export const addProject = projectInfo => async dispatch => {
  try {
    await axios.post("/api/projects", projectInfo);
    dispatch(resetErrors());
    dispatch(
      setNotification({
        message: "Helyszín sikeresen hozzáadva az adatbázishoz",
        alertType: "success"
      })
    );
  } catch (err) {
    const error = err.response.data;
    dispatch(getErrors(error));
    if (error.collision) {
      dispatch(
        setNotification({ message: error.collision, alertType: "danger" })
      );
    }
  }
};

export const fetchProjects = () => async dispatch => {
  try {
    dispatch({ type: LOAD_ALL_PROJECTS_REQUEST });
    const { data } = await axios.get("/api/projects/all");
    dispatch({ type: LOAD_ALL_PROJECTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: LOAD_ALL_PROJECTS_FAILURE });
    dispatch(getErrors(err.response.data));
  }
};

export const deleteProject = id => async dispatch => {
  try {
    await axios.delete(`api/projects/${id}`);
    dispatch(fetchProjects());
  } catch (e) {
    console.log(e);
  }
};
