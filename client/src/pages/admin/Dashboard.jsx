import React from "react";
import "../../style/adminStyle/dashboard.scss";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import StaticsBySpecialty from "../../components/statistical/StatisticsBySpecialty";
import StatisticsByDoctor from "../../components/statistical/StatisticsByDoctor";
const Dashboard = () => {
  return (
    <>
    <div className="tabs-container">
    <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className=""
      >
        <Tab eventKey="home" title="Thống kê theo chuyên khoa">
         <StaticsBySpecialty/>
        </Tab>
        <Tab eventKey="profile" title="Thống kê theo bác sĩ">
          <StatisticsByDoctor></StatisticsByDoctor>
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
      
    </>
  );
};

export default Dashboard;
