<template>
  <div class="app">
    <div class="title_">
      <h1><svg class="logo">
        <use xlink:href="#home" />
      </svg> Serre connectée</h1>
    </div>

    <div v-if="role === 'admin'">
      <button class="button_admin" @click="confirmSendDownlink">Send test message</button>
    </div>

    <div v-for="mesure in currentMesure" :key="mesure._id" class="widget">
      <li>
        <h2>Humidité dans le sol</h2>
        <div class="val">{{mesure.humiditesol}}<small>%</small></div>
      </li>
      <li>
        <h2>Humidité dans l'air</h2>
        <div class="val">{{mesure.humiditeaire}}<small>%</small></div>
      </li>
      <li>
        <h2>Température de l'air</h2>
        <div class="val">{{mesure.temperaturaire}}<small><sup>°</sup>c</small></div>
      </li>
      <li>
        <h2>Luminosité</h2>
        <div class="val">{{mesure.luminosite}}</div>
      </li>
    </div>
  </div>
  
  <button class="reload" onclick="location.reload()">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 92.33 92.33" style="enable-background:new 0 0 92.33 92.33;" xml:space="preserve">
    <path d="M70.598,16.753c-1.722-1.24-4.113-0.852-5.349,0.866c-1.242,1.716-0.853,4.113,0.865,5.35   c13.613,9.818,18.021,27.857,10.482,42.89c-4.082,8.138-11.088,14.202-19.726,17.066c-8.636,2.871-17.877,2.2-26.013-1.879   c-8.134-4.083-14.197-11.088-17.066-19.722c-2.866-8.642-2.197-17.877,1.886-26.014c4.958-9.89,14.458-16.779,25.413-18.429   c0.074-0.008,0.137-0.036,0.211-0.053l0.157,7.571c0.021,0.839,0.542,1.585,1.321,1.889c0.782,0.305,1.672,0.11,2.25-0.496   l10.904-11.379c0.794-0.828,0.764-2.142-0.062-2.933L44.492,0.577c-0.606-0.582-1.499-0.739-2.267-0.399   c-0.251,0.108-0.476,0.269-0.662,0.462c-0.372,0.389-0.585,0.919-0.579,1.479l0.151,7.212c-0.385-0.063-0.78-0.087-1.188-0.027   c-13.418,2.021-25.052,10.46-31.125,22.571C-1.499,52.451,6.85,77.584,27.424,87.901c5.989,3.005,12.362,4.429,18.646,4.429   c15.306,0,30.065-8.439,37.382-23.028C92.688,50.884,87.284,28.782,70.598,16.753z" fill="#404853"/></svg>  reload
  </button>
    
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="display: none;">
    <symbol id="home" x="0px" y="0px" viewBox="0 0 298.179 298.179" style="enable-background:new 0 0 298.179 298.179;" xml:space="preserve" width="25px" height="25px">
      <path d="M293.751,150.478L149.965,0.977L4.534,150.41c-6.163,6.333-6.026,16.462,0.307,22.625c3.11,3.027,7.136,4.534,11.158,4.534   c4.167,0,8.165-1.618,11.3-4.841l5.477-5.799v130.273h232V166.861l5.744,5.799c6.127,6.371,16.339,6.567,22.706,0.441   C299.595,166.975,299.876,156.846,293.751,150.478z M148.789,246.024l-17.635-17.688c4.881-4.843,11.257-7.266,17.634-7.266   c6.399,0,12.797,2.438,17.682,7.314L148.789,246.024z M186.758,208.135c-10.142-10.143-23.626-15.729-37.969-15.729   c-14.344,0-27.827,5.586-37.969,15.728l-11.314-11.313c13.163-13.165,30.666-20.415,49.283-20.415   c18.616,0,36.119,7.25,49.283,20.415L186.758,208.135z M217.762,177.128c-18.422-18.424-42.917-28.57-68.973-28.57   c-26.057,0-50.552,10.146-68.976,28.571l-11.315-11.314c21.446-21.446,49.96-33.257,80.29-33.257   c30.329,0,58.843,11.811,80.287,33.258L217.762,177.128z" fill="#FFFFFF"/>
    </symbol>
  </svg>

</template>

<script>
import axios from 'axios';
import { fetchLastMesure } from '../api';
import {userRole, SendDownlink} from "/src/api.js";
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      mesures: [],
      role: '',
    };
  },
  computed: {
    currentMesure() {
      return this.mesures;
    },
  },
  async mounted() {
    await this.fetchLastMesure();
    this.role = await userRole();
  },
  methods: {
    async fetchLastMesure() {
      const { data } = await axios.get('https://test-pi2.onrender.com/mesures/last', {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }});
        console.log(data);
      this.mesures = data;
    },
    async confirmSendDownlink() {
      if(confirm("Are you sure you want to send 'test' to the MKRWAN ?")) {
        await this.SendDownlink();
      }
    },
    async SendDownlink() {
      let response = await SendDownlink("test");
      if(response.success) {
        alert('Message envoyé !');
      } else {
        console.log(response.success);
        alert('An error occurred, please try again later');
      }
    },
  },
};
</script>