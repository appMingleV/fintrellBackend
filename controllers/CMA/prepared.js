import Prepared from "../../models/prepared.js";
export const createPrepared = async (req, res) => {
    try {
      const { enterpriseId, preparedBy, mobile, address } = req.body;
  
      if (!enterpriseId || !preparedBy || !mobile || !address) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newPrepared = new Prepared({ enterpriseId, preparedBy, mobile, address });
      await newPrepared.save();
  
      res.status(201).json({ success: true, message: "Prepared record created successfully", data: newPrepared });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error creating prepared record", error: error.message });
    }
  };
  
  // Get all Prepared records
  export const getAllPrepared = async (req, res) => {
    try {
      const preparedRecords = await Prepared.find().populate("enterpriseId");
      res.status(200).json({ success: true, data: preparedRecords });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching records", error: error.message });
    }
  };
  
  // Get a single Prepared record by ID
  export const getPreparedById = async (req, res) => {
    try {
      const preparedRecord = await Prepared.findById(req.params.id).populate("enterpriseId");
  
      if (!preparedRecord) {
        return res.status(404).json({ success: false, message: "Prepared record not found" });
      }
  
      res.status(200).json({ success: true, data: preparedRecord });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching record", error: error.message });
    }
  };
  
  // Update a Prepared record by ID
  export const updatePrepared = async (req, res) => {
    try {
      const { preparedBy, mobile, address } = req.body;
  
      const updatedPrepared = await Prepared.findByIdAndUpdate(
        req.params.id,
        { preparedBy, mobile, address },
        { new: true, runValidators: true }
      );
  
      if (!updatedPrepared) {
        return res.status(404).json({ success: false, message: "Prepared record not found" });
      }
  
      res.status(200).json({ success: true, message: "Record updated successfully", data: updatedPrepared });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating record", error: error.message });
    }
  };
  
  // Delete a Prepared record by ID
  export const deletePrepared = async (req, res) => {
    try {
      const deletedPrepared = await Prepared.findByIdAndDelete(req.params.id);
  
      if (!deletedPrepared) {
        return res.status(404).json({ success: false, message: "Prepared record not found" });
      }
  
      res.status(200).json({ success: true, message: "Record deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting record", error: error.message });
    }
  };