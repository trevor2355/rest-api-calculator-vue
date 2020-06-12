<template>
  <div>
    <h3>Manage Services</h3>
    <div class='button'>
    <b-button size="sm" @click="openAddUserModal" variant='primary'>
          Add Service +
    </b-button>
    </div>
    <div class='select'>
      <b-form-group
        label="Per page"
        label-size="sm"
        label-align-sm="right"
        label-cols-sm="6"
        label-cols-md="4"
        label-cols-lg="3"
        label-for="perPageSelect"
      >
        <b-form-select
          v-model="perPage"
          id="perPageSelect"
          :options="pageOptions"
        ></b-form-select>
      </b-form-group>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="fill"
    ></b-pagination>
    <TheServicesTable :services='services' :key='key' @get-all-services='getAllServices' :currentPage="currentPage" :perPage="perPage"></TheServicesTable>
    <TheAddServiceModal key='addServiceModal' :id='key' :entity='entity' @get-all-services='getAllServices'/>
  </div>
</template>
<script>
import TheServicesTable from '../../components/TheServicesTable.vue';
import TheAddServiceModal from '../../components/TheAddServiceModal.vue';
export default {
  data() {
    return {
      services: null,
      key: '1',
      entity: 'service',
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
    }
  },
  created() {
    this.getAllServices()
  },
  methods: {
    getAllServices() {
      fetch('http://localhost:3000/api/services')
        .then(response => {
          return response.json()
        })
        .then(services => {
          this.services = services;
          this.key = new Date().toString()
          this.totalRows = services.length;
        })
        .catch(err => {
          console.log(err)
        })
    },
    openAddUserModal() {
      this.$bvModal.show(this.key);
    },
  },
  components: {
    TheServicesTable,
    TheAddServiceModal,
  }
}
</script>
<style>
h1 {
  padding: 8px 0
}
h2 {
  margin: 16px
}
h3 {
  margin: 8px
}
.select {
  padding: 0 40%
}
.pagination {
  padding: 0 30%
}
.button {
  margin: 16px;
}
</style>