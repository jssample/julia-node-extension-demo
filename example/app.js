const clustering = require('@maxmouchet/julia-node-extension-demo');
const express = require('express');

const app = express();
const port = 3000;

// TODO: Multithreading (test with a promise?)

// Convert and transpose a JS array of rows to a matrix (column-major storage).
const toJuliaMatrix = (Type, data) => {
  const nr = data.length;
  const nc = data[0].length;
  const matrix = new Type(nr * nc);
  for (let j = 0; j < nr; j += 1) {
    for (let i = 0; i < nc; i += 1) {
      matrix[j * nc + i] = data[j][i];
    }
  }
  return matrix;
};

// TODO: fromJuliaMatrix

process.on('SIGINT', () => process.exit());

app.use(express.json());

app.post('/kmeans', (req, res) => {
  const d = req.body.data[0].length;
  const { k } = req.body;
  const matrix = toJuliaMatrix(Float64Array, req.body.data);
  console.log(clustering.kmeans(matrix, d, k));
  res.send(JSON.stringify(clustering.kmeans(matrix, d, k)));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));