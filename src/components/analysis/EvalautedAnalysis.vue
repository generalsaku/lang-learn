<template>
  <div class="analysis">
    <div class="chart-container">
      <canvas ref="$canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart,
  LineController,
  BarController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  BarElement
} from 'chart.js';

const getRecordsWithConsecutiveSuccesses = () => {
  const statisticsEvaluatedStore = useStatisticsEvaluatedStore()
  return Object.values(statisticsEvaluatedStore.stats).map(item => ({ consecutiveSuccess: item.consecutiveSuccess, status: item.status })).filter((y) => y.consecutiveSuccess >= 3 && (y.status === 'intermediate' || y.status === 'success'))
}

const NumberLabelPlugin = {
    id: 'numberLabelPlugin',
    afterDatasetsDraw(chart: Chart) {
        const { ctx } = chart;
        ctx.font = '9px Arial';
        ctx.fillStyle = '#f8f6f6';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        const data = getRecordsWithConsecutiveSuccesses()

        chart.data.datasets.filter(x => x.type === 'bar').forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach((bar, index) => {
                const value = dataset.data[index];
                if (value !== null) {
                  const datapointsInX = data.filter((y) => y.consecutiveSuccess === index + 3)
                  if (!datapointsInX.length) {
                    return null
                  }

                  ctx.fillText(String(datapointsInX.length), bar.x, bar.y - 1); // Position the text above the bar
                }
            });
        });
    }
};

Chart.register(LineController, LineElement, BarController, BarElement, PointElement, LinearScale, CategoryScale, Title, NumberLabelPlugin);

import { onMounted, ref } from 'vue';
import { consecutiveSuccessFormula } from '@/utils/math';
import { useStatisticsEvaluatedStore } from '@/stores/useStatisticsEvaluatedStore';

const $canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!$canvas.value) {
    return
  }

  setupChart($canvas.value)
})

const setupChart = ($canvas: HTMLCanvasElement) => {
  const data = getRecordsWithConsecutiveSuccesses()
  const consecutiveSuccessCount = Math.max(12, Math.max(...data.map(x => x.consecutiveSuccess)))

  const ctx = $canvas.getContext('2d')!
  const labelsX = Array.from(new Array(consecutiveSuccessCount + 1)).map((x, index) => index).filter(x => x >= 3)

  // console.log(Array.from(new Array(24)).map((_, i) => consecutiveSuccessFormula(i)))

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labelsX,
      datasets: [{
        label: 'Curved Line Chart',
        data: labelsX.map((x) => consecutiveSuccessFormula(x)), // Corresponding y-axis values
        borderColor: '#f8f6f6ad',
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 1,
        borderDash: [5, 5]
      },
      {
        type: 'bar',
        label: 'Data Points',
        data: labelsX.map((x) => {
          const datapointsInX = data.filter((y) => y.consecutiveSuccess === x)
          if (!datapointsInX.length) {
            return null
          }

          return consecutiveSuccessFormula(datapointsInX[0].consecutiveSuccess)
        }),
        backgroundColor: 'green',
        maxBarThickness: 14
      }]
    },
    options: {
      animation: false,
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Consecutive Successes',
            color: 'rgba(255, 255, 255, 1)'
          },
          ticks: {
            precision: 0, // Ensure only integer values on the x-axis
            color: '#f8f6f6ad',
            stepSize: 1
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          beginAtZero: true
        },
        y: {
          title: {
            display: true,
            text: 'Days Until Next Try',
            color: 'rgba(255, 255, 255, 1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
            stepSize: 2,
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          beginAtZero: true,
        }
      }
    }
  });
}
</script>

<style scoped>
.analysis {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;

  .chart-container {
    width: calc(100% - 24px);
    height: 50%;
    margin: 0 auto;
  }
}
</style>
