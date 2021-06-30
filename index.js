import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";

import "./scss/global.scss";
import App from "./App";
import { MediaQueryContextProvider } from "./new-src/context/media-query-context";

const client = new ApolloClient({
  uri: "https://socialocean.myshopify.com/api/2020-07/graphql.json",
  cache: new InMemoryCache(),
  headers: {
    "X-Shopify-Storefront-Access-Token": "06fca029022c0b4f3eecb897c0218d53",
  },
});

ReactDOM.render(
  <MediaQueryContextProvider>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </MediaQueryContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
