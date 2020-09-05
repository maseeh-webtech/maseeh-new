import * as React from "react";
import { RouteComponentProps } from "@reach/router";

// Pages used by the router need RouteComponentProps to typecheck properly
type OwnProps = {};
type Props = RouteComponentProps & OwnProps;

const Homepage = (_props: Props) => {
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <p>This is a message fetched from the server via API call:</p>
      <p>{message}</p>
      <br />
      <h2>Some interesting content</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar velit sit amet
        nibh tincidunt dapibus. Praesent interdum urna eu massa viverra maximus. Curabitur ut
        posuere mauris, vel porta eros. Integer sed molestie elit. Etiam mollis lobortis metus eget
        eleifend. Maecenas venenatis et nisi in tempus. Vivamus id lacus eget diam venenatis
        volutpat eget id turpis. Mauris ac mattis neque. Phasellus sit amet mi at nisl vehicula
        dignissim. Integer eu urna pulvinar, viverra leo in, volutpat erat. Nulla porttitor sapien
        ac sem feugiat, efficitur consectetur nulla varius. Quisque tempor est tempor eros egestas
        tincidunt. Ut luctus varius ligula a scelerisque. Duis lacinia ipsum ante, quis accumsan sem
        interdum a. Aenean id ante leo. Donec sodales lobortis turpis sit amet ullamcorper. Nulla
        ultricies ipsum et condimentum vehicula. Etiam rhoncus augue vitae orci pulvinar fermentum.
        Aliquam erat volutpat. Etiam magna ligula, rhoncus ac vehicula ut, aliquet non diam.
        Vestibulum sed massa lacus. Sed pellentesque neque eu ligula tempus ornare. Quisque mollis
        mauris et turpis blandit, in commodo mauris blandit. Praesent ut euismod elit. Sed viverra
        lectus sit amet nibh tempus, sed varius sem sodales. Duis nec ante quis dolor elementum
        pharetra. Duis nisl diam, congue ut viverra non, maximus ut risus. Aenean suscipit facilisis
        nisi. Ut aliquet mollis dui quis imperdiet. Quisque nec feugiat ipsum. Praesent finibus
        scelerisque sapien at pellentesque. Donec malesuada auctor risus eu tempus. Duis ac augue et
        tortor gravida convallis. Duis blandit eros velit, vel dignissim risus volutpat sed. Ut
        dapibus sem ac ipsum consectetur, ut posuere dui suscipit. Sed diam dui, fringilla vitae
        suscipit eu, pulvinar vitae neque. Curabitur quis dolor quis leo laoreet sodales. Vestibulum
        eget purus nunc. Nam mattis tincidunt mauris. Etiam vulputate, nisi non porttitor accumsan,
        est ex suscipit nisl, et tempor dui nisl eu mauris. Curabitur nec ligula molestie, rhoncus
        libero ac, tristique diam. Morbi lacinia auctor quam, et mollis ligula interdum sit amet.
        Nullam vel ultricies dui. Donec sodales vel dui hendrerit facilisis. Nam mauris justo,
        lacinia id dui at, molestie vulputate mauris. Cras vel nulla at dolor consequat hendrerit
        vitae vitae sapien. Pellentesque a egestas erat. Donec ac lacus turpis. Aenean et nunc eu
        purus sagittis ullamcorper a eget dolor. Ut sit amet risus ullamcorper, convallis diam id,
        fermentum felis. Sed condimentum maximus velit vitae auctor. Phasellus in molestie justo.
        Pellentesque augue justo, dapibus sit amet fringilla et, pretium et tortor. Aliquam
        sollicitudin fermentum ex, ut euismod lorem tristique at. Praesent sed ullamcorper mauris.
        Aenean id enim non massa semper convallis. Phasellus commodo lorem diam, in convallis velit
        fringilla ut.
      </p>
    </>
  );
};

export default Homepage;
