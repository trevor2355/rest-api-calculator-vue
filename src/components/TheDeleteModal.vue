<template>
  <b-modal id='deleteModal' :title="'Delete ' + entity + ': ' + username" ok-variant='danger' ok-title='Delete' @ok='handleDelete'>
  
  </b-modal>
</template>
<script>

export default {
  data() {
    return {
    }
  },
  props: [
    'recordId',
    'username',
    'entity'
  ],
  methods: {
    handleDelete() {
      this.deleteRecord()
        .then(update => {
          update
          this.getAllRecords()
          alert(`Successfully Deleted ${this.entity}: ${this.username}`) 
        })
        .catch(err => {
          console.log(err)
          alert(`There was an error Deleting ${this.entity}: ${this.recordId}`)
        }) 
    },
    async deleteRecord() {
      let options = {
        method: 'DELETE',
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('JSWT')),
          'Content-Type': 'application/json'
        }
      }
      let response = await fetch(`http://localhost:3000/api/${this.entity}s/${this.recordId}`, options)
      let update = await response.json();
      return update;
    },
    getAllRecords() {
      this.$emit(`get-all-${this.entity}s`)
    }
  }
}
</script>