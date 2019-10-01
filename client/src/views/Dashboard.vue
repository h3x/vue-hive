<template>
  <div class="background">
    <!-- <div v-if='finishedSize + activeSize > 0'>
    <svg :height='height' :width='width' ref="svg">
      <g>
        <rect
          class="bar2"
          :width=finishedSize
          :height=barHeight
          :y=height/2
        ></rect> 
        <rect
          class="bar"
          :width=activeSize
          :height=barHeight
          :x=finishedSize
          :y=height/2
        ></rect>
        
        <rect
          class='bar4'
          :width=lossSize
          :height=barHeight
          :x=winSize
          :y=height/2.5
        ></rect> 

        <rect
          class='bar3'
          :width=winSize
          :height=barHeight
          :y=height/2.5
        ></rect>
        
        
      </g>
    </svg>
    </div>
    <div v-else> No game data </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { getAllGamesService, getMyUsernameService } from '../service';
import { Getter } from 'vuex-class';
import * as d3 from 'd3';

@Component
export default class Game extends Vue {
    private activeGames = [];
    private finishedGames = [];
    private wins = [];
    private losses = [];
    private username: string = '';

    private height = window.innerHeight * 0.8;
    private width = window.innerWidth * 0.8;

    private barHeight = 20;
    private activeSize = 0;
    private finishedSize = 0;
    private winSize = 0;
    private lossSize = 0;

    // @ts-ignore
    @Getter('getLogin') private user;

  private mounted() {
          if ( localStorage.getItem('token')) {
              getMyUsernameService(localStorage.getItem('token') || '')
              .then((res: any) => this.username = res.user)
              .then(() => {
                  getAllGamesService(this.username)
                  .then((res: any) => {
                    this.finishedGames = res.data.games.filter((el: any) => el.finished);
                    this.activeGames = res.data.games.filter((el: any) => !el.finished);
                    // @ts-ignore
                    this.wins = this.finishedGames.filter((el: any) => el.winner === this.username);
                    // @ts-ignore
                    this.losses = this.finishedGames.filter((el: any) => el.winner !== this.username);

                    this.activeSize = this.scale(this.activeGames.length, 0, this.finishedGames.length + this.activeGames.length, 0, this.width);
                    this.finishedSize = this.scale(this.finishedGames.length, 0, this.finishedGames.length + this.activeGames.length, 0, this.width);

                    this.winSize =  this.scale(this.wins.length, 0, this.wins.length + this.losses.length, 0, this.finishedSize);
                    this.lossSize = this.scale(this.losses.length, 0, this.wins.length + this.losses.length, 0, this.finishedSize);

                    this.draw();
                    } );
              });
          }

      }

  private scale(n: number, start1: number, stop1: number, start2: number, stop2: number ) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  }

  private draw() {
    const data = [{
      name: 'wins',
      value: this.wins.length,
      },
      {
      name: 'losses',
      value: this.losses.length,
      },
      {
      name: 'finished games',
      value: this.finishedGames.length,
      },
      {
      name: 'active games',
      value: this.activeGames.length,
      },
    ];

    const margins = {
      top: 15,
      right: 15,
      bottom: 15,
      left: 80,
    };

    const graphWidth = this.width - margins.left - margins.right;
    const graphHeight = this.height - margins.top - margins.bottom;

    const svg = d3.select(this.$el)
      .append('svg')
      .attr('height', this.height)
      .attr('width', this.width)
      .style('stroke', 'yellow')
      .style('stroke-width', '0.5px')
      .append('g')
      .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

    const x = d3.scaleLinear()
      .range([0, graphWidth])
      .domain([0, d3.max(data, (d: any) => d.value)]);

    const y = d3.scaleBand()
      .range([0, graphHeight])
      .padding(0.9)
      .domain(data.map( (d: any) => d.name));

    const yAxis = d3.axisLeft(y)
      .tickSize(0);

    const gy = svg.append('g')
      .call(yAxis);

    const bars = svg.selectAll('bar')
      .data(data)
      .enter()
      .append('g');

    bars.append('rect')
      .attr('class', 'bar')
      // @ts-ignore
      .attr('y', (d: {name: string, value: number}) => y(d.name) )
      .attr('height', 25)
      .attr('x', 3)
      .attr('width', (d: {name: string, value: number}) => x(d.value))
      .style('fill', '#45a29e')
      .style('stroke', 'none');

    bars.append('text')
    // @ts-ignore
      .attr('y', (d: {name: string, value: number}) => { if (y(d.name)) { return y(d.name) + y.length / 2 + 4; } else { return y(''); } })
      .attr('x', (d: {name: string, value: number}) => { if (x(d.value)) { return x(d.value) + 3; } else { return x(0); } })
      .attr('stroke', 'orange')
      .style('fill', 'orange')
      .text((d: {name: string, value: number}) => d.value);
  }
}
</script>
<style scoped>

form{
    padding-top: 20%;
}

input[type="text"], input[type="password"] {
    background: #1f2833;
    color: #66fcf1;
}

.field {
    width: 50%;
    margin: auto;
    margin-top: 10px;
}

.background {
  height: 90vh;
  padding: 10px;
  background-color: #0b0c10;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(53,960,483)'%3E%3Cstop offset='0' stop-color='%230b0c10'/%3E%3Cstop offset='1' stop-color='%230b0c10'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='623' height='519.2' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.01'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}


.bar {
    fill: #5f89ad;
}

.axis {
    font-size: 13px;
    stroke: yellow;
}

.axis path,
.axis line {
    fill: none;
    display: none;
}

.label {
    font-size: 13px;
    color: orange;
}

</style>
