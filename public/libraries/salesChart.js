var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: JSON.parse(document.getElementById("total_sales_graph").value),
    options: {}
});