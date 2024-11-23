import { PerformanceObserver, performance } from 'perf_hooks';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { SimpleThemedButtonApp } from './SimpleThemedButton';
import { PabloButtonApp } from './PabloButton';
import { DirectButtonApp } from './DirectButton';

const RUNS = parseInt(process.argv[3], 10) || 1000;

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0]);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

function benchmark(Component) {
  performance.mark('START');
  for (let i = 0; i < RUNS; i += 1) {
    try {
      renderToString(<Component />);
    } catch (error) {
      // handle error
      console.error(error);
    }
  }
  performance.mark('END');
  performance.measure('A to B', 'START', 'END');
}

const componentList = {
  pablo: PabloButtonApp,
  themed: SimpleThemedButtonApp,
  direct: DirectButtonApp,
};

benchmark(componentList[process.argv[2]]);
