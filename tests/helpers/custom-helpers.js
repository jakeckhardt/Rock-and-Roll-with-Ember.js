import { click, fillIn } from '@ember/test-helpers';

export async function createBand(name) {
  await click('[data-test-band-label]');
  await fillIn('[data-test-band-input]', name);
  return click('[data-test-band-button]');
}