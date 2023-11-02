import { calendar } from '$utils/calendar';
import { createLinesPrev } from '$utils/create-lines-prev';
import { createMedStamps } from '$utils/create-med-stamps';
import { getNthDays } from '$utils/get-nth-days';
import { getNthDaysByNumber } from '$utils/get-nth-days-by-number';
import { totalMigDays } from '$utils/total-mig-days';

import { heatMap } from './infograms/heatmap';
import { splineChart } from './infograms/splineChart';

window.Webflow ||= [];
window.Webflow.push(() => {
  // MODELS
  const migBg = '#fff8c5';
  const ajovyBg = '#9bdaff';
  const kkModel = document.querySelector("[calendar='kk']");
  // pain-meds
  const painMedModel = document.querySelector("[calendar='pain-med']");
  const triptanModel = document.querySelector("[calendar='triptan']");
  // bio-meds
  const hulioModel = document.querySelector("[calendar='hulio']");
  const ajovyModel = document.querySelector("[calendar='ajovy']");
  const medsArray = [];
  // Last updated
  const createdAt = [];
  // INFOGRAM
  const infogramNoritren = [];
  const infogramAjovyDate = [
    { x: Date.parse('2022/08/05'), y: 1 },
    { x: Date.parse(new Date()), y: 1 },
  ];
  const infogramDateRange = [];
  const infogramMigDaysTotal = [];

  // Create a request variable and assign a new XMLHttpRequest object to it.
  const request = new XMLHttpRequest();
  const xanoUrl = new URL('https://x8ki-letl-twmt.n7.xano.io/api:MrNeemzk/calendar');

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', xanoUrl.toString(), true);

  request.onload = function (err) {
    // Begin accessing JSON data here
    const data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      // Get the years in data and create calendar based on that
      let yearsArray = Array.from(
        Object.keys(data).map((i) => Number(data[i].date.substring(0, 4)))
      );
      // remove duplicates
      yearsArray = yearsArray.filter(function (value, index, array) {
        return array.indexOf(value) === index;
      });
      // create calendar with the years
      calendar(yearsArray);

      for (let i = 0; i < data.length; i++) {
        createdAt.push(data[i].created_at);
        const year = data[i].date.substring(0, 4);
        const month = data[i].date.substring(5, 7);
        const day = data[i].date.substring(8, 10);
        const dayWrp = document.getElementById(`${year}-${month}-${day}`);

        // periods
        if (data[i].kk === true) {
          dayWrp.appendChild(kkModel.cloneNode(true));
        }
        // pain-meds
        if (data[i].pain_med) {
          const wrpPainMed = document.createElement('div');
          wrpPainMed.classList.add('marks_wrp');
          wrpPainMed.style.cssText = `grid-area: ${2}/${1}/${3}/${2}`;
          dayWrp.appendChild(wrpPainMed);

          const paracetamol = data[i].pain_med[0].paracetamol_g;
          const ibuprofen = data[i].pain_med[0].ibuprofen_mg;
          const triptan = data[i].pain_med[0].triptan_pcs;

          if (paracetamol > 0) {
            const pa = painMedModel.cloneNode(true);
            pa.textContent = `${paracetamol}g`;
            wrpPainMed.appendChild(pa);
          }
          if (ibuprofen > 0) {
            const ib = painMedModel.cloneNode(true);
            ib.textContent = `${ibuprofen}mg`;
            wrpPainMed.appendChild(ib);
          }
          if (triptan > 0) {
            const triptanWrp = document.createElement('div');
            triptanWrp.classList.add('marks_triptan-wrp');
            wrpPainMed.appendChild(triptanWrp);

            if (triptan === 1) {
              const tri = triptanModel.cloneNode(true);
              triptanWrp.appendChild(tri);
            } else if (triptan === 2) {
              const tri = triptanModel.cloneNode(true);
              const tri2 = triptanModel.cloneNode(true);
              triptanWrp.appendChild(tri);
              triptanWrp.appendChild(tri2);
            }
          }
        } // if pain-med

        // other-meds
        if (data[i].other_med.length >= 1) {
          const otherMedsWrp = document.createElement('div');
          otherMedsWrp.classList.add('marks_wrp');
          otherMedsWrp.style.cssText = `grid-area: ${2}/${2}/${3}/${3}`;
          dayWrp.appendChild(otherMedsWrp);

          const otherMeds = data[i].other_med;

          for (let i = 0; i < otherMeds.length; i++) {
            const objects = Object.entries(otherMeds[i]);
            Object.keys(otherMeds[i]).forEach((key) => {
              const obj = otherMeds[i][key];
              const icon = key[0].toUpperCase();
              const name = key;
              createMedStamps(name, obj, icon, otherMedsWrp);
              medsArray.push({
                name: key,
                icon: icon,
                amount: otherMeds[i][key].amount_mg,
                stamp: otherMeds[i][key].stamp,
              });
            });
          }
        } // if other-meds

        // migraine bg
        if (data[i].migraine === true) {
          dayWrp.style.backgroundColor = migBg;
          dayWrp?.setAttribute('mig', 'true');
        }
        // other mentions
        if (data[i].other_mentions.length >= 1) {
          const text = document.querySelector("[calendar='other-mentions']")?.cloneNode(true);
          text.textContent = data[i].other_mentions[0].event_1;

          if (dayWrp?.querySelector('.marks_wrp')) {
            dayWrp?.querySelector('.marks_wrp').appendChild(text);
          } else {
            const wrpOtherMentions = document.createElement('div');
            wrpOtherMentions.classList.add('marks_wrp');
            dayWrp?.appendChild(wrpOtherMentions);
            wrpOtherMentions.appendChild(text);
          }
        }

        // INFOGRAMS
        // noritren
        if (data[i].other_med[0] !== undefined) {
          if (data[i].other_med[0].noritren.stamp === true) {
            const dateFull = data[i].date;
            const obj = {
              x: Date.parse(dateFull.replaceAll('-', '/')),
              y: data[i].other_med[0].noritren.amount_mg,
            };
            infogramNoritren.push(obj);
          }
        }
      } // for data

      // ON PROGRESS Update the text in Last updated
      const lastUpdated = new Date(createdAt[createdAt.length - 1]).toLocaleDateString('fi-FI');
      document.getElementById('update-date').textContent = lastUpdated;

      // Arrange by time
      infogramNoritren.sort((a, b) => {
        return a.x - b.x;
      });

      // create lines for otherMeds
      const medsNames = medsArray.map(({ name }) => name);
      const medsFiltered = medsArray.filter(({ name }, i) => !medsNames.includes(name, i + 1));
      for (let i = 0; i < medsFiltered.length; i++) {
        createLinesPrev(medsFiltered[i].name, medsFiltered[i].icon);
      }
      totalMigDays();

      // BIO-MEDS (loop hard coded for forward)
      // Ajovy every 5th day of month
      const datesAjovy = getNthDaysByNumber('2022-08-05', '05');
      for (let i = 0; i < datesAjovy.length; i++) {
        const div = document.getElementById(datesAjovy[i]);
        // Add AJOVY stamp
        if (div?.querySelector('.marks_wrp')) {
          div?.querySelector('.marks_wrp').appendChild(ajovyModel.cloneNode(true));
        } else {
          const marksWrp = document.createElement('div');
          marksWrp.classList.add('marks_wrp');
          div?.appendChild(marksWrp);
          marksWrp.appendChild(ajovyModel.cloneNode(true));
        }
        // Change bg color
        if (!div?.getAttribute('mig')) {
          div.style.backgroundColor = ajovyBg;
        } else {
          const halfAjovy = document.querySelector("[calendar='half-ajovy']").cloneNode(true);
          div?.appendChild(halfAjovy);
        }
      }
      // Hulio every 2 weeks (14 days)
      const startDayHulio = '2022-03-15';
      const datesHulio = getNthDays(startDayHulio, 14);

      for (let i = 0; i < datesHulio.length; i++) {
        const div = document.getElementById(datesHulio[i]);
        // Add HULIO stamp
        if (div?.querySelector('.marks_wrp')) {
          div?.querySelector('.marks_wrp').appendChild(hulioModel.cloneNode(true));
        } else {
          const marksWrp = document.createElement('div');
          marksWrp.classList.add('marks_wrp');
          div?.appendChild(marksWrp);
          marksWrp.appendChild(hulioModel.cloneNode(true));
        }
      }

      // REMOVE the example
      document.querySelector("[calendar='container']").remove();

      // INFOGRAM
      // Get total mig days for each month
      const sections = document.querySelectorAll("[search='month']");
      const todayDate = `${new Date().getFullYear()}/${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;
      for (let i = 0; i < sections.length; i++) {
        const date = Date.parse(sections[i].id);
        infogramDateRange.push(date);
        const obj = {
          x: sections[i].id.replace('-', '/'),
          y: sections[i].querySelectorAll("[mig='true']").length,
        };
        infogramMigDaysTotal.push(obj);
      }
      // Remove all months that are still in the future and not fully completed
      let todayDateIndex;
      infogramMigDaysTotal.map((i) => {
        if (i.x.replace('-', '/') === todayDate) todayDateIndex = infogramMigDaysTotal.indexOf(i);
      });
      infogramMigDaysTotal.length = todayDateIndex;

      // If infogram tabs is clicked, render infograms
      const inforgamTab = document.querySelector("[data-w-tab='Infogrammit']");
      inforgamTab?.addEventListener('click', function () {
        heatMap(infogramMigDaysTotal);
        splineChart(infogramDateRange, infogramMigDaysTotal, infogramNoritren, infogramAjovyDate);
      });
    } else {
      console.log(err);
    }
  };
  // Send request
  request.send();
}); // webflow
