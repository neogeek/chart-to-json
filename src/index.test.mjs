import test from 'node:test';
import assert from 'node:assert';

import { readFile } from 'node:fs/promises';

import chartToJson from './index.js';

const chart = await readFile('./test/mocks/notes.chart', 'utf-8');
const chartJson = await readFile('./test/mocks/notes.json', 'utf-8');

test('chartToJson', () => {
  assert.deepStrictEqual(chartToJson(chart), JSON.parse(chartJson));
});
