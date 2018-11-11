const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();
// console.log(JSON.stringify(app, undefined, 2));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


// Maintenance middleware, simply uncomment this when system is down
// app.use((req, res, next)=>{
//     res.render('maintain.hbs', {
//         currentPage: {
//             down: 'maintain',
//             up: 'MAINTAIN'
//         }
//     });
//     // next();
// });

app.use((req, res, next) => {
    let now = new Date().toString();
    console.log(`${now} : ${req.method} ${req.url}`);
    fs.appendFileSync('requestData.log', `${now} : ${req.method} ${req.url} \n`)
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('helpers', ()=>{
    return new Date().getFullYear()
});

app.get('/', (req, res)=>{
    // res.send('<h1>We finally started express</h1>');
    res.render('home.hbs', {
        name: 'Andrew',
        likes: {
            sex : 'Male'
        },
        currentPage: {
            down: 'Home'.toLowerCase(),
            up: 'Home'.toUpperCase()
        }
    });
});

// app.post();
app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentPage: {
            down: 'About'.toLowerCase(),
            up: 'About'.toUpperCase()
        }
    });
});

app.get('/bad', (req, res)=>{    
    res.send({response: 'Very Bad Request'});
});

let port = '3000';
app.listen(port, ()=>{
    console.log('App listening on port:', port);
});