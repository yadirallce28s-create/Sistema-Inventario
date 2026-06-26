const Dashboard = require("../models/dashboard.model");

const obtenerDashboard = async (req, res) => {

    try {

        const dashboard = await Dashboard.obtenerDashboard();

        res.status(200).json({

            status: "success",

            dashboard

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            status: "error",

            message: error.message

        });

    }

};

module.exports = {

    obtenerDashboard

};