// This component is used for active links on navbar

import React from "react";
import { Link } from "@reach/router";
import classNames from "classnames";

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: classNames(props.className, { active: isCurrent })
      };
    }}
  />
);

export default NavLink;
