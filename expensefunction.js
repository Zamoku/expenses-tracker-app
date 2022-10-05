module.exports = function Expenses(db){


    
    async function addUser(name, email, code){
        
        
        let filteredName = name.charAt(0).toUpperCase() + name.slice(1);

        let regex = /^[a-z A-Z]+$/gi

            let getName = await db.manyOrNone("Select names from users where names = $1",[filteredName])
        
            
            if(getName.length == 0){
        
            await db.none("INSERT INTO Users(names, email, code) Values($1,$2,$3)", [filteredName, email, code])
        }
    }

    async function getUserId(name){

        let filteredName = name.charAt(0).toUpperCase() + name.slice(1);

      let username = await db.one("Select id from users where names = $1",[filteredName])
        
        return username
    }

     async function findUser(name){


      let result = await db.one("Select count(*) from users where names = $1",[name])
        
        return result
    }



    async function getUser(name){

        let filteredName = name.charAt(0).toUpperCase() + name.slice(1);

       let username = await db.one("Select names from users where names = $1",[filteredName])
        
        return username
    }

    async function getUsers(){

        // let filteredName = name.charAt(0).toUpperCase() + name.slice(1);

       let username = await db.manyOrNone("Select names from users")
        
        return username
    }


    async function getCode(code){

       let uniq_code = await db.one("Select code from users where code = $1",[code])

       return uniq_code
        
    }

    async function addExpense(name,category, date, amount){

        let filteredName = name.charAt(0).toUpperCase() + name.slice(1);

        let username = await getUserId(filteredName)

        
        category_id = await db.one("Select id from categories where category = $1",[category])
       

        await db.none("Insert Into expenses(user_id, category_id, date, amount) Values($1,$2,$3,$4)",[username.id, category_id.id, date, amount])

    }
    
    async function getExpenses(name){
       
        
        username = await db.one("Select names from users where names = $1",[name])
    
       
        let total = await db.manyOrNone("Select TO_CHAR(date, 'DD/MM/YYYY') as actual_date, categories.category, expenses.amount from expenses Inner join categories on categories.id = expenses.category_id inner join users on users.id = expenses.user_id where users.names = $1 order by actual_date desc",[username.names]) 
    
    
        return total
    }

        
    async function getTotalExpenses(name){
       
        
        username = await db.one("Select names from users where names = $1",[name])
    
       
        let total = await db.manyOrNone("Select SUM(expenses.amount), categories.category from expenses Inner join categories on categories.id = expenses.category_id inner join users on users.id = expenses.user_id where users.names = $1 and date >= current_date - 7 group by categories.category",[username.names]) 

        return total
    }

    // Select TO_CHAR(date, 'DD/MM/YYYY') as actual_date, categories.category, expenses.amount 
    // from expenses Inner join categories on categories.id = expenses.category_id inner join users on users.id = expenses.user_id 
    // where date >= current_date - 7 order by actual_date desc;



    
    return{
        addExpense,
        getTotalExpenses,
        getExpenses,
        addUser,
        findUser,
        getUserId,
        getUser,
        getCode,
        getUsers
    }
}