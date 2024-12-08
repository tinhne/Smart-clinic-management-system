const MedicalRecord = require("../models/MedicalRecord");
const Medication = require("../models/Medication");
const Prescription = require("../models/Prescription");

//lấy tất cả hồ sơ bệnh án
exports.getMedicalRecord = async (page = 1, limit = 5) => {
    try {
        const skip = (page - 1) * limit;
        const medicalRecords = await MedicalRecord.find()
            .sort({ createAt: -1 })
            .skip(skip)
            .limit(limit)
        const totalMedicalRecords = await MedicalRecord.countDocuments()
        const totalPages = Math.ceil(totalMedicalRecords / limit)

        return {
            success: true,
            medicalRecords,
            totalMedicalRecords,
            totalPages,
            currentPage: page,
        }
    } catch (e) {
        console.error("Lỗi khi lấy danh sách thuốc: ", error)
        return { success: false, message: "Lỗi khi lấy danh sách thuốc" }
    }
}

// Lấy hồ sơ bệnh án theo ID bệnh nhân
exports.getMedicalRecordByPatientId = async (patientId) => {
  try {
    const medicalRecord = await MedicalRecord.findOne({ patient_id: patientId })
      .populate({
        path: 'medical_history.prescriptions',
        populate: {
          path: 'medications.medication_id',
          model: 'Medication'
        }
      })
      .populate('patient_id', 'first_name last_name birthdate gender address')
      .populate('medical_history.doctor_id', 'first_name last_name email phone'); // Populate doctor details

    if (!medicalRecord) {
      return { success: false, message: "Không tìm thấy hồ sơ bệnh án" };
    }

    medicalRecord.medical_history.forEach(visit => {
      visit.total_price = visit.prescriptions.reduce((total, prescription) => total + prescription.total_price, 0);
    });

    return { success: true, medicalRecord };
  } catch (error) {
    console.error("Lỗi khi lấy hồ sơ bệnh án:", error);
    return { success: false, message: "Lỗi khi lấy hồ sơ bệnh án" };
  }
};

const getMedicalRecordById = async (patientId) => {
  try {
    // Fetch the medical record from the database
    let medicalRecord = await MedicalRecord.findOne({ patient_id: patientId });

    if (!medicalRecord) {
      throw new Error('Medical record not found');
    }

    // Fetch all valid doctor and drug IDs from the database
    const validDoctorIds = await Doctor.find().select('_id').lean();
    const validDrugIds = await Drug.find().select('_id').lean();

    const validDoctorIdSet = new Set(validDoctorIds.map(doc => doc._id.toString()));
    const validDrugIdSet = new Set(validDrugIds.map(drug => drug._id.toString()));

    // Filter out invalid doctor and drug IDs from medical history
    medicalRecord.medical_history = medicalRecord.medical_history.filter(history => {
      const isValidDoctor = validDoctorIdSet.has(history.doctor_id.toString());
      const isValidDrug = validDrugIdSet.has(history.drug_id.toString());
      return isValidDoctor && isValidDrug;
    });

    // Filter out invalid prescriptions
    medicalRecord.prescriptions = medicalRecord.prescriptions.filter(prescription => {
      return validDrugIdSet.has(prescription.drug_id.toString());
    });

    return medicalRecord;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching medical record');
  }
};

// tạo hồ sơ bệnh án
exports.createMedicalRecord = async (patientid) => {
    try {
        const existingRecord = await MedicalRecord.findOne({ patient_id: patientid })

        if (existingRecord) {
            return {
                success: true,
                medicalRecord: existingRecord,
                message: "Bệnh nhân đã có hồ sơ y tế"
            };
        }
        const newMedicalRecord = new MedicalRecord({
            patient_id: patientid,
            medical_history: []
        })
        const saveRecord = await newMedicalRecord.save();
        return {
            success: true,
            medicalRecord: saveRecord,
            message: "Đã tạo hồ sơ y tế mới"
        };
    } catch (error) {
        console.error("Lỗi khi tạo hồ sơ y tế", error)
        return {
            success: false,
            message: "Lỗi khi tạo hồ sơ y tế"
        }
    }
}

// Bác sĩ thêm thông tin sau mỗi lần khám
exports.addVisitHistory = async (patientId, visitData) => {
  try {
    const medicalRecord = await MedicalRecord.findOne({ patient_id: patientId });

    if (!medicalRecord) {
      return { success: false, message: "Không tìm thấy hồ sơ bệnh án" };
    }

    const visit = {
      doctor_id: visitData.doctorId,
      visit_date: new Date(),
      symptoms: visitData.symptoms,
      diagnosis: visitData.diagnosis,
      treatment_plan: visitData.treatmentPlan,
      notes: visitData.notes,
      prescriptions: [],
      total_price: visitData.totalPrice
    };

    // Add visit to medical history and save to get visit_id
    medicalRecord.medical_history.push(visit);
    await medicalRecord.save();

    // Ensure medications is an array
    if (!Array.isArray(visitData.medications)) {
      throw new Error('Medications should be an array');
    }

    // Update medication quantities and add prescriptions to visit
    for (const medicationData of visitData.medications) {
      const medication = await Medication.findOne({ name: medicationData.medication_name });
      if (medication) {
        medication.quantity_available -= medicationData.quantity;
        if (medication.quantity_available < 0) {
          throw new Error(`Not enough quantity for medication: ${medication.name}`);
        }
        await medication.save();

        // Add prescription to visit
        visit.prescriptions.push({
          drug_id: medication._id,
          quantity: medicationData.quantity,
          dosage: medicationData.dosage,
          instructions: medicationData.instructions || ''
        });
      } else {
        throw new Error(`Medication not found: ${medicationData.medication_name}`);
      }
    }

    // Save the updated visit with prescriptions
    await medicalRecord.save();

    // Get the newly added visit's ID
    const newVisit = medicalRecord.medical_history[medicalRecord.medical_history.length - 1];

    return { success: true, visit: newVisit };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error adding visit history', error: error.message };
  }
};