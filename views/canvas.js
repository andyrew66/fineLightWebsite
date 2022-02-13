

var ctx = document.getElementById('myChart').getContext('2d');
var months = document.getElementById('months').value;
var monthsSplit = months.split(',');
var sales = document.getElementById('sales').value;
var salesSplit = sales.split(',');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: monthsSplit,
        datasets: [{
            label: '£',
            data: salesSplit,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,

                ticks: {
                    callback: function(value, index, values) {
                        return '£' + value;
                    }
                }
            }
        }
    }
});
