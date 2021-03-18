var ctx = document.getElementById('myChart2').getContext('2d');

var chart = new Chart(ctx, {
    type: 'bar',
    data: JSON.parse(document.getElementById("sales_per_product_graph").value),
    options: {}
});