const application = require('../dist');

// Run the application
application.main().then(async (app) => {
  
  await app.boot();

  const responseObject = {
    responses: {
      '200': {
        description: 'Pages',
        content: 'text/html',
      },
    },
  };

  const render = async (request, response) => {
    const options = {
      url: request.url
    };

    response.send(await serverRender(options));
  }

  app.route('get', '/', responseObject, render);
  app.route('get', '/{page}', responseObject, render);

  await app.start();

  require("babel-register")({ presets: ["env"]});
  const { serverRender } = require('./server-render');
    
  console.log(`Server is running on port ${app.restServer.url}`);
});