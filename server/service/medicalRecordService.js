const MedicalRecord = require("../models/MedicalRecord")

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
      // Tìm hồ sơ bệnh án dựa vào patientId
      const medicalRecord = await MedicalRecord.findOne({ patient_id: patientId })
        .populate('patient_id', 'first_name last_name'); // Lấy thêm thông tin bệnh nhân nếu cần
  
      return medicalRecord;
    } catch (error) {
      throw new Error("Không thể lấy hồ sơ bệnh án");
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
        const medicalRecord = await MedicalRecord.findOne({ patient_id: patientId })
        if (!medicalRecord) {
            return {
                success: false,
                message: "Không tìm thấy hồ sơ y tế của bệnh nhân"
            }
        }
        medicalRecord.medical_history.push({
            doctor_id: visitData.doctorId,
            visit_date: new Date(),
            symptoms: visitData.symptoms,
            diagnosis: visitData.diagnosis,
            treatment_plan: visitData.treatmentPlan,
            notes: visitData.notes,
            prescriptions: visitData.prescriptionId
        })
        await medicalRecord.save()
        return {
            success: true,
            medicalRecord,
            message: "Đã thêm thông tin khám bệnh mới"
        }
    } catch (error) {
        console.error("Lỗi khi thêm thông tin khám bệnh: ", error)
        return {
            success: false,
            message: "Lỗi khi thêm thông tin khám bệnh"
        }
    }
}