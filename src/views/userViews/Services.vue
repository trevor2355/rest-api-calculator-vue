<template>
  <div>
    <h1>Services</h1>
    <div class='line'></div>
    <h5>User Balance: {{ userBalance }}</h5>
    <div>
      <div>
        <h3>addition</h3>
        <p>Cost: {{ 'addition' | findCostOfService(services) }}</p>
        <label for="val1"></label>
        <input v-model="additionVal1" type="number" name="additionVal1" class="input">
        <span>+</span>
        <label for="val2"></label>
        <input v-model="additionVal2" type="number" name="additionVal2" class="input">
        <b-button @click="add" :disabled='additionSubtractionDisabled'>Request Service</b-button>
        <span v-if='additionResult || additionResult === 0'>= {{ additionResult }}</span>
      </div>
      <div>
        <h3>subtraction</h3>
        <p>Cost: {{ 'subtraction' | findCostOfService(services) }}</p>
        <label for="val1"></label>
        <input v-model="subtractionVal1" type="number" name="subtractionVal1" class="input">
        <span>-</span>
        <label for="val2"></label>
        <input v-model="subtractionVal2" type="number" name="subtractionVal2" class="input">
        <b-button @click="subtract" :disabled='additionSubtractionDisabled'>Request Service</b-button>
        <span v-if='subtractionResult || subtractionResult === 0'>= {{ subtractionResult }}</span>       
      </div>
      <div>
        <h3>multiplication</h3>
        <p>Cost: {{ 'multiplication' | findCostOfService(services) }}</p>
        <label for="val1"></label>
        <input v-model="multiplicationVal1" type="number" name="multiplicationVal1" class="input">
        <span>x</span>
        <label for="val2"></label>
        <input v-model="multiplicationVal2" type="number" name="multiplicationVal2" class="input">
        <b-button @click="multiply" :disabled='multiplicationDivisionDisabled'>Request Service</b-button>
        <span v-if='multiplicationResult || multiplicationResult === 0'>= {{ multiplicationResult }}</span>
      </div>
      <div>
        <h3>division</h3>
        <p>Cost: {{ 'division' | findCostOfService(services) }}</p>
        <label for="val1"></label>
        <input v-model="divisionVal1" type="number" name="divisionVal1" class="input">
        <span>/</span>
        <label for="val2"></label>
        <input v-model="divisionVal2" type="number" name="divisionVal2" class="input">
        <b-button @click="divide" :disabled='multiplicationDivisionDisabled'>Request Service</b-button>
        <span v-if='divisionResult || divisionResult === 0'>= {{ divisionResult }}</span>
      </div>
      <div>
        <h3>square root</h3>
        <p>Cost: {{ 'square-root' | findCostOfService(services) }}</p>
        <label for="val1"></label>
        <input v-model="squareRootVal" type="number" name="squareRootVal" class="input">
        <b-button @click="squareRoot" :disabled='squareRootDisabled'>Request Service</b-button>
        <span v-if='squareRootResult || squareRootResult === 0'>{{ squareRootResult }}</span>
      </div>
      <div>
        <h3>Random String</h3>
        <p>Cost: {{ 'random string generator' | findCostOfService(services) }}</p>
        <label for="val1">Length (1-32)</label>
        <input v-model="generateRandomStringVal" type="number" name="generateRandomStringVal" class="input">
        <b-button @click="generateRandomString" :disabled='randomStringGeneratorDisabled'>Request Service</b-button>
        <span v-if='randomStringGeneratorResult'>{{ randomStringGeneratorResult }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store.js';
export default {
  data() {
    return  {
      userBalance: store.user.balance,
      services: null,
      additionVal1: null,
      additionVal2: null,
      subtractionVal1: null,
      subtractionVal2: null,
      multiplicationVal1: null,
      multiplicationVal2: null,
      divisionVal1: null,
      divisionVal2: null,
      squareRootVal: null,
      generateRandomStringVal: null,
      additionResult: null,
      subtractionResult: null,
      multiplicationResult: null,
      divisionResult: null,
      squareRootResult: null,
      randomStringGeneratorResult: null
    }
  },
  computed: {
    additionSubtractionDisabled: function() {
      return this.userBalance < 2
    },
    multiplicationDivisionDisabled: function() {
      return this.userBalance < 4
    },
    squareRootDisabled: function() {
      return this.userBalance < 5
    },
    randomStringGeneratorDisabled: function() {
      return this.userBalance < 10
    }      
  },
  created() {
    this.getServices()
  },
  methods: {
    getServices() {
      fetch('http://localhost:3000/api/services')
        .then(response => {
          return response.json()
        })
        .then(services => {
          this.services = services;
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateUser(updateObject) {
      let options = {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updateObject)
      }
      let response = await fetch(`http://localhost:3000/api/users/${store.user.id}`, options)
      let data = await response.json()
      return data;
    },
    async getUser() {
      let response = await fetch(`http://localhost:3000/api/users/${store.user.id}`)
      let user = await response.json();
      return user[0];
    },
    async postRecord(record) {
      let options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(record)
      }
      let response = await fetch(`http://localhost:3000/api/records`, options)
      let insertedRecord = await response.json()
      return insertedRecord;
    },
    add() {
      this.additionResult = parseFloat(this.additionVal1) + parseFloat(this.additionVal2);
      this.handleServiceRequest('addition', this.additionResult);
    },
    subtract() {
      this.subtractionResult = parseFloat(this.subtractionVal1) - parseFloat(this.subtractionVal2);
      this.handleServiceRequest('subtraction', this.subtractionResult);
    },
    multiply() {
      this.multiplicationResult = parseFloat(this.multiplicationVal1) * parseFloat(this.multiplicationVal2);
      this.handleServiceRequest('multiplication', this.multiplicationResult);
    },
    divide() {
      this.divisionResult = parseFloat(this.divisionVal1) / parseFloat(this.divisionVal2);
      this.handleServiceRequest('division', this.divisionResult);
    },
    squareRoot() {
      this.squareRootResult = Math.sqrt(parseFloat(this.squareRootVal));
      this.handleServiceRequest('square-root', this.squareRootResult);
    },
    generateRandomString() {
      let length = this.generateRandomStringVal;
      let options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ length })
      }
      fetch('http://localhost:3000/api/services/randomstringgenerator', options)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Length not within valid range')
          }
          return response.json()
        })
        .then(string => {
          this.randomStringGeneratorResult = string.string
          this.handleServiceRequest('random string generator', this.randomStringGeneratorResult);
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleServiceRequest(serviceType, serviceResult) {
      let serviceInfo = this.findCostAndId(serviceType)
      let newBalance = store.user.balance - serviceInfo.cost;
      let record = {
        service_id: serviceInfo.id,
        cost: serviceInfo.cost,
        user_balance: newBalance,
        service_response: serviceResult,
        date: new Date(),
        user_id: store.user.id
      }
      this.updateUser({ balance: newBalance })
        .then(response => {
          response
          this.userBalance = newBalance
          return this.getUser()
        })
        .then(user => {
          store.user = user;
          localStorage.setItem('user', JSON.stringify(user))
          return this.postRecord(record)
        })
        .then(record => {
          return record
        })
        .catch(err => {
          console.log(err)
        })
    },
    findCostAndId(serviceName) {
      if (this.services) {
      let matchedService = this.services.filter(service => service.type === serviceName);
      return {
        cost: matchedService[0].cost,
        id: matchedService[0].id
      }
      } else {
        return 'cost not available'
      }
    }
  },
  filters: {
    findCostOfService(serviceName, services) {
      if (services) {
      let matchedService = services.filter(service => service.type === serviceName);
      return matchedService[0].cost
      } else {
        return 'cost not available'
      }
    }
  }
}
</script>
<style scoped>
span {
  padding: 8px;
  font-size: 20px;
  font-weight: 800;
}
input {
  height: 32px;
}
.line {
  border-top: 1px solid rgb(180, 180, 180);
  margin-bottom: 16px;
  margin-right: 16px;
  margin-left: 16px;
}
.btn {
  margin: 8px;
}
</style>