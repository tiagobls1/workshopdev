// Configurando servidor

const express = require("express")
const server = express()
const db = require("./db")

// Configurando arquivos státicos (css, scripts, imagens)

// Criando Array:

/* const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso de Programação",
        category: "Estudo",
        description: "Lorem, ipsum dolor sit amet consectetur ",
        url: "https://www.google.com.br"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercicios",
        category: "Saúde",
        description: "orem, ipsum dolor sit amet consectetur adipisicing elit",
        url: "https://www.google.com.br"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
        url: "https://www.google.com.br"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Diversao em família",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
        url: "https://www.google.com.br"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title: "Pintura",
        category: "Criatividade",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
        url: "https://www.google.com.br"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
        title: "Recortes",
        category: "Criatividade",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
        url: "https://www.google.com.br"
    },

] */

server.use(express.static("public"))

//habilitar uso do req.body

server.use(express.urlencoded({extended: true}))

//Configuração do nunjucks

const nunjucks = require ("nunjucks")
    nunjucks.configure("views", {
        express: server,
        noCache: true,

    })
   
// Criando uma rodt com  a "/" ,
// e capturando o pedido do cliente para responder.

server.get("/", function(req, res){

     db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de dados")
        }

        const reversedIdeas = [...rows].reverse()
        
        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if(lastIdeas.length < 2) {

                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", {ideas: lastIdeas})
        }) 

    
})

server.get("/ideias", function(req, res){


    db.all(`SELECT * FROM ideas`, function(err, rows) {

        if (err) {
            console.log(err)
            return res.send("Erro no Banco de dados")
        }

        const reversedIdeas = [...rows].reverse()
       
        return res.render("ideias.html", {ideas: reversedIdeas})

    })

})

server.post("/", function(req, res){
     //Inserir dados na tabela
     const query = `

     INSERT INTO ideas(
         image,
         title,
         category,
         description,
         link
     ) VALUES (?,?,?,?,?);
 `   
     const values = [
         
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
         
     ]
     db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de dados")
        }
 
         return res.redirect("/ideias")
     }) 
})

// startando o servidor na parta 3000
server.listen(3000)