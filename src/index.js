import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MiniSidebar from "./components/MiniSidebar/MiniSidebar";
import MainLayout from "./layouts/MainLayout/MainLayout";
import ModalSensor from "./components/ModalSensor/ModalSensor";
import DroneInfo from "./components/DroneInfo/DroneInfo";
import SidebarDrones from "./components/SidebarDrones/SidebarDrones";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <img src={dron} alt="dron icon"/>
    <MainLayout/>
    // <ModalSensor/>
);

