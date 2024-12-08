const Prescription = require('../models/Prescription');
const Medication = require('../models/Medication');

exports.getMedicationSalesReport = async () => {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const salesReport = await Prescription.aggregate([
      { $unwind: "$medications" },
      {
        $lookup: {
          from: "medications",
          localField: "medications.medication_id",
          foreignField: "_id",
          as: "medicationDetails"
        }
      },
      { $unwind: "$medicationDetails" },
      {
        $match: {
          "medications.date": { $gte: firstDayOfMonth }
        }
      },
      {
        $group: {
          _id: "$medications.medication_name",
          totalQuantity: { $sum: "$medications.quantity" },
          totalRevenue: { $sum: "$medications.total_price" }
        }
      },
      {
        $sort: {
          totalRevenue: -1
        }
      }
    ]);

    const highestRevenueMedication = salesReport[0];
    const highestQuantityMedication = salesReport.reduce((max, med) => med.totalQuantity > max.totalQuantity ? med : max, salesReport[0]);

    return {
      totalSales: salesReport,
      highestRevenueMedication,
      highestQuantityMedication
    };
  } catch (error) {
    throw new Error("Error generating medication sales report: " + error.message);
  }
};