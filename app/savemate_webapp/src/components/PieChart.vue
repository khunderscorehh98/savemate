<template>
    <Pie :data="chartData" :options="options" />
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
  ChartJS.register(Title, Tooltip, Legend, ArcElement)
  
  export default {
    name: 'PieChart',
    props: ['chartData', 'options'],
    components: { Pie }
  }
  </script>