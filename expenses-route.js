module.exports = function (expenses){

    const ShortUniqueId = require("short-unique-id")
    const uid = new ShortUniqueId({ length: 6 });


    async function register(req, res){
        res.render('register',{
            
        });
    }
    
        async function addRegister(req, res){

            let name = req.body.user_name
            let email = req.body.email
              
              if(name){
                 const code = uid()


                 await expenses.addUser(name, email, code)

                req.flash('success', 'You have succesfully registered, your code is:' + code)

                res.redirect("/login/"+ name)

            }else{
                req.flash('error', 'No user provided')

                res.redirect("/register")
            }
    
    }

    async function loginPage(req, res){
        let user = req.params.name
        res.render('login',{
            user
        });
    }

    async function displayLogin(req, res){
       let {gen_code} = req.body
       let user = req.params.name
    let getCode = await expenses.addCode(gen_code)
    

        if(getCode.code === gen_code){

            res.redirect("/addExpense/" + user)
        }else{
            req.flash('error', 'Enter the correct code')
        }
    }

    async function home(req, res){
            res.render('index',{
        
            });
    }

    async function add(req, res){
        let name = req.body.user_name
        let email = req.body.email
      

        await expenses.addUser(name, email)

        res.redirect("/addExpense/"+ name)
    }
    
    async function display(req, res){
        let user = req.params.name
      
        res.render("addExpense",{
            user
        })
    }

    async function addExpense(req, res){
        let user = req.params.name
        let category = req.body.categories
        let date = req.body.expense_date
        let amount = req.body.date

        await expenses.addExpense(user, category, date, amount)

        req.flash('success', 'You have succesfully added your expense')

        res.redirect("/addExpense/"+ user)
    }

    async function viewExpenses(req, res){
        let user = req.params.name
      
        res.render("expenses",{
            user,
            expense: await expenses.getExpenses(user)
        })
    }

    async function showTotal(req, res){
        let user = req.params.name
        
        res.render("expenses",{
            user,
            total: await expenses.getTotalExpenses(user)
            
        })
    }


    return{
        register,
        addRegister,
        add,
        display,
        home,
        addExpense,
        viewExpenses,
        showTotal,
        loginPage,
        displayLogin
    }
}