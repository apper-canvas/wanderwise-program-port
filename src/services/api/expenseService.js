// Initialize ApperClient
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'expense';

// All fields for fetch operations
const allFields = [
  'Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 
  'ModifiedOn', 'ModifiedBy', 'category', 'amount', 'description', 'trip_id'
];

// Only updateable fields for create/update operations
const updateableFields = [
  'Name', 'Tags', 'category', 'amount', 'description', 'trip_id'
];

const expenseService = {
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
      console.error("Error fetching expenses:", error);
      throw new Error("Failed to fetch expenses");
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
      console.error(`Error fetching expense with ID ${id}:`, error);
      throw new Error("Failed to fetch expense");
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
            fieldName: "CreatedOn",
            SortType: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      return response?.data || [];
    } catch (error) {
      console.error(`Error fetching expenses for trip ${tripId}:`, error);
      throw new Error("Failed to fetch trip expenses");
    }
  },

  async create(expenseData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableFields.forEach(field => {
        if (expenseData[field] !== undefined) {
          // Format data according to field types
          if (field === 'amount') {
            filteredData[field] = parseFloat(expenseData[field]) || 0; // Currency as float
          } else if (field === 'Tags') {
            filteredData[field] = Array.isArray(expenseData[field]) 
              ? expenseData[field].join(',') 
              : expenseData[field]; // Tag/comma-separated format
          } else {
            filteredData[field] = expenseData[field];
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
        throw new Error(response?.results?.[0]?.message || "Failed to create expense");
      }
    } catch (error) {
      console.error("Error creating expense:", error);
      throw new Error("Failed to create expense");
    }
  },

  async update(id, updates) {
    try {
      // Filter to only include updateable fields
      const filteredUpdates = { Id: id };
      updateableFields.forEach(field => {
        if (updates[field] !== undefined) {
          // Format data according to field types
          if (field === 'amount') {
            filteredUpdates[field] = parseFloat(updates[field]) || 0; // Currency as float
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
        throw new Error(response?.results?.[0]?.message || "Failed to update expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      throw new Error("Failed to update expense");
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
        throw new Error(response?.results?.[0]?.message || "Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      throw new Error("Failed to delete expense");
    }
  }
};

export default expenseService;