// --- Inicio de las variables de datos ---
const datosEnergia = {
    "energia_undimotriz": {
        "costo_mwh": 180,
        "factor_capacidad": 35,
        "emisiones_co2_ton_mwh": 0.005,
        "madurez_tecnologica": 2
    },
    "energia_solar_fotovoltaica": {
        "costo_mwh": 40,
        "factor_capacidad": 25,
        "emisiones_co2_ton_mwh": 0.003,
        "madurez_tecnologica": 4
    },
    "energia_eolica": {
        "costo_mwh": 35,
        "factor_capacidad": 40,
        "emisiones_co2_ton_mwh": 0.002,
        "madurez_tecnologica": 5
    },
    "energia_hidroelectrica": {
        "costo_mwh": 50,
        "factor_capacidad": 60,
        "emisiones_co2_ton_mwh": 0.001,
        "madurez_tecnologica": 5
    },
    "energia_combustibles_fosiles": {
        "costo_mwh": 70,
        "factor_capacidad": 80,
        "emisiones_co2_ton_mwh": 0.5,
        "madurez_tecnologica": 5
    }
};

const TiposEnergia = [
    'Energía Undimotriz',
    'Energía Solar Fotovoltaica',
    'Energía Eólica',
    'Energía Hidroeléctrica',
    'Combustibles Fósiles'
];

const Conjuntodedatos = [
    {
        label: 'Costo (USD/MWh)',
        data: [],
        backgroundColor: 'rgba(151, 255, 99, 0.6)',
        borderColor: 'rgb(159, 255, 99)',
        borderWidth: 1
    },
    {
        label: 'Factor de Capacidad (%)',
        data: [],
        backgroundColor: 'rgba(54, 235, 235, 0.6)',
        borderColor: 'rgb(54, 235, 223)',
        borderWidth: 1
    },
    {
        label: 'Emisiones CO2 (ton/MWh)',
        data: [],
        backgroundColor: 'rgba(2, 73, 195, 0.6)',
        borderColor: 'rgb(20, 0, 236)',
        borderWidth: 1
    },
    {
        label: 'Madurez Tecnológica (1-5)',
        data: [],
        backgroundColor: 'rgba(229, 102, 255, 0.6)',
        borderColor: 'rgb(229, 102, 255)',
        borderWidth: 1
    }
];

// Llenar los arrays de datos
for (const key of Object.keys(datosEnergia)) {
    Conjuntodedatos[0].data.push(datosEnergia[key].costo_mwh);
    Conjuntodedatos[1].data.push(datosEnergia[key].factor_capacidad);
    Conjuntodedatos[2].data.push(datosEnergia[key].emisiones_co2_ton_mwh);
    Conjuntodedatos[3].data.push(datosEnergia[key].madurez_tecnologica);
}

// --- Configuración global de Chart.js para el color de la fuente ---
Chart.defaults.color = '#FFFFFF';
Chart.defaults.font.size = 14;

// --- Inicio de la creación del gráfico ---
const ctx = document.getElementById('GraficoBarra').getContext('2d');

let myChart;

function createOrUpdateChart() {
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: TiposEnergia,
            datasets: Conjuntodedatos
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación de Métricas Clave por Tipo de Energía',
                    font: {
                        size: 18,
                        color: '#FFFFFF'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.datasetIndex === 0) {
                                label += `${context.raw} USD/MWh`;
                            } else if (context.datasetIndex === 1) {
                                label += `${context.raw}%`;
                            } else if (context.datasetIndex === 2) {
                                label += `${context.raw.toFixed(4)} ton/MWh`;
                            } else if (context.datasetIndex === 3) {
                                label += `${context.raw} (1-5)`;
                            }
                            return label;
                        }
                    },
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF'
                },
                legend: {
                    onClick: function(e, legendItem, legend) {
                        const chart = legend.chart;
                        const clickedDatasetIndex = legendItem.datasetIndex;

                        let allHiddenExceptClicked = true;
                        chart.data.datasets.forEach((dataset, index) => {
                            if (index !== clickedDatasetIndex && chart.isDatasetVisible(index)) {
                                allHiddenExceptClicked = false;
                            }
                        });

                        if (allHiddenExceptClicked && chart.isDatasetVisible(clickedDatasetIndex)) {
                            chart.data.datasets.forEach((dataset, index) => {
                                chart.setDatasetVisibility(index, true);
                            });
                        } else {
                            chart.data.datasets.forEach((dataset, index) => {
                                const isVisible = (index === clickedDatasetIndex);
                                chart.setDatasetVisibility(index, isVisible);
                            });
                        }

                        chart.update();
                    },
                    labels: {
                        fontColor: '#FFFFFF',
                        generateLabels: function(chart) {
                            const datasets = chart.data.datasets;
                            return datasets.map((dataset, i) => {
                                const isVisible = chart.isDatasetVisible(i);
                                return {
                                    text: dataset.label,
                                    fillStyle: dataset.backgroundColor,
                                    strokeStyle: dataset.borderColor,
                                    lineWidth: dataset.borderWidth,
                                    hidden: !isVisible,
                                    fontColor: isVisible ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                                    datasetIndex: i
                                };
                            });
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tipo de Energía',
                        color: 'rgb(151, 255, 99)'
                    },
                    ticks: {
                        color: '#FFFFFF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor de la Métrica',
                        color:'rgb(151, 255, 99)'
                    },
                    ticks: {
                        color: '#FFFFFF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', createOrUpdateChart);
