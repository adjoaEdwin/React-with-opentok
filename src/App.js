import React, { Fragment } from "react";
import { OTStreams, preloadScript, OTSession } from "opentok-react";

import "./styles.css";
import ConnectionStatus from "./components/ConnectionStatus";
import Publisher from "./components/Publisher";
import Subscriber from "./components/Subscriber";

function App({ apiKey, sessionId, token }) {
  const [connected, setConnected] = React.useState(false);
  const [error, setError] = React.useState(null);

  const sessionEvents = {
    sessionConnected: () => {
      setConnected(true);
    },

    sessionDisconnected: () => {
      setConnected(false);
    }
  };

  const onError = (err) => {
    setError(`Failed to connect to ${err.message}`);
  };

  // React.useEffect(() => {
  //   OT.registerScreenSharingExtension('chrome', 'baz', 2)
  // })

  return (
    <Fragment>
      <OTSession
        apiKey={apiKey}
        sessionId={sessionId}
        token={token}
        eventHandlers={sessionEvents}
        onError={onError}
      >
        {error ? <div style={{ color: "red" }}>{error}</div> : null}
        <ConnectionStatus connected={connected} />
        <Publisher />
        <OTStreams>
          <Subscriber />
        </OTStreams>
      </OTSession>
    </Fragment>
  );
}

export default preloadScript(App);
