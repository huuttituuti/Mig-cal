import ApexCharts from 'apexcharts';
import fi from 'apexcharts/dist/locales/fi.json';

export function splineChart(
  dateRange: Array | number,
  migDaysTotal: Array,
  prevMed: Array,
  Ajovy: Array | number
) {
  const container = document.querySelector("[infogram='spline']");
  const div = document.createElement('div');
  div.setAttribute('infogram', 'spline-chart');
  container?.appendChild(div);
  const colorsDataLabels = ['#cea700', '#ff0000', '#0099ff'];
  const colors = ['#fccf0c', '#ff0000', '#0099ff'];
  const options = {
    series: [
      {
        name: 'migreenipäivät (per kk)',
        data: migDaysTotal,
      },
      {
        name: 'noritren (kpl)',
        data: prevMed,
      },
      {
        name: 'ajovy',
        data: Ajovy,
      },
    ],
    chart: {
      height: 550,
      type: 'area',
      locales: [fi],
      defaultLocale: 'fi',
    },

    dataLabels: {
      enabled: true,
      style: {
        fontSize: '.9rem',
        colors: colorsDataLabels,
      },
      /*background: {
        enabled: true,
        foreColor: '#fff',
        borderRadius: 2,
        padding: 4,
        opacity: 0.9,
        borderWidth: 1,
        borderColor: '#fff',
      },*/
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      fontSize: '16px',
      markers: {
        fillColors: colorsDataLabels,
      },
    },
    stroke: {
      //curve: 'smooth',
      curve: 'straight',
      colors: colors,
      //curve: 'stepline',
    },
    fill: {
      colors: colors,
    },
    /*title: {
      text: 'Migreenit kuukausittain',
      align: 'left',
      style: {
        fontSize: '1rem',
        //fontFamily: inherit,
        //fontWeight: 'bold',
      },
    },*/
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
      categories: dateRange,
    },
    yaxis: {
      labels: {
        show: true,
        align: 'right',
      },
      title: {
        text: 'Kpl',
        style: {
          fontSize: '.9rem',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 500,
        },
      },
    },
    tooltip: {
      shared: false,
      style: {
        fontSize: '.9rem',
        fontColor: 'white',
      },
      //fillSeriesColor: true,
      marker: {
        show: false,
        //backgroundColor: colors,
        /*style: {
          backgroundColor: colors,
        },*/
        //fillColors: colorsDataLabels,
        //colors: colors,
      },
      x: {
        format: 'dd.MM.yy',
      },
    },
  };

  const chart = new ApexCharts(div, options);
  chart.render();
}
