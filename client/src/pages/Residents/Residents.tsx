import * as React from "react";
import { RouteComponentProps } from "@reach/router";

type OwnProps = {};
type Props = RouteComponentProps & OwnProps;

const ResidentsPage = (_props: Props) => {
  return <p>This is the second page!</p>;
};

export default ResidentsPage;
