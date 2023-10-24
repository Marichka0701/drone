import React from 'react';
// import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill} from 'react-icons/bs'
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';


import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import styles from './AllDronesCharts.scss';
import {BarChart} from "recharts";

const AllDronesCharts = ({chartData}) => {
    const data = [
        {
            name: 'Jan, Feb',
            uv: 4000,
            pv: 2400,
            // amt: 2400,
        },
        {
            name: 'Mar, Apr',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'May, Jun',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Jul, Aug',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Sep, Oct',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Nov, Dec',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
    ];

    const userDataApp = [
        {
            id: 1,
            year: 2016,
            userGain: 80000,
            userLost: 823,
        },
        {
            id: 2,
            year: 2017,
            userGain: 45677,
            userLost: 345,
        },
        {
            id: 3,
            year: 2018,
            userGain: 78888,
            userLost: 555,
        },
        {
            id: 4,
            year: 2019,
            userGain: 90000,
            userLost: 4555,
        },
        {
            id: 5,
            year: 2020,
            userGain: 4300,
            userLost: 234,
        },
    ];


    return (
        <div style={{ width: 700 }}>
            <BarChart chartData={chartData} />
        </div>
        // <div style={{width: '60vw', height: '100vh'}} className={styles.allDronesCharts}>
        //     <div style={{width: '60vw', height: '100vh'}} className='charts'>
        //         <ResponsiveContainer width="80%" height="50%">
        //             <BarChart
        //                 width={500}
        //                 height={300}
        //                 data={data}
        //                 margin={{
        //                     top: 5,
        //                     right: 30,
        //                     left: 20,
        //                     bottom: 5,
        //                 }}
        //             >
        //                 {/*<CartesianGrid strokeDasharray="10 10" />*/}
        //                 <XAxis dataKey="name" />
        //                 <YAxis />
        //                 <Tooltip />
        //                 {/*<Legend />*/}
        //                 <Bar radius={10} dataKey="pv" fill="#3B82F6" />
        //                 <Bar radius={10} dataKey="uv" fill="#CCDCFF" />
        //             </BarChart>
        //         </ResponsiveContainer>
        //
        //         {/*<ResponsiveContainer width="100%" height="100%">*/}
        //         {/*    <LineChart*/}
        //         {/*        width={500}*/}
        //         {/*        height={300}*/}
        //         {/*        data={data}*/}
        //         {/*        margin={{*/}
        //         {/*            top: 5,*/}
        //         {/*            right: 30,*/}
        //         {/*            left: 20,*/}
        //         {/*            bottom: 5,*/}
        //         {/*        }}*/}
        //         {/*    >*/}
        //         {/*        <CartesianGrid strokeDasharray="3 3" />*/}
        //         {/*        <XAxis dataKey="name" />*/}
        //         {/*        <YAxis />*/}
        //         {/*        <Tooltip />*/}
        //         {/*        <Legend />*/}
        //         {/*        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />*/}
        //         {/*        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
        //         {/*    </LineChart>*/}
        //         {/*</ResponsiveContainer>*/}
        //
        //     </div>
        // </div>
    );
};

export default AllDronesCharts;