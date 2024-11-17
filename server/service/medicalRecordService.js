const MedicalRecord = require("../models/MedicalRecord")
const Medication = require("../models/Medication")
const Prescription = require("../models/Prescription")

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
        console.log("Received visitData:", visitData);

        // Kiểm tra các tham số cần thiết
        if (!visitData.doctorId || !visitData.symptoms || !visitData.diagnosis || !visitData.treatmentPlan || !visitData.notes) {
            return { success: false, message: "Thiếu tham số cần thiết." };
        }

        // Kiểm tra medications
        if (!Array.isArray(visitData.medications) || visitData.medications.length === 0) {
            return { success: false, message: "medications không phải là mảng hoặc rỗng." };
        }

        const medicalRecord = await MedicalRecord.findOne({ patient_id: patientId });

        if (!medicalRecord) {
            return { success: false, message: "Không tìm thấy hồ sơ bệnh án cho bệnh nhân." };
        }

        const newVisit = {
            doctor_id: visitData.doctorId,
            visit_date: new Date(),
            symptoms: visitData.symptoms,
            diagnosis: visitData.diagnosis,
            treatment_plan: visitData.treatmentPlan,
            notes: visitData.notes,
            prescriptions: []
        };

        const medications = [];
        let totalPrice = 0;

        for (const medication of visitData.medications) {
            const med = await Medication.findOne({ name: medication.medication_name });

            if (med) {
                if (med.quantity_available < medication.quantity) {
                    console.error(`Không đủ số lượng thuốc ${med.name}`);
                    return { success: false, message: `Không đủ số lượng thuốc ${med.name}` };
                }
                med.quantity_available -= medication.quantity;
                await med.save();

                medications.push({
                    medication_id: med._id,
                    quantity: medication.quantity,
                    dosage: medication.dosage,
                    price: med.price
                });

                totalPrice += med.price * medication.quantity;
            } else {
                console.error(`Không tìm thấy thuốc với tên ${medication.medication_name}`);
                return { success: false, message: `Không tìm thấy thuốc với tên ${medication.medication_name}` };
            }
        }

        if (medications.length > 0) {
            const newPrescription = new Prescription({
                description: visitData.description || "Đơn thuốc cho bệnh nhân",
                medications: medications,
                patient_id: patientId,
                doctor_id: visitData.doctorId,
                total_price: totalPrice
            });

            await newPrescription.save();

            newVisit.prescriptions.push(newPrescription._id);
            medicalRecord.medical_history.push(newVisit);
            await medicalRecord.save();
        } else {
            console.error("Không có thuốc nào được thêm vào.");
            return { success: false, message: "Không có thuốc nào được thêm vào." };
        }

        return { success: true, data: medicalRecord };
    } catch (error) {
        console.error("Lỗi khi thêm thông tin khám bệnh:", error);
        return { success: false, message: "Lỗi khi thêm thông tin khám bệnh" };
    }
};