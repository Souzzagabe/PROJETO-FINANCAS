var modal = {
    open() {
        document.querySelector('.modal-overlay')
            .classList.add('active');
    },
    close() {
        document.querySelector('.modal-overlay')
            .classList.remove('active')
    }
}

const transactions = [
    {
        
        description: 'Luz',
        amount: -50000,
        date: '23/01/2023'
    },
    {
        
        description: 'Manutenção',
        amount: 50000,
        date: '23/01/2023'
    },
    {
        
        description: 'Internet',
        amount: -20000,
        date: '23/01/2023'
    },
    {
        
        description: 'Mercado',
        amount: -20000,
        date: '23/01/2023'
    },
]


const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        //somar as entradas
        let income = 0

        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount
            }
        })

        return income
    },
    expenses() {
        let expenses = 0

        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expenses += transaction.amount
            }
        })

        return expenses
    },
    total() {
        //entradas - saídas
        return Transaction.incomes() + Transaction.expenses()
    }
}

// substituir dados do html

const Dom = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = Dom.innerHTMLTransaction(transaction)

        Dom.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <tr>
        <td class="Description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="">
        </td>
    </tr>
        `

        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        Dom.transactionsContainer.innerHTML = ""
    }
}


const Utils = {
    formatCurrency(value) {

        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })


        return signal + value
    }
}

const Form = {
    validateField() {
        console.log('validar os campos')
    },
    submit(event) {
        console.log(event)
        event.preventDefault()
        Form.validateFields()
    }
}


const App = {
    init() {
        Transaction.all.forEach(transaction => {
            Dom.addTransaction(transaction)
        })

        Dom.updateBalance()
    },
    reload() {
        Dom.clearTransactions()
        App.init()
    },
}

App.init();

//Transaction.add({
 //   id: 39,
    //description: 'hello',
   // amount: 200,
  //  date: '23/01/2021'
//})

Transaction.remove(0)