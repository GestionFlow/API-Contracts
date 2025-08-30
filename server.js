// server.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
const port = 3000;

// Load bundled YAML
const swaggerDocument = YAML.load(path.join(__dirname, './API-Contracts/V1/bundled.yaml'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Swagger UI running at http://localhost:${port}/api-docs`);
});
