import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { BeatLoader } from "react-spinners";
import AxiosInstance from "../../AxiosInstance";

function LoginCountChart() {
    const [loginCountData, setLoginCountData] = useState([]);
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchLoginCountData = async () => {
        try {
            const response = await AxiosInstance.post("/api/users/loginData");
            const data = response.data;
    
            const last30Days = generateLast30Days();
    
            const last30DaysData = last30Days.map((day) => {
                const entry = data.find((item) => item._id === day);
                return { date: day, count: entry ? entry.count : 0 };
            });
    
            setLoginCountData(last30DaysData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching login data:", error);
            setIsLoading(false);
        }
    };

    const generateLast30Days = () => {
        const today = new Date();
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            days.push(date.toISOString().slice(0, 10));
        }
        return days;
    };

    const createChart = () => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: loginCountData.map(item => item.date),
                datasets: [
                    {
                        data: loginCountData.map(item => item.count),
                        backgroundColor: "#533C56",
                        borderRadius: 60,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    };

    useEffect(() => {
        fetchLoginCountData();
    }, []);

    useEffect(() => {
        if (!isLoading && loginCountData.length > 0 && canvasRef.current) {
            createChart();
        }
    }, [isLoading, loginCountData]);

    return (
        <div className="daily-login-count-chart-container" style={{ height: '300px', width: '100%' }}>
            {isLoading ? (
                <div className="center" style={{marginTop : "150px"}}>
                    <BeatLoader size={14} color="#007BFF" />
                </div>
            ) : (
                <canvas ref={canvasRef}></canvas>
            )}
        </div>
    );
}

export default LoginCountChart;