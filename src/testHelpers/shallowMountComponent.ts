import { shallowMount } from '@vue/test-utils';
import type { Component } from 'vue';

type ShallowMountParams = Parameters<typeof shallowMount>;

export default function shallowMountComponent<T extends Component, U extends ShallowMountParams[1]>(
  component: T,
  options?: U
) {
  return shallowMount(component as any, options);
}
