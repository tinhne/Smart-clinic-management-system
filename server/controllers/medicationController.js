const medicationService = require('../service/medicationService');

exports.getMedicationSalesReport = async (req, res) => {
  try {
    const report = await medicationService.getMedicationSalesReport();
    res.status(200).json({ success: true, report });
  } catch (error) {
    console.error("Error generating medication sales report:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};