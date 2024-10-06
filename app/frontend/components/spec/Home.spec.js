import { mount } from "@vue/test-utils";
import { beforeEach, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from 'pinia';
import { createI18n } from "vue-i18n";
import Home from '../Home.vue';

beforeEach(() => {  
  vi.mock('axios', () => {
    return {
      default: {
        post: vi.fn(),
        get: vi.fn().mockReturnThis(),
        delete: vi.fn(),
        put: vi.fn(),
        create: vi.fn().mockReturnThis(),
        interceptors: {
          request: {
            use: vi.fn(),
            eject: vi.fn(),
          },
          response: {
            use: vi.fn(),
            eject: vi.fn(),
          },
        },
        then: vi.fn(),
      },
    };
  });  

  vi.mock('updateMap', () => {});
  setActivePinia(createPinia())
});

it("testing Home component include LocationTable content", async () => {
  const mapDiv = document.createElement('div');
  mapDiv.setAttribute('id', 'map');
  document.body.appendChild(mapDiv);

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

  const wrapper = mount(Home, {
    global: {
      plugins: [i18n],
      mocks : {
        $t: (msg) => msg
      },
    },
    data() {
      return {
        filterHeritages: [
          {id: 1, short_description_en: 'test', latitude: 1, longitude: 1}, 
          {id: 2, short_description_en: 'test2', latitude: 2, longitude: 2}
        ]
      }
    },
  });
  expect(wrapper.findComponent({ name: 'LocationTable' })).toBeTruthy()
});
