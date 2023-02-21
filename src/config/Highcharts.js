let Graph = {
    'columnDrilldown': [
        {
            chart: {
                type: 'column',
                minHeight: 600,
                height: 600                
            },      
            title: {
                text: ''
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },        
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '10px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{point.y}'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },                  
            series: [],
            drilldown: {
                activeAxisLabelStyle: {
                    textDecoration: 'none'
                },
                activeDataLabelStyle: {
                    textDecoration: 'none',
                    color: '#FFFFFF'
                },
                series: []
            },   
            lang: {
                loading: 'Cargando...',
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                exportButtonTitle: "Exportar",
                printButtonTitle: "Importar",
                rangeSelectorFrom: "Desde",
                rangeSelectorTo: "Hasta",
                rangeSelectorZoom: "Período",
                drillUpText: 'Regresar a {series.name}',
                downloadPNG: 'Descargar imagen PNG',
                downloadJPEG: 'Descargar imagen JPEG',
                downloadPDF: 'Descargar imagen PDF',
                downloadSVG: 'Descargar imagen SVG',
                downloadCSV: 'Descargar CSV',
                downloadXLS: 'Descargar EXCEL',            
                printChart: 'Imprimir',
                resetZoom: 'Reiniciar zoom',
                resetZoomTitle: 'Reiniciar zoom',
                thousandsSep: ".",
                exitFullscreen: 'Salir pantalla completa',
                viewFullscreen: 'Ver pantalla completa',
                decimalPoint: '.'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        text: 'Descargas',                    
                        menuItems: [
                        'printChart',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS',
                        ]
                    }
                }
            }            
        }
    ],
    'pie':[
        {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                minHeight: 300,
                height: 300
            },
            xAxis: {
                lineWidth: 0
            },            
            title: {
                align: 'left',  
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y:.0f}%'
                    }
                }
            },
            credits: {
                enabled: false
            },      
            series: [],
            lang: {
                loading: 'Cargando...',
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                exportButtonTitle: "Exportar",
                printButtonTitle: "Importar",
                rangeSelectorFrom: "Desde",
                rangeSelectorTo: "Hasta",
                rangeSelectorZoom: "Período",
                drillUpText: 'Regresar a {series.name}',
                downloadPNG: 'Descargar imagen PNG',
                downloadJPEG: 'Descargar imagen JPEG',
                downloadPDF: 'Descargar imagen PDF',
                downloadSVG: 'Descargar imagen SVG',
                downloadCSV: 'Descargar CSV',
                downloadXLS: 'Descargar EXCEL',            
                printChart: 'Imprimir',
                resetZoom: 'Reiniciar zoom',
                resetZoomTitle: 'Reiniciar zoom',
                thousandsSep: ".",
                exitFullscreen: 'Salir pantalla completa',
                viewFullscreen: 'Ver pantalla completa',
                decimalPoint: '.'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        text: 'Descargas',                    
                        menuItems: [
                        'printChart',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS',
                        ]
                    }
                }
            }
        }        
    ],
    'lines':[
        {
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },        
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                lineWidth: 0
            },
            yAxis: {
                labels: {
                    format: '{value}',
                },             
                title: {
                    text: 'Cantidades'
                },
            },
            legend: {
                layout: 'vertical',
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0
            },        
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true                 
                    },
                    enableMouseTracking: false
                }
            },
            credits: {
                enabled: false
            },      
            series: [],
            lang: {
                loading: 'Cargando...',
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                exportButtonTitle: "Exportar",
                printButtonTitle: "Importar",
                rangeSelectorFrom: "Desde",
                rangeSelectorTo: "Hasta",
                rangeSelectorZoom: "Período",
                drillUpText: 'Regresar a {series.name}',
                downloadPNG: 'Descargar imagen PNG',
                downloadJPEG: 'Descargar imagen JPEG',
                downloadPDF: 'Descargar imagen PDF',
                downloadSVG: 'Descargar imagen SVG',
                downloadCSV: 'Descargar CSV',
                downloadXLS: 'Descargar EXCEL',            
                printChart: 'Imprimir',
                resetZoom: 'Reiniciar zoom',
                resetZoomTitle: 'Reiniciar zoom',
                thousandsSep: ".",
                exitFullscreen: 'Salir pantalla completa',
                viewFullscreen: 'Ver pantalla completa',
                decimalPoint: '.'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        text: 'Descargas',                    
                        menuItems: [
                            'printChart',
                            'downloadJPEG',
                            'downloadPDF',
                            'downloadCSV',
                            'downloadXLS',
                        ]
                    }
                }
            }                
        }        
    ],
    'barv':[
        {
            chart: {
                type: 'bar'
            },
            title: {
                align: 'left',
                text: ''
            },
            xAxis: {
                categories: [],
                title: {
                    text: null
                }  
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ''
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                enabled: false
                ,reversed: true
            },
            credits: {
                enabled: false
            },   
            series: [],
            lang: {
                loading: 'Cargando...',
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                exportButtonTitle: "Exportar",
                printButtonTitle: "Importar",
                rangeSelectorFrom: "Desde",
                rangeSelectorTo: "Hasta",
                rangeSelectorZoom: "Período",
                drillUpText: 'Regresar a {series.name}',
                downloadPNG: 'Descargar imagen PNG',
                downloadJPEG: 'Descargar imagen JPEG',
                downloadPDF: 'Descargar imagen PDF',
                downloadSVG: 'Descargar imagen SVG',
                downloadCSV: 'Descargar CSV',
                downloadXLS: 'Descargar EXCEL',            
                printChart: 'Imprimir',
                resetZoom: 'Reiniciar zoom',
                resetZoomTitle: 'Reiniciar zoom',
                thousandsSep: ".",
                exitFullscreen: 'Salir pantalla completa',
                viewFullscreen: 'Ver pantalla completa',
                decimalPoint: '.'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: true,
                        text: 'Descargas',                    
                        menuItems: [
                            'printChart',
                            'downloadJPEG',
                            'downloadPDF',
                            'downloadCSV',
                            'downloadXLS',
                        ]
                    }
                }
            }                
        }        
    ]    
}

export {
    Graph
  }