import * as React from "react";
import { RouteComponentProps } from "@reach/router";

import UserContext from "../../context/UserContext";

type OwnProps = {};
type Props = RouteComponentProps & OwnProps;

const ProfilePage = (_props: Props) => {
  const user = React.useContext(UserContext);
  return (
    <>
      <h2>Profile</h2>
      {user?.username}
      {user?.name}
    </>
  );
};

export default ProfilePage;
