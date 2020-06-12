<template>
  <div>
    <h3>Manage Services</h3>
    <b-button size="sm" @click="openAddUserModal" variant='primary'>
          Add Service +
    </b-button>
    <TheServicesTable :services='services' :key='key' @get-all-services='getAllServices'></TheServicesTable>
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
      entity: 'service'
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
<style scoped>
h3{
  margin: 8px;
}
</style>