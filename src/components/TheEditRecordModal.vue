<template>
  <b-modal
    :id="infoModal.id.toString()"
    :title="'Edit Record: ' + infoModal.id"
    ok-variant="danger"
    ok-only
    ok-title="Cancel"
    ref="edit-modal"
    @hide="hide"
  >
    <div>
      <b-form>
        <b-form-group id="input-group-1" label="Id:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.id"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="UUID:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.uuid"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Service Id:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.service_id"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="User Id:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.user_id"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Cost:" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="form.cost"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="User Balance:"
          label-for="input-6"
        >
          <b-form-input
            id="input-6"
            v-model="form.user_balance"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Service Response:"
          label-for="input-7"
        >
          <b-form-input
            id="input-7"
            v-model="form.service_response"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-datepicker
          id="example-datepicker"
          v-model="form.date"
          class="mb-2"
        ></b-form-datepicker>

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
      form: {
        id: this.infoModal.content.id,
        uuid: this.infoModal.content.uuid,
        service_id: this.infoModal.content.service_id,
        user_id: this.infoModal.content.user_id,
        cost: this.infoModal.content.cost,
        user_balance: this.infoModal.content.user_balance,
        service_response: this.infoModal.content.service_response,
        date: this.infoModal.content.date
      }
    };
  },
  props: ["infoModal"],
  methods: {
    hide() {
      this.$emit("reset-infoModal");
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.updateRecord()
        .then(update => {
          update;
          this.getAllRecords();
          alert("Successfully Updated Record: " + this.form.id);
        })
        .catch(err => {
          err;
          alert("There was an Error Updating Record: " + this.form.id);
        });
      this.$refs["edit-modal"].hide();
    },
    async updateRecord() {
      let options = {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("JSWT")),
          "content-type": "application/json"
        },
        body: JSON.stringify(this.form)
      };
      let response = await fetch(
        `http://localhost:3000/api/records/${this.form.id}`,
        options
      );
      let update = await response.json();
      return update;
    },
    getAllRecords() {
      this.$emit("get-all-records");
    }
  }
};
</script>
