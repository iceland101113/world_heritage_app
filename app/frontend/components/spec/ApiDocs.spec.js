import { mount } from "@vue/test-utils";
import ApiDocs from '../ApiDocs.vue';
// import { expect, test } from "vitest";

it("testing ApiDocs component render Introduction component", async () => {
  const wrapper = mount(ApiDocs, {
    data() {
      return {
        contentType: 'introduction',
      }
    }
  });
  console.log(wrapper.vm.contentType)
  expect(wrapper.html()).toContain('Introduction')
  // expect(wrapper.find('div')).toContain('Introduction')
});

it("testing ApiDocs component render Heritages component", async () => {
  const wrapper = mount(ApiDocs, {
    data() {
      return {
        contentType: 'heritages',
      }
    }
  });
  console.log(wrapper.vm.contentType)
  expect(wrapper.html()).toContain('Heritages')
  // expect(wrapper.find('div')).toContain('Introduction')
});
