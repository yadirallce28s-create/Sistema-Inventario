import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function ProductosChart({ datos }) {

    const labels = datos.map(item => item.nombre);
    const valores = datos.map(item => Number(item.cantidad));

    const data = {
        labels,
        datasets: [
            {
                label: "Productos por Categoría",
                data: valores,
                backgroundColor: [
                    "#14b8a6",
                    "#0ea5e9",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#ec4899",
                    "#22c55e",
                    "#f97316"
                ],
                borderColor: "#ffffff",
                borderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: {
                        size: 11
                    }
                }
            }
        }
    };

    return (
        <div style={{ height: "240px", width: "240px", margin: "0 auto" }}>
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default ProductosChart;