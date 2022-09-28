module.exports = function (expenses){

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
            user
        })
    }

    async function showTotal(req, res){
        let user = req.params.name
        let cat = req.body.category

        console.log(cat)

        res.render("expenses",{
            user,
            total: await expenses.getTotalExpenses(req.body.category)
            
        })
    }


    return{
        add,
        display,
        home,
        addExpense,
        viewExpenses,
        showTotal
    }
}