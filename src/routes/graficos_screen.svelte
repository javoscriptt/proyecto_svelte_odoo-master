<script lang="ts">
    import { onMount } from 'svelte';
    import { db } from '$lib/firebase';
    import { collection, getDocs } from 'firebase/firestore';
    import * as d3 from 'd3';

    let ventasPorCategoria = {};
    let categoriaMasVendida = '';
    let productosCategoriaMasVendida = [];
    let selectedDate = '2025-02';
    let selectedMonth = '02';
    let selectedYear = '2025';

    let chartTypeCategorias = 'barras';
    let chartTypeProductos = 'barras';

    const colores = d3.scaleOrdinal(d3.schemeCategory10);

    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, 'PedidosUser'));
        const ventas = {};

        querySnapshot.forEach((doc) => {
            const { date, products } = doc.data();
            const [day, month, year] = date.split('/');

            if (month === selectedMonth && year === selectedYear) {
                products.forEach(product => {
                    ventas[product.category] = (ventas[product.category] || 0) + product.quantity;
                });
            }
        });

        ventasPorCategoria = ventas;

        const [topCategory] = Object.entries(ventasPorCategoria).sort((a, b) => b[1] - a[1]);
        if (topCategory) {
            categoriaMasVendida = topCategory[0];
            await fetchProductosCategoria(topCategory[0]);
        }

        drawCharts();
    }

    async function fetchProductosCategoria(categoria) {
        productosCategoriaMasVendida = [];
        const querySnapshot = await getDocs(collection(db, 'PedidosUser'));
        const productos = {};

        querySnapshot.forEach((doc) => {
            const { date, products } = doc.data();
            const [day, month, year] = date.split('/');

            if (month === selectedMonth && year === selectedYear) {
                products.forEach(product => {
                    if (product.category === categoria) {
                        productos[product.name] = (productos[product.name] || 0) + product.quantity;
                    }
                });
            }
        });

        productosCategoriaMasVendida = Object.entries(productos).map(([name, quantity]) => ({ name, quantity }));
    }

    function drawCharts() {
        drawCategoriaChart();
        drawProductoChart();
    }

    function drawCategoriaChart() {
        const data = Object.entries(ventasPorCategoria).map(([category, count]) => ({ category, count }));
        d3.select('#ventas-por-categoria').selectAll('*').remove();

        if (chartTypeCategorias === 'barras') {
            drawBarChart('#ventas-por-categoria', data, 'category', 'count');
        } else {
            drawPieChart('#ventas-por-categoria', data, 'category', 'count');
        }
    }

    function drawProductoChart() {
        d3.select('#productos-categoria').selectAll('*').remove();

        if (chartTypeProductos === 'barras') {
            drawBarChart('#productos-categoria', productosCategoriaMasVendida, 'name', 'quantity');
        } else {
            drawPieChart('#productos-categoria', productosCategoriaMasVendida, 'name', 'quantity');
        }
    }

    function drawBarChart(selector, data, labelKey, valueKey) {
        const svg = d3.select(selector)
            .attr('width', 400)
            .attr('height', 300);

        const x = d3.scaleBand().domain(data.map(d => d[labelKey])).range([0, 400]).padding(0.2);
        const y = d3.scaleLinear().domain([0, d3.max(data, d => d[valueKey]) || 10]).range([300, 0]);

        svg.append('g').attr('transform', 'translate(0,300)').call(d3.axisBottom(x)).selectAll('text').attr('transform', 'rotate(-45)').style('text-anchor', 'end');
        svg.append('g').call(d3.axisLeft(y));

        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => x(d[labelKey]))
            .attr('y', d => y(d[valueKey]))
            .attr('width', x.bandwidth())
            .attr('height', d => 300 - y(d[valueKey]))
            .attr('fill', (d, i) => colores(d[labelKey]));

        svg.selectAll('.label')
            .data(data)
            .enter()
            .append('text')
            .attr('x', d => x(d[labelKey])! + x.bandwidth() / 2)
            .attr('y', d => y(d[valueKey]) - 5)
            .attr('text-anchor', 'middle')
            .text(d => d[valueKey]);
    }

    function drawPieChart(selector, data, labelKey, valueKey) {
        const svg = d3.select(selector)
            .attr('width', 400)
            .attr('height', 300);

        const radius = Math.min(400, 300) / 2;
        const g = svg.append('g').attr('transform', `translate(${200},${150})`);

        const pie = d3.pie().value(d => d[valueKey]);
        const arc = d3.arc().innerRadius(0).outerRadius(radius);

        g.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => colores(d.data[labelKey]));

        addLegend(selector, data, labelKey);
    }

    function addLegend(selector, data, labelKey) {
        const container = d3.select(selector).append('g').attr('transform', 'translate(420, 0)');

        data.forEach((d, i) => {
            const row = container.append('g').attr('transform', `translate(0, ${i * 20})`);

            row.append('rect')
                .attr('width', 15)
                .attr('height', 15)
                .attr('fill', colores(d[labelKey]));

            row.append('text')
                .attr('x', 20)
                .attr('y', 12)
                .text(d[labelKey]);
        });
    }

    function updateData() {
        const [year, month] = selectedDate.split('-');
        selectedYear = year;
        selectedMonth = month;
        fetchData();
    }

    onMount(() => {
        fetchData();
    });
</script>

<main>
    <h1>Gráficos de Ventas</h1>
    <label>Selecciona mes y año:</label>
    <input type="month" bind:value={selectedDate} on:change={updateData} />

    <div class="grid">
        <div class="chart-container">
            <h2>Ventas por Categoría</h2>
            <button on:click={() => { chartTypeCategorias = 'barras'; drawCategoriaChart(); }}>📊 Barras</button>
            <button on:click={() => { chartTypeCategorias = 'pastel'; drawCategoriaChart(); }}>🎂 Pastel</button>
            <svg id="ventas-por-categoria"></svg>
        </div>

        <div class="chart-container">
            <h2>Productos mas vendidos de la categoría: {categoriaMasVendida}‼️</h2>
            <button on:click={() => { chartTypeProductos = 'barras'; drawProductoChart(); }}>📊 Barras</button>
            <button on:click={() => { chartTypeProductos = 'pastel'; drawProductoChart(); }}>🎂 Pastel</button>
            <svg id="productos-categoria"></svg>
        </div>
    </div>
</main>

<style>
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .chart-container { background: #f9f9f9; padding: 10px; border: 1px solid #ccc; }
    svg { width: 100%; height: auto; }
</style>
