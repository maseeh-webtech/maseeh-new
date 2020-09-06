import * as React from "react";
import { RouteComponentProps } from "@reach/router";

type OwnProps = {};
type Props = RouteComponentProps & OwnProps;

const SecondPage = (_props: Props) => {
  return <p>This is the second page!</p>;
};

export default SecondPage;
