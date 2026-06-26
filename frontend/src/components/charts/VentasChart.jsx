import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function VentasChart() {

    const data = {
        labels: [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun"
        ],
        datasets: [
            {
                label: "Ventas",
                data: [1200, 1900, 1700, 2500, 2800, 3500],
                borderColor: "#14b8a6",
                backgroundColor: "#99f6e4",
                tension: 0.4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 11
                    }
                }
            }
        },

        scales: {
            x: {
                ticks: {
                    font: {
                        size: 10
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 10
                    }
                }
            }
        }
    };

    return (
        <div style={{ width: "100%", height: "180px" }}>
            <Line data={data} options={options} />
        </div>
    );
}

export default VentasChart;