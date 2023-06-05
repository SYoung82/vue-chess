import { mount } from '@vue/test-utils';
import type { Component } from 'vue';

type ShallowMountParams = Parameters<typeof mount>;

export default function mountComponent<T extends Component, U extends ShallowMountParams[1]>(
  component: T,
  options?: U
) {
  return mount(component as any, options);
}
