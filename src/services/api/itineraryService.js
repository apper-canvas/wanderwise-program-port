// Initialize ApperClient
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'itinerary';

// All fields for fetch operations
const allFields = [
  'Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 
  'ModifiedOn', 'ModifiedBy', 'trip_id', 'date', 'notes'
];

// Only updateable fields for create/update operations
const updateableFields = [
  'Name', 'Tags', 'trip_id', 'date', 'notes'
];

const itineraryService = {
  async getAll() {
    try {
      const params = {
        fields: allFields,
        orderBy: [
          {
            fieldName: "date",
            SortType: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      throw new Error("Failed to fetch itineraries");
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: allFields
      };

      const response = await apperClient.getRecordById(tableName, id, params);
      return response?.data || null;
    } catch (error) {
      console.error(`Error fetching itinerary with ID ${id}:`, error);
      throw new Error("Failed to fetch itinerary");
    }
  },

  async getByTripId(tripId) {
    try {
      const params = {
        fields: allFields,
        where: [
          {
            fieldName: "trip_id",
            operator: "EqualTo",
            values: [tripId]
          }
        ],
        orderBy: [
          {
            fieldName: "date",
            SortType: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      return response?.data || [];
    } catch (error) {
      console.error(`Error fetching itineraries for trip ${tripId}:`, error);
      throw new Error("Failed to fetch trip itineraries");
    }
  },

  async create(itineraryData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableFields.forEach(field => {
        if (itineraryData[field] !== undefined) {
          // Format data according to field types
          if (field === 'date') {
            filteredData[field] = itineraryData[field]; // Should be in YYYY-MM-DD format
          } else if (field === 'Tags') {
            filteredData[field] = Array.isArray(itineraryData[field]) 
              ? itineraryData[field].join(',') 
              : itineraryData[field]; // Tag/comma-separated format
          } else {
            filteredData[field] = itineraryData[field];
          }
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.createRecord(tableName, params);
      
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data;
      } else {
        throw new Error(response?.results?.[0]?.message || "Failed to create itinerary");
      }
    } catch (error) {
      console.error("Error creating itinerary:", error);
      throw new Error("Failed to create itinerary");
    }
  },

  async update(id, updates) {
    try {
      // Filter to only include updateable fields
      const filteredUpdates = { Id: id };
      updateableFields.forEach(field => {
        if (updates[field] !== undefined) {
          // Format data according to field types
          if (field === 'date') {
            filteredUpdates[field] = updates[field]; // Should be in YYYY-MM-DD format
          } else if (field === 'Tags') {
            filteredUpdates[field] = Array.isArray(updates[field]) 
              ? updates[field].join(',') 
              : updates[field]; // Tag/comma-separated format
          } else {
            filteredUpdates[field] = updates[field];
          }
        }
      });

      const params = {
        records: [filteredUpdates]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data;
      } else {
        throw new Error(response?.results?.[0]?.message || "Failed to update itinerary");
      }
    } catch (error) {
      console.error("Error updating itinerary:", error);
      throw new Error("Failed to update itinerary");
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      
      if (response?.success && response?.results?.[0]?.success) {
        return { success: true };
      } else {
        throw new Error(response?.results?.[0]?.message || "Failed to delete itinerary");
      }
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      throw new Error("Failed to delete itinerary");
    }
  }
};

export default itineraryService;