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
    
    // async function getTotalExpenses(category){
    //     console.log(category)
    //     getCategoryId = await db.one("Select id from categories where category = $1",[category])
    //     console.log(getCategoryId)
    //     let total = await db.one("Select SUM(amount) from expenses where category_id = $1",[getCategoryId.id]) 
    //     console.log(total)
    //     return total
    // }

        // await db.manyOrNone()

    
    return{
        addExpense,
        // getTotalExpenses,
        addUser,
        getUser
    }
}