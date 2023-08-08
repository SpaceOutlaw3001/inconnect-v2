import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import * as Sentry from "@sentry/react";

Sentry.init({
    dsn: "https://44cb5d6573b07df0ef15a932116676d1@o312764.ingest.sentry.io/4505669751078912",
    integrations: [
        new Sentry.BrowserTracing({
            // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: ["https://inconnect.ijo42.ru/api/"],
        }),
        new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

// Init VK Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(<App/>, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
    import("./eruda").then(({default: eruda}) => {
    }); //runtime download
}
