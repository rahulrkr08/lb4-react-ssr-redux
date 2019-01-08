import React from "react";
import {renderToString} from "react-dom/server";
import {StaticRouter, matchPath} from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import Helmet from "react-helmet";
import routes from "../views/routes";
import Layout from "../views/components/Layout";
import createStore, {initializeSession} from "../views/store";

export async function serverRender(options) {
  
  const context = {};
  const store = createStore();
  
  store.dispatch(initializeSession());

  const dataRequirements = routes
    .filter(route => matchPath(options.url, route)) // filter matching paths
    .map(route => route.component) // map to components
    .filter(comp => comp.serverFetch) // check if components have data requirement
    .map(comp => store.dispatch(comp.serverFetch())); // dispatch data requirement

  return Promise.all(dataRequirements).then((res) => {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={options.url}>
          <Layout />
        </StaticRouter>
      </ReduxProvider>
    );
    const reactDom = renderToString(jsx);
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();
    
    // res.writeHead(200, {"Content-Type": "text/html"});
    return htmlTemplate(reactDom, reduxState, helmetData);    
 });
}


function htmlTemplate(reactDom, reduxState, helmetData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      ${helmetData.title.toString()}
      ${helmetData.meta.toString()}
      <title>React SSR 5</title>
    </head>
    
    <body>
      <div id="app">${reactDom}</div>
      <script>
        window.REDUX_DATA = ${JSON.stringify(reduxState)}
      </script>
      <script src="/assets/app.bundle.js"></script>
    </body>
    </html>
  `;
}
