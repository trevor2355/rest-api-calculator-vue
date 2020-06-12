<template>
  <b-modal :key='id.toString()' :id='id.toString()' :title="'add ' + entity " ok-variant='danger' ok-only ok-title='Cancel' ref='edit-modal' @hide='hide'>
    <div>
    <b-form>

      <b-form-group
        id="input-group-1"
        label="Username:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Balance:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.balance"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

     <b-form-group id="input-group-4" label="Role:" label-for="input-4">
        <b-form-select
          id="input-4"
          v-model="form.role"
          :options="roles"
          required
        ></b-form-select>
      </b-form-group>

     <b-form-group id="input-group-5" label="Status:" label-for="input-5">
        <b-form-select
          id="input-5"
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
      status: ['active', 'trial', 'inactive'],
      form: {
        username: '',
        password: '',
        balance: '',
        role: 'user',
        status: 'active'
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