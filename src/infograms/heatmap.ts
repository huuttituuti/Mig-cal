import ApexCharts from 'apexcharts';
import fi from 'apexcharts/dist/locales/fi.json';

export function heatMap(migDaysTotal: Array | number) {
  const container = document.querySelector("[infogram='heatmap']");
  const div = document.querySelector("[infogram='spline-heatmap']");

  const arr2021 = [];
  const arr2022 = [];
  const arr2023 = [];
  const arr2024 = [];

  for (let i = 0; i < migDaysTotal.length; i++) {
    const year = migDaysTotal[i].x.slice(0, 4);
    const migs = migDaysTotal[i].y;
    if (year === '2021') {
      arr2021.push(migs);
    } else if (year === '2022') {
      arr2022.push(migs);
    } else if (year === '2023') {
      arr2023.push(migs);
    } else if (year === '2024') {
      arr2024.push(migs);
    }
  }

  const options = {
    series: [
      {
        name: '2024',
        data: arr2024,
      },
      {
        name: '2023',
        data: arr2023,
      },
      {
        name: '2022',
        data: arr2022,
      },
      {
        name: '2021',
        data: arr2021,
      },
    ],
    chart: {
      height: 400,
      type: 'heatmap',
      locales: [fi],
      defaultLocale: 'fi',
    },
    tooltip: {
      x: {
        show: true,
      },
      style: {
        fontSize: '.9rem',
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      fontSize: '14px',
      markers: {
        //fillColors: colorsDataLabels,
      },
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      heatmap: {
        radius: '50%',
        enableShades: true,
        //shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 5,
              color: '#ffbf89',
              //foreColor: 'black',
            },
            {
              from: 6,
              to: 10,
              color: '#f79c87',
              //foreColor: 'black',
            },
            {
              from: 11,
              to: 15,
              color: '#e17e8e',
              //foreColor: 'black',
            },
            {
              from: 16,
              to: 20,
              color: '#bd6897',
              //foreColor: 'black',
            },
            {
              from: 21,
              to: 30,
              color: '#6c579b',
              //foreColor: 'black',
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
        fontSize: '1rem',
      },
    },
    xaxis: {
      //type: 'category',
      categories: [
        'Tammi',
        'Helmi',
        'Maalis',
        'Huhti',
        'Touko',
        'Kesä',
        'Heinä',
        'Elo',
        'Syys',
        'Loka',
        'Marras',
        'Joulu',
      ],
      labels: {
        style: {
          fontSize: '.9rem',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '.9rem',
        },
      },
    },
  };

  const chart = new ApexCharts(div, options);
  chart.render();
}

/*{
              from: 0,
              to: 5,
              color: '#ffbf89',
            },
            {
              from: 6,
              to: 10,
              color: '#f79c87',
            },
            {
              from: 11,
              to: 15,
              color: '#e17e8e',
            },
            {
              from: 16,
              to: 20,
              color: '#bd6897',
            },
            {
              from: 21,
              to: 30,
              color: '#6c579b',
            },*/
