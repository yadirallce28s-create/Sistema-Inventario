import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function TopProductosChart({ datos }) {

    const labels = datos.map(item => item.nombre);

    const valores = datos.map(item => Number(item.vendidos));

    const data = {
        labels,
        datasets: [
            {
                label: "Productos Vendidos",
                data: valores,
                backgroundColor: "#10b981"
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        indexAxis: "y",

        plugins: {
            legend: {
                display: false
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
        <div
            style={{
                width: "100%",
                height: "170px"
            }}
        >
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
}

export default TopProductosChart;