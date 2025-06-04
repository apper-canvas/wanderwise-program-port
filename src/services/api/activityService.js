// Initialize ApperClient
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'Activity1';

// All fields for fetch operations
const allFields = [
  'Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 
  'ModifiedOn', 'ModifiedBy', 'category', 'location', 'cost'
];

// Only updateable fields for create/update operations
const updateableFields = [
  'Name', 'Tags', 'category', 'location', 'cost'
];

const activityService = {
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
      console.error("Error fetching activities:", error);
      throw new Error("Failed to fetch activities");
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
      console.error(`Error fetching activity with ID ${id}:`, error);
      throw new Error("Failed to fetch activity");
    }
  },

  async getByIds(ids) {
    try {
      const params = {
        fields: allFields,
        where: [
          {
            fieldName: "Id",
            operator: "ExactMatch",
            values: ids
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      return response?.data || [];
    } catch (error) {
      console.error(`Error fetching activities with IDs ${ids}:`, error);
      throw new Error("Failed to fetch activities");
    }
  },

  async create(activityData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableFields.forEach(field => {
        if (activityData[field] !== undefined) {
          // Format data according to field types
          if (field === 'cost') {
            filteredData[field] = parseFloat(activityData[field]) || 0; // Currency as float
          } else if (field === 'Tags') {
            filteredData[field] = Array.isArray(activityData[field]) 
              ? activityData[field].join(',') 
              : activityData[field]; // Tag/comma-separated format
          } else {
            filteredData[field] = activityData[field];
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
        throw new Error(response?.results?.[0]?.message || "Failed to create activity");
      }
    } catch (error) {
      console.error("Error creating activity:", error);
      throw new Error("Failed to create activity");
    }
  },

  async update(id, updates) {
    try {
      // Filter to only include updateable fields
      const filteredUpdates = { Id: id };
      updateableFields.forEach(field => {
        if (updates[field] !== undefined) {
          // Format data according to field types
          if (field === 'cost') {
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
        throw new Error(response?.results?.[0]?.message || "Failed to update activity");
      }
    } catch (error) {
      console.error("Error updating activity:", error);
      throw new Error("Failed to update activity");
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
        throw new Error(response?.results?.[0]?.message || "Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      throw new Error("Failed to delete activity");
    }
  }
};

export default activityService;