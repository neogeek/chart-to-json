# chart-to-json

## Install

```bash
$ npm install chart-to-json --save
```

## Usage

```javascript
import { readFile } from 'node:fs/promises';

import chartToJson from 'chart-to-json';

const chart = await readFile('notes.chart', 'utf-8');

const data = chartToJson(chart);

console.log(data);
```
