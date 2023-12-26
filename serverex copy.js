const express = require ('express')
const morgan = require ('morgan')
const app = express ()



// monte um array de produtos com campos de id, nome, marca, descrição, preço e quantidade em estoque. Seja criativo nos itens desse array, apresentando produtos reais em um número de 10 a 15 itens
let produtos = [
    {
      "id": 1,
      "nome": "Smartphone Galaxy S22",
      "marca": "Samsung",
      "descrição": "Última geração de smartphone com 5G e câmera de 108 MP.",
      "preço": 1199.99,
      "quantidade_em_estoque": 35
    },
    {
      "id": 2,
      "nome": "Notebook Gamer VX5",
      "marca": "Asus",
      "descrição": "Notebook com placa de vídeo dedicada e processador de alta velocidade para jogos.",
      "preço": 2500.00,
      "quantidade_em_estoque": 20
    },
    {
      "id": 3,
      "nome": "Tênis Runner High",
      "marca": "Nike",
      "descrição": "Tênis para corrida com tecnologia de amortecimento e suporte para longas distâncias.",
      "preço": 130.00,
      "quantidade_em_estoque": 50
    },
    {
      "id": 4,
      "nome": "Cafeteira Express Pro",
      "marca": "Oster",
      "descrição": "Cafeteira expresso com controle de temperatura e pressão.",
      "preço": 299.90,
      "quantidade_em_estoque": 15
    },
    {
      "id": 5,
      "nome": "Smart TV 4K 50''",
      "marca": "LG",
      "descrição": "Televisão inteligente com resolução 4K, HDR e conectividade inteligente.",
      "preço": 4500.00,
      "quantidade_em_estoque": 25
    },
    {
      "id": 6,
      "nome": "Console PlayStation 5",
      "marca": "Sony",
      "descrição": "Console de última geração com SSD ultra-rápido e gráficos em 4K.",
      "preço": 5000.00,
      "quantidade_em_estoque": 10
    },
    {
      "id": 7,
      "nome": "Perfume Elegance",
      "marca": "Chanel",
      "descrição": "Perfume com aroma floral para uma sensação de frescor duradouro.",
      "preço": 350.00,
      "quantidade_em_estoque": 40
    },
    {
      "id": 8,
      "nome": "Câmera Mirrorless Alpha",
      "marca": "Sony",
      "descrição": "Câmera profissional com lentes intercambiáveis e alta resolução.",
      "preço": 3200.00,
      "quantidade_em_estoque": 15
    },
    {
      "id": 9,
      "nome": "Headphone Noise Cancelling",
      "marca": "Bose",
      "descrição": "Fones de ouvido com cancelamento de ruído ativo e som de alta fidelidade.",
      "preço": 599.99,
      "quantidade_em_estoque": 30
    },
    {
      "id": 10,
      "nome": "Drone Explorer X2",
      "marca": "DJI",
      "descrição": "Drone com câmera 4K e estabilização de imagem para gravação aérea.",
      "preço": 1500.00,
      "quantidade_em_estoque": 12
    },
    {
      "id": 11,
      "nome": "Kit de Ferramentas Master 200",
      "marca": "Tramontina",
      "descrição": "Kit completo com ferramentas variadas para reparos e manutenção doméstica.",
      "preço": 250.00,
      "quantidade_em_estoque": 50
    },
    {
      "id": 12,
      "nome": "Tablet ProTab 11",
      "marca": "Apple",
      "descrição": "Tablet com processador rápido e tela de retina para profissionais criativos.",
      "preço": 850.00,
      "quantidade_em_estoque": 20
    }
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
    res.status(200).json (produto)
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


     //app.post('/api/produtos',express.json(),(req,res)=>{
      //res.status (200).send (`Recebido o nome: ${req.body.nome}`)})

app.use ((req, res) => {
    res.status(404).send (`<h2>Erro 404 - Recurso não encontrado</h2>`)
})


app.listen (3000, () => {
    console.log ('Servidor rodando na porta 3000')
})
