const Prescription = require("../models/Prescription");

exports.getTotalSales = async () => {
  return await Prescription.aggregate([
    { $unwind: "$medications" },
    {
      $group: {
        _id: "$medications.medication_id",
        totalQuantity: { $sum: "$medications.quantity" },
        totalRevenue: { $sum: "$medications.price" }
      }
    },
    {
      $sort: {
        totalRevenue: -1
      }
    }
  ]);
};

exports.getBestSellingMedication = async () => {
  const salesReport = await Prescription.aggregate([
    { $unwind: "$medications" },
    {
      $group: {
        _id: "$medications.medication_id",
        totalQuantity: { $sum: "$medications.quantity" },
        totalRevenue: { $sum: "$medications.price" }
      }
    },
    {
      $sort: {
        totalQuantity: -1
      }
    }
  ]);

  return salesReport[0];
};

exports.getTotalSalesToday = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return await Prescription.aggregate([
    { $match: { createdAt: { $gte: today } } },
    { $unwind: "$medications" },
    {
      $group: {
        _id: "$medications.medication_id",
        totalQuantity: { $sum: "$medications.quantity" },
        totalRevenue: { $sum: "$medications.price" }
      }
    }
  ]);
};

exports.getMonthlySales = async () => {
  return await Prescription.aggregate([
    { $unwind: "$medications" },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
          medication_id: "$medications.medication_id"
        },
        totalQuantity: { $sum: "$medications.quantity" },
        totalRevenue: { $sum: "$medications.price" }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1
      }
    }
  ]);
};

exports.getDailySales = async (medicationId) => {
  const medicationObjectId = mongoose.Types.ObjectId(medicationId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return await Prescription.aggregate([
    { $match: { createdAt: { $gte: today }, "medications.medication_id": medicationObjectId } },
    { $unwind: "$medications" },
    { $match: { "medications.medication_id": medicationObjectId } },
    {
      $group: {
        _id: "$medications.medication_id",
        totalQuantity: { $sum: "$medications.quantity" },
        totalRevenue: { $sum: "$medications.price" }
      }
    }
  ]);
};