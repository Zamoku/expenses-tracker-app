module.exports = function Expenses(db){

    
    async function addUser(name, email){

        let filteredName = name.charAt(0).toUpperCase() + name.slice(1);
        console.log(filteredName)
        let regex = /^[a-z A-Z]+$/gi

            let getName = await db.manyOrNone("Select names from users where names = $1",[filteredName])
        
            console.log(filteredName)
            if(getName.length == 0){
           
            await db.none("INSERT INTO Users(names, email) Values($1,$2)", [filteredName, email])
        }
    }

    async function getUser(name){

        let filteredName = name.charAt(0).toUpperCase() + name.slice(1);

        username = await db.one("Select id from users where names = $1",[filteredName])
        
        return username
    }

    async function addExpense(name,category, date, amount){

        let filteredName = name.charAt(0).toUpperCase() + name.slice(1);

        let username = await getUser(filteredName)

        
        category_id = await db.one("Select id from categories where category = $1",[category])
       

        await db.none("Insert Into expenses(user_id, category_id, date, amount) Values($1,$2,$3,$4)",[username.id, category_id.id, date, amount])

    }
    
    async function getTotalExpenses(name){
       
        
        username = await db.one("Select names from users where names = $1",[name])
    
        // getCategoryId = await db.one("Select catego from categories where category = $1",[category])
        // console.log(getCategoryId)
        let total = await db.manyOrNone("Select date, categories.category, expenses.amount  from expenses Inner join categories on categories.id = expenses.category_id inner join users on users.id = expenses.user_id where users.names = $1 order by date desc",[username.names]) 
    
    
        return total
    }


    
    return{
        addExpense,
        getTotalExpenses,
        addUser,
        getUser
    }
}