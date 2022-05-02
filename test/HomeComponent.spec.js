import { mount } from "@vue/test-utils";
import HomeComponent from "@/components/HomeComponent.vue";

describe("HomeComponent", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(HomeComponent);
    expect(wrapper.vm).toBeTruthy();
  });
});
