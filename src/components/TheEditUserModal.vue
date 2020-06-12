<template>
  <b-modal :key='editModal.id.toString()' :id='editModal.id.toString()' :title="'Edit Record: ' + editModal.content.username" ok-variant='danger' ok-only ok-title='Cancel' ref='edit-modal' @hide='hide'>
    <div>
    <b-form>
      <b-form-group
        id="input-group-1"
        label="ID:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.id"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="UUID:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.uuid"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Username:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.username"
          type="text"
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
      id: this.editModal.id,
      username: this.editModal.content.username,
      roles: ['user', 'admin'],
      status: ['active', 'trial', 'inactive'],
      form: {
        id: this.editModal.content.id,
        uuid: this.editModal.content.uuid,
        username: this.editModal.content.username,
        role: this.editModal.content.role,
        status: this.editModal.content.status
      }
    }
  },
  props: [
    'editModal'
  ],
  methods: {
    hide() {
      this.$emit('reset-editModal')
    },
    onSubmit(evt) {
      evt.preventDefault()
      this.updateUser()
        .then(update => {
          update
          this.getAllUsers()
        })
        .catch(err => {
          err
          alert('There was an Error Updating Balance of User: ' + this.username)
        }) 
      this.$refs['edit-modal'].hide()
    },
    async updateUser() {
      let options = {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(this.form)
      }
      let response = await fetch(`http://localhost:3000/api/users/${this.editModal.id}`, options)
      let update = await response.json();
      return update;
    },
    getAllUsers() {
      this.$emit('get-all-users')
    }
  }
}
</script>