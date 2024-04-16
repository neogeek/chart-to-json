# chart-to-json

[![Test](https://github.com/neogeek/chart-to-json/actions/workflows/test.workflow.yml/badge.svg)](https://github.com/neogeek/chart-to-json/actions/workflows/test.workflow.yml)
[![NPM version](https://img.shields.io/npm/v/chart-to-json)](https://www.npmjs.org/package/chart-to-json)

## Install

```bash
$ npm install chart-to-json --save
```

## Usage

### Node.js

```javascript
import { readFile } from 'node:fs/promises';

import chartToJson from 'chart-to-json';

const chart = await readFile('notes.chart', 'utf-8');

const data = chartToJson(chart);

console.log(data);
```

### CLI

```bash
$ npx chart-to-json ./notes.chart > notes.json
```
