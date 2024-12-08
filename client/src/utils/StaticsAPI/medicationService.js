import axios from "../../config/axios.customize";

const getMedicationSalesReport = async () => {
  return axios.get('/api/medications/medication-sales-report', {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { getMedicationSalesReport };