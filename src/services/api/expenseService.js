import expenseData from '../mockData/expense.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let expenses = [...expenseData]

const expenseService = {
  async getAll() {
    await delay(260)
    return [...expenses]
  },

  async getById(id) {
    await delay(200)
    const expense = expenses.find(e => e.id === id)
    return expense ? { ...expense } : null
  },

  async getByTripId(tripId) {
    await delay(280)
    return expenses.filter(e => e.tripId === tripId).map(e => ({ ...e }))
  },

  async create(expenseData) {
    await delay(340)
    const newExpense = {
      ...expenseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    expenses.push(newExpense)
    return { ...newExpense }
  },

  async update(id, updates) {
    await delay(300)
    const index = expenses.findIndex(e => e.id === id)
    if (index === -1) throw new Error('Expense not found')
    
    expenses[index] = { ...expenses[index], ...updates, updatedAt: new Date().toISOString() }
    return { ...expenses[index] }
  },

  async delete(id) {
    await delay(270)
    const index = expenses.findIndex(e => e.id === id)
    if (index === -1) throw new Error('Expense not found')
    
    const deletedExpense = expenses.splice(index, 1)[0]
    return { ...deletedExpense }
  }
}

export default expenseService