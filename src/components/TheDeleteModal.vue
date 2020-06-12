<template>
  <b-modal id='deleteModal' :title="'Delete Record: ' + recordId" ok-variant='danger' ok-title='Delete' @ok='handleDelete'>
  
  </b-modal>
</template>
<script>

export default {
  data() {
    return {
    }
  },
  props: [
    'recordId'
  ],
  methods: {
    handleDelete() {
      this.deleteRecord()
        .then(update => {
          update
          this.getAllRecords()
          alert('Successfully Deleted Record: ' + this.recordId) 
        })
        .catch(err => {
          console.log(err)
          alert('There was an error Deleting Record: ' + this.recordId)
        }) 
    },
    async deleteRecord() {
      let options = {
        method: 'DELETE'
      }
      let response = await fetch(`http://localhost:3000/api/records/${this.recordId}`, options)
      let update = await response.json();
      return update;
    },
    getAllRecords() {
      this.$emit('get-all-records')
    }
  }
}
</script>