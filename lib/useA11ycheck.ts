import { useEffect } from 'react';
import axe from 'axe-core';

export const useA11yCheck = (setResults: (results: axe.AxeResults) => void) => {
  useEffect(() => {
    const runAxe = async () => {
      const results = await axe.run(document);
      setResults(results);
    };

    runAxe();
  }, [setResults]);
};
