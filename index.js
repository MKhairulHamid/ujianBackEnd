const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const mysql = require ('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hamid',
    password : 'hamid123',
    database : 'tokokasih',
  multipleStatements : false
})

const PORT = 5000

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.status(202).send('<h1> Selamat Datang Ujian <h1>')
})
// tabel 1

app.get('/categories/', (req,res) => {
    console.log(req.query)
    const query = `select c1.id, c1.category as category, c2.category as parentCategory
    from categories c1 left join categories c2
    on c1.parentId = c2.id;`
    connection.query(query, (err, results, fields) => {
        if (err) {
            return res.status(500).send(err)
        };

         res.status(200).send(results)
      });
})

app.delete('/categories/:id', (req,res) => {
    console.log(req.params)
    const query = `DELETE FROM categories WHERE id = ${connection.escape(req.params.id)}`;

    connection.query(query, (err,results) => {
        if(err){
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})

app.post('/categories',(req,res) => {
    console.log('Query :',req.query)
    console.log('Query :',req.body)

    const query = ` INSERT INTO categories SET ? ;` 
    console.log(query)

    connection.query(query, req.body, (err,results) => {
        if(err) {
            return res.status(500).send(err)
        }
        // console.log(results)
        res.status(200).send(results)
    })

})

app.get('/categories/:id', (req,res) => {
    console.log(req.query)
    const query = `select c1.id, c1.category as category, c2.category as parentCategory
    from categories c1 left join categories c2
    on c1.parentId = c2.id where c1.id = ${connection.escape(req.params.id)};`
    connection.query(query, (err, results, fields) => {
        if (err) {
            return res.status(500).send(err)
        };

         res.status(200).send(results)
      });
})

app.put('/categories/:id', (req,res) => {
    console.log(req.params)
    console.log(req.body)

    const query = `UPDATE categories SET ? WHERE id = ${connection.escape(req.params.id)}`
    console.log(query)

    connection.query(query, req.body, (err,results) =>{
        if(err){
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })
})


//tabel 2
app.get('/products/', (req,res) => {
    console.log(req.query)
    const query = `select * from products;`
    connection.query(query, (err, results, fields) => {
        if (err) {
            return res.status(500).send(err)
        };

         res.status(200).send(results)
      });
})

app.delete('/products/:id', (req,res) => {
    console.log(req.params)
    const query = `DELETE FROM products WHERE id = ${connection.escape(req.params.id)}`;

    connection.query(query, (err,results) => {
        if(err){
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})

app.post('/products',(req,res) => {
    console.log('Query :',req.query)
    console.log('Query :',req.body)

    const query = ` INSERT INTO products SET ? ;` 
    console.log(query)

    connection.query(query, req.body, (err,results) => {
        if(err) {
            return res.status(500).send(err)
        }
        // console.log(results)
        res.status(200).send(results)
    })

})


app.get('/products/:id', (req,res) => {
    console.log(req.query)
    const query = `select * from products where products.id = ${connection.escape(req.params.id)};`
    connection.query(query, (err, results, fields) => {
        if (err) {
            return res.status(500).send(err)
        };

         res.status(200).send(results)
      });
})

app.put('/products/:id', (req,res) => {
    console.log(req.params)
    console.log(req.body)

    const query = `UPDATE products SET ? WHERE id = ${connection.escape(req.params.id)}`
    console.log(query)

    connection.query(query, req.body, (err,results) =>{
        if(err){
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })
})

//tabel 3

app.get('/productcat/', (req,res) => {
    console.log(req.query)
    const query = `select pc.id as Id , p.nama as Product, c.category as Category
    from products p left join productcat pc
    on p.id = pc.productId 
    left join categories c 
    on pc.categoryId = c.id;`
    connection.query(query, (err, results, fields) => {
        if (err) {
            return res.status(500).send(err)
        };

         res.status(200).send(results)
      });
})


app.delete('/productcat/:productId', (req,res) => {
    console.log(req.params)
    const query = `DELETE FROM productcat WHERE productId = ${connection.escape(req.params.productId)}`;

    connection.query(query, (err,results) => {
        if(err){
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})

app.post('/productcat',(req,res) => {
    console.log('Query :',req.query)
    console.log('Query :',req.body)

    const query = ` INSERT INTO productcat SET ? ;` 
    
    console.log(query)

    connection.query(query, req.body, (err,results) => {
        if(err) {
            return res.status(500).send(err)
        }
        // console.log(results)
        res.status(200).send(results)
    })

})


app.get('/productcatoption', (req,res) => {
    console.log(req.query)
    const query = `SELECT c1.id, c1.category
    FROM categories c1 LEFT JOIN categories c2 
    ON c2.parentId = c1.id
    WHERE c2.id IS NULL;`
    connection.query(query, (err, results, fields) => {
        if (err) {
            return res.status(500).send(err)
        };

         res.status(200).send(results)
      });
})




app.listen(PORT, ()=> console.log(`API berhasil aktif di Port ${PORT}`))