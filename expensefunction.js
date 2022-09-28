module.exports = function Expenses(db){

    async function addUser(name, email){
       
        await db.none("INSERT INTO Users(names, email) Values($1,$2)", [name, email])
    }

    async function getUser(name){
        username = await db.one("Select id from users where names = $1",[name])
        
        return username
    }

    async function addExpense(name,category, date, amount){

        let username = await getUser(name)

       
        
        category_id = await db.one("Select id from categories where category = $1",[category])
       

        await db.none("Insert Into expenses(user_id, category_id, date, amount) Values($1,$2,$3,$4)",[username.id, category_id.id, date, amount])

    }
    
    async function getTotalExpenses(name){
       

        username = await db.one("Select names from users where names = $1",[name])
    
        // getCategoryId = await db.one("Select catego from categories where category = $1",[category])
        // console.log(getCategoryId)
        let total = await db.manyOrNone("Select date, categories.category, expenses.amount  from expenses Inner join categories on categories.id = expenses.category_id inner join users on users.id = expenses.user_id where users.names = $1 order by date desc",[username.names]) 
    
        console.log(total)
        return total
    }


    
    return{
        addExpense,
        getTotalExpenses,
        addUser,
        getUser
    }
}