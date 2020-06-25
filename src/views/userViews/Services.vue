<template>
  <div>
    <h1>Services</h1>
    <div class="line"></div>
    <h5>User Balance: {{ userBalance }}</h5>
    <div>
      <div>
        <h3>addition</h3>
        <p>Cost: {{ "addition" | findCostOfService(services) }}</p>
        <label for="val1"></label>
        <input
          v-model="additionVal1"
          type="number"
          name="additionVal1"
          class="input"
        />
        <span>+</span>
        <label for="val2"></label>
        <input
          v-model="additionVal2"
          type="number"
          name="additionVal2"
          class="input"
        />
        <b-button
          id="1"
          name="addition"
          @click="requestService"
          :disabled="additionDisabled"
          >Request Service</b-button
        >
        <span v-if="additionResult || additionResult === 0"
          >= {{ additionResult }}</span
        >
      </div>
      <div>
        <h3>subtraction</h3>
        <p>Cost: {{ "subtraction" | findCostOfService(services) }}</p>
        <label for="val1"></label>
        <input
          v-model="subtractionVal1"
          type="number"
          name="subtractionVal1"
          class="input"
        />
        <span>-</span>
        <label for="val2"></label>
        <input
          v-model="subtractionVal2"
          type="number"
          name="subtractionVal2"
          class="input"
        />
        <b-button
          id="2"
          name="subtraction"
          @click="requestService"
          :disabled="subtractionDisabled"
          >Request Service</b-button
        >
        <span v-if="subtractionResult || subtractionResult === 0"
          >= {{ subtractionResult }}</span
        >
      </div>
      <div>
        <h3>multiplication</h3>
        <p>Cost: {{ "multiplication" | findCostOfService(services) }}</p>
        <label for="val1"></label>
        <input
          v-model="multiplicationVal1"
          type="number"
          name="multiplicationVal1"
          class="input"
        />
        <span>x</span>
        <label for="val2"></label>
        <input
          v-model="multiplicationVal2"
          type="number"
          name="multiplicationVal2"
          class="input"
        />
        <b-button
          id="3"
          name="multiplication"
          @click="requestService"
          :disabled="multiplicationDisabled"
          >Request Service</b-button
        >
        <span v-if="multiplicationResult || multiplicationResult === 0"
          >= {{ multiplicationResult }}</span
        >
      </div>
      <div>
        <h3>division</h3>
        <p>Cost: {{ "division" | findCostOfService(services) }}</p>
        <label for="val1"></label>
        <input
          v-model="divisionVal1"
          type="number"
          name="divisionVal1"
          class="input"
        />
        <span>/</span>
        <label for="val2"></label>
        <input
          v-model="divisionVal2"
          type="number"
          name="divisionVal2"
          class="input"
        />
        <b-button
          id="4"
          name="division"
          @click="requestService"
          :disabled="divisionDisabled"
          >Request Service</b-button
        >
        <span v-if="divisionResult || divisionResult === 0"
          >= {{ divisionResult }}</span
        >
      </div>
      <div>
        <h3>square root</h3>
        <p>Cost: {{ "square_root" | findCostOfService(services) }}</p>
        <label for="val1"></label>
        <input
          v-model="squareRootVal"
          type="number"
          name="squareRootVal"
          class="input"
        />
        <b-button
          id="5"
          name="squareRoot"
          @click="requestService"
          :disabled="squareRootDisabled"
          >Request Service</b-button
        >
        <span v-if="squareRootResult || squareRootResult === 0"
          >= {{ squareRootResult }}</span
        >
      </div>
      <div>
        <h3>Random String</h3>
        <p>Cost: {{ "random_string" | findCostOfService(services) }}</p>
        <label for="val1">Length (1-32)</label>
        <input
          v-model="randomStringGeneratorVal"
          type="number"
          name="randomStringGeneratorVal"
          class="input"
        />
        <b-button
          id="6"
          name="randomStringGenerator"
          @click="requestService"
          :disabled="randomStringGeneratorDisabled"
          >Request Service</b-button
        >
        <span v-if="randomStringGeneratorResult"
          >= {{ randomStringGeneratorResult }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store.js";
export default {
  data() {
    return {
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
      randomStringGeneratorVal: null,
      additionResult: null,
      subtractionResult: null,
      multiplicationResult: null,
      divisionResult: null,
      squareRootResult: null,
      randomStringGeneratorResult: null
    };
  },
  computed: {
    additionDisabled: function() {
      if (this.services) {
        let service = this.services.find(
          element => element.type === "addition"
        );
        return this.userBalance < service.cost;
      } else {
        return true;
      }
    },
    subtractionDisabled: function() {
      if (this.services) {
        let service = this.services.find(
          element => element.type === "subtraction"
        );
        return this.userBalance < service.cost;
      } else {
        return true;
      }
    },
    multiplicationDisabled: function() {
      if (this.services) {
        let service = this.services.find(
          element => element.type === "multiplication"
        );
        return this.userBalance < service.cost;
      } else {
        return true;
      }
    },
    divisionDisabled: function() {
      if (this.services) {
        let service = this.services.find(
          element => element.type === "division"
        );
        return this.userBalance < service.cost;
      } else {
        return true;
      }
    },
    squareRootDisabled: function() {
      if (this.services) {
        let service = this.services.find(
          element => element.type === "square_root"
        );
        return this.userBalance < service.cost;
      } else {
        return true;
      }
    },
    randomStringGeneratorDisabled: function() {
      if (this.services) {
        let service = this.services.find(
          element => element.type === "random_string"
        );
        return this.userBalance < service.cost;
      } else {
        return true;
      }
    }
  },
  created() {
    this.getServices();
  },
  methods: {
    getServices() {
      let options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("JSWT"))
        }
      };
      fetch(`${this.$hostname}/api/services`, options)
        .then(response => {
          return response.json();
        })
        .then(services => {
          this.services = services.rows;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getUser() {
      let options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("JSWT"))
        }
      };
      let response = await fetch(
        `${this.$hostname}/api/users/${store.user.id}`,
        options
      );
      let user = await response.json();
      return user;
    },
    requestService(event) {
      let serviceId = event.target.id;
      let serviceType = event.target.name;
      let requestedServiceVals;
      if (serviceId <= 4) {
        requestedServiceVals = {
          [serviceType + "Val1"]: this[serviceType + "Val1"],
          [serviceType + "Val2"]: this[serviceType + "Val2"]
        };
      } else {
        requestedServiceVals = {
          [serviceType + "Val"]: this[serviceType + "Val"]
        };
      }
      let options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("JSWT"))
        },
        body: JSON.stringify(requestedServiceVals)
      };
      fetch(`${this.$hostname}/api/services/request/${serviceId}`, options)
        .then(response => {
          return response.json();
        })
        .then(result => {
          this[serviceType + "Result"] = result.result;
          return this.getUser();
        })
        .then(user => {
          this.userBalance = user.balance;
          store.user = user;
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
    findCostOfService(serviceName, services) {
      if (services) {
        let matchedService = services.filter(
          service => service.type === serviceName
        );
        return matchedService[0].cost;
      } else {
        return "cost not available";
      }
    }
  }
};
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
