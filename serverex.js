const express = require ('express')
const morgan = require ('morgan')
const app = express ()



// monte um array de produtos com campos de id, nome, marca, descrição, preço e quantidade em estoque. Seja criativo nos itens desse array, apresentando produtos reais em um número de 10 a 15 itens
let produtos = [
  { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
  { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
  { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
  { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
  { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
]

app.use (express.json())
//app.use(express. urlencoded())
app.use (express.urlencoded ({extended:true}))

//app.use ((req, res, next) => {
  // console.log (`Data: ${new Date()} - Method: ${req.method} - URL: ${req.url}`)
    //next ()
//})

app.use (morgan('common'))

app.use('/site', express.static ('public', {extensions:['html','htm']}))

app.get ('/',(req, res, next) => {
  console.log (`Data: ${new Date()} - Method: ${req.method} - URL: ${req.url}`)
  next ()
},
(req, res)  => {
    res.send (`Hello to API World<br>
        <a href="/api/produtos">API de Produtos</a>`)
})

app.get ('/api/produtos', (req, res) => { 
    let sort = req.query.sort
    if (sort) {
        produtosOrdenados = produtos.sort ((a, b) => a[sort].localeCompare (b[sort]))
        res.status(200).json (produtosOrdenados)
    }
    else
        res.status(200).json (produtos)
})

app.get ('/api/produtos/:id', (req, res) => {
                      let id = parseInt (req.params.id)
                      let produto = produtos.find (p => p.id === id)
                      let produtoIndex = produtos.findIndex (p => p.id === id)

                      if (produtoIndex === -1) {
                        res.status(404).send('Produto não encontrado')
                      } else {

                      res.status(200).json (produto)
                      }
                  })

app.post('/api/produtos',(req,res)=>{
                      let produto = req.body
                      let maxID = Math.max.apply (Math, produtos.map (p=>p.id))
                      produto.id = maxID + 1 
                      produtos.push (produto)
                      res.status (201).json ({message: `Produto ${produto.nome}  criado com sucesso!`,
                                        data:{
                                          id: produto.id,
                                          nome: produto.nome,
                                        }})

                                      })

 app.delete('/api/produtos/:id', (req, res) => {
                    
                    let produtoId = parseInt(req.params.id)
                    let produtoIndex = produtos.findIndex(p => p.id === produtoId)
                    
                
                    if (produtoIndex === -1) {
                        res.status(404).send('Produto não encontrado')
                    } else {
                        let deletedProduct = produtos.splice(produtoIndex, 1)
                        res.status (201).json ({message: `Produto ${produtoId}  deletado com sucesso!`, })
                    }
                });
 

app.put('/api/produtos/:id', (req, res) => {
                  let produtoId = parseInt(req.params.id);
                  let produtoIndex = produtos.findIndex(p => p.id === produtoId);
              
                  if (produtoIndex === -1) {
                      res.status(404).send('Produto não encontrado');
                  } else {
                      produtos[produtoIndex] = { ...req.body, id: produtoId };
                      
                      res.json(produtos[produtoIndex]);
                  }
              });

    

app.use ((req, res) => {
                    res.status(404).send (`<h2>Erro 404 - Recurso não encontrado</h2>`)
})


app.listen (3000, () => {
    console.log ('Servidor rodando na porta 3000')
})
