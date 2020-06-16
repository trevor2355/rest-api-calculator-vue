<template>
  <b-modal
    :key="editModal.id.toString()"
    :id="editModal.id.toString()"
    :title="'Edit Record: ' + editModal.content.username"
    ok-variant="danger"
    ok-only
    ok-title="Cancel"
    ref="edit-modal"
    @hide="hide"
  >
    <div>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="User Balance:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.balance"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-button @click="onSubmit" type="submit" variant="success"
          >Submit</b-button
        >
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
      form: {
        balance: this.editModal.content.balance
      }
    };
  },
  props: ["editModal"],
  methods: {
    hide() {
      this.$emit("reset-editModal");
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.updateUser()
        .then(update => {
          update;
          this.getAllUsers();
        })
        .catch(err => {
          err;
          alert(
            "There was an Error Updating Balance of User: " + this.username
          );
        });
      this.$refs["edit-modal"].hide();
    },
    async updateUser() {
      let options = {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("JSWT")),
          "content-type": "application/json"
        },
        body: JSON.stringify(this.form)
      };
      let response = await fetch(
        `${this.$hostname}/api/users/${this.editModal.id}`,
        options
      );
      let update = await response.json();
      return update;
    },
    getAllUsers() {
      this.$emit("get-all-users");
    }
  }
};
</script>
