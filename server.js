const express = require('express');
const path = require('path');
// const sequelize = require('./config/connection');
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});
const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');
const request = require('request');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3001;

var myLimit = typeof(process.argv[2]) != 'undefined' ? process.argv[2] : '100kb';
app.use(bodyParser.json({limit: myLimit}));
// app.get('/ndpframe', (req, res, next) => {
//     let dataHTML = '';
//     fetch('https://crexendo-ndp-021-las.cls.iaas.run/ndp/common/safe.php', {method: 'POST', mode: 'no-cors', credentials:'include'}).then((response) => {
//         dataHTML = response.body;
//     })
//     .then(res.send(dataHTML));
// })

app.all('/ndpframe', function (req, res, next) {

    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        var targetURL = 'https://crexendo-ndp-021-las.cls.iaas.run/ndp/common/safe.php';
        // var targetURL = req.header('Target-URL'); // Target-URL ie. https://example.com or http://example.com
        if (!targetURL) {
            res.send(500, { error: 'There is no Target-Endpoint header in the request' });
            return;
        }
        // changing request from ::: request({url: targetURL + req.url})
        request({ url: targetURL, method: req.method, json: req.body, mode: 'include', headers: {'Authorization': req.header('Authorization')} },
            function (error, response, body) {
                if (error) {
                    console.error('error: ' + response.statusCode);
                }
//                console.log(body);
            }).pipe(res);
    }
});

// const sess = {
//     secret: 'Cr3Xnd02022!',
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     };


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
// app.use(session(sess));


// app.use(routes);
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');


// sequelize.sync({ force: false }).then(() => {
app.listen(PORT, '127.0.0.1', () => console.log(`Now listening on PORT ${PORT}`));
// });