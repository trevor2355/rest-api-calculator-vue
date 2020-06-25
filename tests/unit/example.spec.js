import { shallowMount } from "@vue/test-utils";
import Services from "@/views/userViews/Services.vue";
require("jest-fetch-mock").enableMocks();

describe("Services.vue", () => {
  it("add function works properly", () => {
    let data = {
      addVal1: 5,
      addVal2: 6,
      additionResult: null
    };
    const wrapper = shallowMount(Services, {
      propsData: data
    });
    wrapper.vm.add();
    expect(wrapper.vm.additionResult).toBe(11);
  });
});
