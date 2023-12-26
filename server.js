
const http = require('http'); 

const server = http.createServer((req, res) => {
  res.statusCode = 200; 
  res.setHeader('Content-Type', 'application/json'); 
  res.end('{ "nome": "Rommel Carneiro", "cidade": "Belo Horizonte" }');
 // res.setHeader('Content-disposition', 'attachment; filename=alunos.json' )
});

const hostname = '127.0.0.1';
const port = 3000;
server.listen(port, hostname, () => {
  console.log(` Servidor rodando http://${hostname}:${port}/`);
});
