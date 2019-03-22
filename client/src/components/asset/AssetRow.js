import React from "react";
import { Link } from "@reach/router";

const AssetRow = ({ item }) => (
  <tr>
    <td>{item.manufacturer}</td>
    <td>{item.model}</td>
    <td>{item.category}</td>
    <td>{item.serialNumber}</td>
    <td>{item.companyId}</td>
    <td><Link className="btn btn-primary" to={`/assets/item/${item._id}`}>Megtekintés</Link></td>
  </tr>
);

export default AssetRow;
