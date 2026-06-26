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

function IngresosChart({ datos }) {

    const labels = datos.map(item => item.mes);

    const valores = datos.map(item => Number(item.ingresos));

    const data = {
        labels,
        datasets: [
            {
                label: "Ingresos Mensuales",
                data: valores,
                backgroundColor: "#3b82f6"
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
        <div
            style={{
                width: "100%",
                height: "180px"
            }}
        >
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
}

export default IngresosChart;