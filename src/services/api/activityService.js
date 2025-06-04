import activityData from '../mockData/activity.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let activities = [...activityData]

const activityService = {
  async getAll() {
    await delay(280)
    return [...activities]
  },

  async getById(id) {
    await delay(200)
    const activity = activities.find(a => a.id === id)
    return activity ? { ...activity } : null
  },

  async getByIds(ids) {
    await delay(250)
    return activities.filter(a => ids.includes(a.id)).map(a => ({ ...a }))
  },

  async create(activityData) {
    await delay(320)
    const newActivity = {
      ...activityData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    activities.push(newActivity)
    return { ...newActivity }
  },

  async update(id, updates) {
    await delay(300)
    const index = activities.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Activity not found')
    
    activities[index] = { ...activities[index], ...updates, updatedAt: new Date().toISOString() }
    return { ...activities[index] }
  },

  async delete(id) {
    await delay(280)
    const index = activities.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Activity not found')
    
    const deletedActivity = activities.splice(index, 1)[0]
    return { ...deletedActivity }
  }
}

export default activityService