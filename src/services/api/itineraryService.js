import itineraryData from '../mockData/itinerary.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let itineraries = [...itineraryData]

const itineraryService = {
  async getAll() {
    await delay(250)
    return [...itineraries]
  },

  async getById(id) {
    await delay(200)
    const itinerary = itineraries.find(i => i.id === id)
    return itinerary ? { ...itinerary } : null
  },

  async getByTripId(tripId) {
    await delay(300)
    return itineraries.filter(i => i.tripId === tripId).map(i => ({ ...i }))
  },

  async create(itineraryData) {
    await delay(350)
    const newItinerary = {
      ...itineraryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    itineraries.push(newItinerary)
    return { ...newItinerary }
  },

  async update(id, updates) {
    await delay(300)
    const index = itineraries.findIndex(i => i.id === id)
    if (index === -1) throw new Error('Itinerary not found')
    
    itineraries[index] = { ...itineraries[index], ...updates, updatedAt: new Date().toISOString() }
    return { ...itineraries[index] }
  },

  async delete(id) {
    await delay(250)
    const index = itineraries.findIndex(i => i.id === id)
    if (index === -1) throw new Error('Itinerary not found')
    
    const deletedItinerary = itineraries.splice(index, 1)[0]
    return { ...deletedItinerary }
  }
}

export default itineraryService