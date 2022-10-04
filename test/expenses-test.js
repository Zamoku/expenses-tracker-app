const assert = require('assert');
const Expense = require('../expensefunction');

const pgPromise = require("pg-promise");
const pgp = pgPromise({})

const connectionString = process.env.DATABASE_URL || 'postgresql://zamoe:zamo123@localhost:5432/expenses_db_test';

const expense = Expense();

describe( 'expense function' ,function(){
    it("The function should be able to add name, email and code to function",function(){

        let set_user = await expense.getUser("Nomzamo")

        let getUser = await expense.addUser('Nomzamo','nomzamo@gmail.com')
        assert.equal("", getUser)
    })

    it("The function should be able to get category and amount for the specific user",function(){
        
        let expensefunc = await expense.addExpense("")

        let getExpenses = awa

    })
})