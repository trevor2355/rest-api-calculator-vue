<template>
  <b-modal :key='id.toString()' :id='id.toString()' :title="'add ' + entity " ok-variant='danger' ok-only ok-title='Cancel' ref='edit-modal' @hide='hide'>
    <div>
    <b-form>

      <b-form-group
        id="input-group-1"
        label="Type:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.type"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Cost:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.cost"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

     <b-form-group id="input-group-3" label="Status:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.status"
          :options="status"
          required
        ></b-form-select>
      </b-form-group>

      <b-button @click='onSubmit' type="submit" variant="success">Submit</b-button>
    </b-form>
    </div>
  </b-modal>
</template>
<script>

export default {
  data() {
    return {
      roles: ['user', 'admin'],
      status: ['active', 'beta', 'inactive'],
      form: {
        type: '',
        cost: 1,
        status: 'beta'
      }
    }
  },
  props: [
    'id',
    'entity'
  ],
  methods: {
    hide() {
      this.$emit('reset-addUserModal')
    },
    onSubmit(evt) {
      evt.preventDefault()
      this.add()
        .then(record => {
          record
          this.getAll()
        })
        .catch(err => {
          err
          alert(`There was an error creating ${this.entity}`)
        }) 
      this.$refs['edit-modal'].hide()
    },
    async add() {
      let options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(this.form)
      }
      let response = await fetch(`http://localhost:3000/api/${this.entity}s`, options)
      let update = await response.json();
      return update;
    },
    getAll() {
      this.$emit(`get-all-${this.entity}s`)
    }
  }
}
</script>