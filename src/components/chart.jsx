import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

faker.seed(123);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      // position: "top" as const,
    },
    title: {
      display: true,
      text: "Performance",
    },
  },
};

// const labels = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// export const data = {
//   labels,
//   datasets: [
//     {
//       fill: false,
//       label: "Active Auctions",
//       // data: labels.map(() => faker.datatype.number()),
//       data: 0,
//       // data: labels.map(() => 1),

//       borderColor: "rgb(107, 171, 189)",
//       backgroundColor: "rgba(107, 171, 189,0.5)",
//     },
//     {
//       fill: false,
//       label: "Models",
//       // data: labels.map(() => faker.datatype.number()),
//       data: 0,

//       // data: labels.map(() => 1),

//       borderColor: "rgb(225, 97, 98)",
//       backgroundColor: "rgba(225, 97, 98, 0.5)",
//     },
//     {
//       fill: false,
//       label: "Bids",
//       // data: labels.map(() => faker.datatype.number()),
//       data: 0,

//       // data: labels.map(() => 1),

//       borderColor: "rgb(243, 206, 178)",
//       backgroundColor: "rgba(243, 206, 178,0.5)",
//     },
//     {
//       fill: false,
//       label: "Quote Requests",
//       // data: labels.map(() => faker.datatype.number()),
//       data: 0,

//       // data: labels.map(() => 1),

//       borderColor: "rgb(134, 151, 166)",
//       backgroundColor: "rgba(134, 151, 166, 0.5)",
//     },
//   ],
// };

export default function Chart(props) {
  // const [data, setData] = useState({});

  return <Line options={options} data={props.data} />;
}
