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
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  ScatterController
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, ScatterController);


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
  const statisticsEvaluatedStore = useStatisticsEvaluatedStore()
  const datapoints = Object.values(statisticsEvaluatedStore.stats).map(item => ({ consecutiveSuccess: item.consecutiveSuccess, status: item.status })).filter(x => x.consecutiveSuccess > 0)
  const consecutiveSuccessCount = Math.max(12, Math.max(...datapoints.map(x => x.consecutiveSuccess)))

  const ctx = $canvas.getContext('2d')!
  const labelsX = Array.from(new Array(consecutiveSuccessCount + 1)).map((x, index) => index)

  const getScatterColor = (status: 'none' | 'failed' | 'success' | 'intermediate') => {
    if (status === 'success') {
      return '#39c13d'
    }
    if (status === 'intermediate') {
      return '#fffb25'
    }
    return 'red'
  }

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
        borderWidth: 1
      },
      {
        type: 'scatter',
        label: 'Data Points',
        data: labelsX.map((x) => {
          const datapointsInX = datapoints.filter((y) => y.consecutiveSuccess === x)
          if (!datapointsInX.length) {
            return null
          }

          return consecutiveSuccessFormula(datapointsInX[0].consecutiveSuccess)
        }),
        backgroundColor: 'green',
        pointRadius: 2,
        showLine: false
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
            stepSize: 2
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
