import { mount } from "@vue/test-utils";
import ApiDocs from '../ApiDocs.vue';
import { createI18n } from "vue-i18n";
// import { expect, test } from "vitest";

it("testing ApiDocs component render Introduction component", async () => {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: {
      // "zh-TW": zh,
      // "en": en,
      // "fr": fr
    },
  });

  const wrapper = mount(ApiDocs, {
    global: {
      plugins: [i18n]
    },
    propsData: {
      locale_params: 'en',
    },
    data() {
      return {
        contentType: 'introduction',
      }
    }
  });
  expect(wrapper.findComponent({ name: 'Introduction' })).toBeTruthy()
});

it("testing ApiDocs component render Heritages component", async () => {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: {
      // "zh-TW": zh,
      // "en": en,
      // "fr": fr
    },
  });

  const wrapper = mount(ApiDocs, {
    global: {
      plugins: [i18n]
    },
    propsData: {
      locale_params: 'en',
    },
    data() {
      return {
        contentType: 'heritages',
      }
    }
  });
  expect(wrapper.findComponent({ name: 'Heritages' })).toBeTruthy()
});
