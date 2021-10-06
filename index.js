const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express()
const port = 3000.envPORT
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 80));


app.use(bodyParser.json());
let items = [
    {
        postID: uuidv4(),
        title: "Housut",
        description: "vihreät housut",
        images: [
            "string"
                    ],
        price: 13,
        user: {
            userName: "SellerSells",
            contact: "0464242423"
        },
        category: "vaatteet",
        date: "2021-10-02",
        delivery: {
            pickup: true,
            post: true
        },
        location: "Oulu"

    }
];

let users = [
    {
        userID: uuidv4(),
        user: {   
            userName: "SellerSells",
            contact: "0462121212"
          },
        dateOfBirth: "01.10.1970",
        email: "maija.poppanen@gmail.com"
    }
];



app.get('/items', (req, res) => {

    res.json(items)
});

app.post('/items', function (req, res) {

    items.push({ postID: uuidv4(), 
        title: req.body.title, 
        description: req.body.description, 
        category: req.body.category,
        images: req.body.images, 
        price: req.body.price,
        user: req.body.user,
        date: req.body.date,
        delivery: req.body.delivery,
        location: req.body.location
        })
        
    res.sendStatus(201);
});

app.get("/items/search", (req, res) => {
 
    //const location = items.find(d => d.location ===req.query.location);
    const item = [];
    for (var idx in items) {
        if(items[idx].location == req.query.location) {
            item[idx] = items[idx];
        }

        if(items[idx].category == req.query.category) {
            item[idx] = items[idx];
        }

        if(items[idx].date == req.query.date) {
            item[idx] = items[idx];
        }
    
    }
    if(item === undefined) {
            res.sendStatus(404);
        }

    else {
            res.json(item);
        }
})


app.put("/items/:postID", function(req, res) {
    const item = items.find(d => d.postID === req.body.postID)
    const index = items.indexOf(item);
    items[index] = req.body;
    if(item === undefined){
        res.sendStatus(404)
    }
    else{
    res.json(item);
    }
})


app.delete("/items/:postID", (req, res) => {
    const item = items.find(d => d.postID === req.params.postID);
    const index = items.indexOf(item);
    items.splice(index,1);
    if(item === undefined){
        res.sendStatus(404)
    }
    else{
           res.json(item);
        }
})

app.get('/users', (req, res) => {

    res.json(users)
});

app.post('/users', function (req, res) {

    users.push({ userID: uuidv4(), 
        user: req.body.user, 
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email
        })
    res.sendStatus(201);
});

app.get("/users/:userID", (req, res) => {
    const user = users.find(d => d.userID === req.params.userID);
    if(user === undefined) {
        res.sendStatus(404);
    } 
    else {
        res.json(user);
    }
})

app.put("/users/:userID", function(req, res) {
    const user = users.find(d => d.userID === req.body.userID)
    const index = users.indexOf(user);
    users[index] = req.body;
    if(user === undefined){
        res.sendStatus(404)
    }
    else{
    res.json(user);
    }
})

app.delete("/users/:userID", (req, res) => {
    const user = users.find(d => d.userID === req.params.userID);
    const index = users.indexOf(user);
    users.splice(index,1);
    if(user === undefined){
        res.sendStatus(404)
    }
    else{
           res.json(user);
        }
})


    




/*const dogs = [
    {id: uuidv4(), name: "Max"},
    {id: uuidv4(),name: "Bruno"},
    {id: uuidv4(), name: "Spot"},
    {id: uuidv4(), name: "Flora"}
];


/*app.get('/', (req, res) => {
  res.send('Hello World!')
})*/

/*app.get('/dogs', (req, res) => {
    //res.send('Hello dogs!');
    res.json(dogs);
})

app.get('/dogs/:id', (req, res) =>{
    const dog = dogs.find(d => d.id === req.params.id);
    if(dog.id === undefined) {
        res.sendStatus(404);
    } 
    else {
        res.json(dog);
    }
})

app.post('/dogs', (req, res) => {
    dogs.push({ id: uuidv4(), name: req.body.name})
    res.sendStatus(201);
    
});*/


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
