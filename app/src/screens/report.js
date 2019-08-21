import React, { Component } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import '../styles/Report.css';

class ReportPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    plot(chart, width, height, data) {
        // create scales!
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, width]);
        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        chart.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', d => xScale(d.name))
            .attr('y', d => yScale(d.percentageScore))
            .attr('height', d => (height - yScale(d.percentageScore)))
            .attr('width', d => xScale.bandwidth())
            .style('fill', (d, i) => colorScale(i));

        chart.selectAll('.bar-label')
            .data(data)
            .enter()
            .append('text')
            .classed('bar-label', true)
            .attr('x', d => xScale(d.name) + xScale.bandwidth()/2)
            .attr('dx', 0)
            .attr('y', d => yScale(d.percentageScore))
            .attr('dy', -6)
            .text(d => d.percentageScore);

        const xAxis = d3.axisBottom()
            .scale(xScale);

        chart.append('g')
            .classed('x axis', true)
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        const yAxis = d3.axisLeft()
            .ticks(5)
            .scale(yScale);

        chart.append('g')
            .classed('y axis', true)
            .attr('transform', 'translate(0,0)')
            .call(yAxis);

        chart.select('.x.axis')
            .append('text')
            .attr('x',  width/2)
            .attr('y', 60)
            .attr('fill', '#000')
            .style('font-size', '20px')
            .style('text-anchor', 'middle')
            .text('Students');

        chart.select('.y.axis')
            .append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('transform', `translate(-50, ${height/2}) rotate(-90)`)
            .attr('fill', '#000')
            .style('font-size', '20px')
            .style('text-anchor', 'middle')
            .text('Class Percentage Score');

        const yGridlines = d3.axisLeft()
            .scale(yScale)
            .ticks(2)
            .tickSize(-width,0,0)
            .tickFormat('')

        chart.append('g')
            .call(yGridlines)
            .classed('gridline', true);
    }

    drawChart(data) {
        const width = 800;
        const height = 450;

        const el = new Element('div');
        const svg = d3.select(el)
            .append('svg')
            .attr('id', 'chart')
            .attr('width', width)
            .attr('height', height);

        const margin = {
            top: 60,
            bottom: 100,
            left: 80,
            right: 40
        };

        const chart = svg.append('g')
            .classed('display', true)
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        this.plot(chart, chartWidth, chartHeight, data);

        return el.toReact();
    }

    async componentDidMount() {
        const response = await fetch('/api/students');
        const body = await response.json();
        let data = [];
        for (let i =0;i < body.length; i++){
            let student={};
            student.name = body[i].name;
            student.percentageScore = Math.round((body[i].physics + body[i].chemistry + body[i].mathematics) / 3);
            data.push(student);
        }
        this.setState({ data: data });
    }

    render() {
        const {data} = this.state;
        return this.drawChart(data);
    }
}

export default ReportPage;