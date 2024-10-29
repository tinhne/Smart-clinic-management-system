import React, { useEffect, useState } from "react";
import { getAppointmentCountBySpecialties } from "../../utils/StaticsAPI/StaticsService";
import {
  BarChart,
  Tooltip,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "../../style/Statics/StatisticsBySpecialty.scss";

const StaticsBySpecialty = () => {
  const [specialtiesData, setSpecialtiesData] = useState([]);

  const colors = ["#FF5733", "#33FF57", "#3357FF"]; // Thay thế bằng các mã màu bạn muốn

  const fetchData = async () => {
    try {
      const data = await getAppointmentCountBySpecialties();

      // Convert data from object to array format for BarChart
      const formattedData = Object.entries(data).map(([specialty, count]) => ({
        name: specialty,
        count,
      }));

      setSpecialtiesData(formattedData);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="statics-container">
        <h2>Appointments by Specialty</h2>
        <ResponsiveContainer width="80%" height={400}>
          <BarChart data={specialtiesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar name="Số lượng" dataKey="count" barSize={40} fill="#3357FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default StaticsBySpecialty;
