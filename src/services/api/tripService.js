// Initialize ApperClient
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'trip';

// All fields for fetch operations
const allFields = [
  'Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 
  'ModifiedOn', 'ModifiedBy', 'start_date', 'end_date', 
  'destinations', 'budget', 'status'
];

// Only updateable fields for create/update operations
const updateableFields = [
  'Name', 'Tags', 'start_date', 'end_date', 'destinations', 'budget', 'status'
];

const tripService = {
  async getAll() {
    try {
      const params = {
        fields: allFields,
        orderBy: [
          {
            fieldName: "CreatedOn",
            SortType: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching trips:", error);
      throw new Error("Failed to fetch trips");
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
      console.error(`Error fetching trip with ID ${id}:`, error);
      throw new Error("Failed to fetch trip");
    }
  },

  async create(tripData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableFields.forEach(field => {
        if (tripData[field] !== undefined) {
          // Format data according to field types
          if (field === 'start_date' || field === 'end_date') {
            filteredData[field] = tripData[field]; // Should be in YYYY-MM-DD format
          } else if (field === 'destinations' || field === 'Tags') {
            filteredData[field] = Array.isArray(tripData[field]) 
              ? tripData[field].join(',') 
              : tripData[field]; // Tag/comma-separated format
          } else if (field === 'budget') {
            filteredData[field] = parseFloat(tripData[field]) || 0; // Currency as float
          } else {
            filteredData[field] = tripData[field];
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
        throw new Error(response?.results?.[0]?.message || "Failed to create trip");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
      throw new Error("Failed to create trip");
    }
  },

  async update(id, updates) {
    try {
      // Filter to only include updateable fields
      const filteredUpdates = { Id: id };
      updateableFields.forEach(field => {
        if (updates[field] !== undefined) {
          // Format data according to field types
          if (field === 'start_date' || field === 'end_date') {
            filteredUpdates[field] = updates[field]; // Should be in YYYY-MM-DD format
          } else if (field === 'destinations' || field === 'Tags') {
            filteredUpdates[field] = Array.isArray(updates[field]) 
              ? updates[field].join(',') 
              : updates[field]; // Tag/comma-separated format
          } else if (field === 'budget') {
            filteredUpdates[field] = parseFloat(updates[field]) || 0; // Currency as float
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
        throw new Error(response?.results?.[0]?.message || "Failed to update trip");
      }
    } catch (error) {
      console.error("Error updating trip:", error);
      throw new Error("Failed to update trip");
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
        throw new Error(response?.results?.[0]?.message || "Failed to delete trip");
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
      throw new Error("Failed to delete trip");
    }
  }
};

export default tripService;