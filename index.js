const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Expenses = require('./expensefunction');
const ExpenseRoutes = require('./expenses-route');


const pgPromise = require("pg-promise")
const pgp = pgPromise({})

// SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// which db connection to use
 const connectionString = process.env.DATABASE_URL || 'postgresql://zamoe:zamo123@localhost:5432/expenses_db';

const db = pgp({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const expenses = Expenses(db)
const expenseRoutes = ExpenseRoutes(expenses)

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

//parse application/json
 app.use(bodyParser.json());

app.use(session({
    secret: "my exp secret",
    cookie: {
        maxAge: 1000 * 36000
      },
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', expenseRoutes.home);
app.post('/', expenseRoutes.add);
app.get('/addExpense/:name', expenseRoutes.display);
app.post('/addExpense/:name', expenseRoutes.addExpense);
app.get('/expenses/:name', expenseRoutes.viewExpenses);
app.get('/getExpenses/:name', expenseRoutes.showTotal);



const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
    console.log('App started at port:', PORT)

})
