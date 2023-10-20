import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import './index.css';
import MiniSidebar from "./components/MiniSidebar/MiniSidebar";
import MainLayout from "./layouts/MainLayout/MainLayout";
import ModalSensor from "./components/ModalSensor/ModalSensor";
import DroneInfo from "./components/DroneInfo/DroneInfo";
import SidebarDrones from "./components/SidebarDrones/SidebarDrones";
import {store} from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <MainLayout/>
    </Provider>
    // <img src={dron} alt="dron icon"/>
    // <ModalSensor/>
);

