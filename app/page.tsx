'use client';

import { useEffect, useState } from 'react';
import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import { useA11yCheck } from '@/lib/useA11ycheck';
import type { AxeResults } from 'axe-core';

type StoryData = {
  story: {
    content: any;
    [key: string]: any;
  };
  [key: string]: any;
};

export default function HomePage() {
  const [data, setData] = useState<StoryData | null>(null);
  const [a11yResults, setA11yResults] = useState<AxeResults | null>(null);

  useEffect(() => {
    async function loadData() {
      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get('cdn/stories/home', {
        version: 'draft',
      });
      setData(data);
    }

    loadData();
  }, []);

  useA11yCheck(setA11yResults);

  return (
    <div className="page">
      {data && <StoryblokStory story={data.story} />}

      {a11yResults && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            border: '2px solid',
            borderColor: a11yResults.violations.length > 0 ? 'red' : 'green',
            color: a11yResults.violations.length > 0 ? 'red' : 'green',
          }}
        >
          {a11yResults.violations.length === 0 ? (
  '✅ Accessibility checks passed'
) : (
  <>
    <p>❌ Accessibility violations: {a11yResults.violations.length}</p>
    <ul>
      {a11yResults.violations.map((violation, index) => (
        <li key={index} style={{ marginBottom: '1rem' }}>
          <strong>{violation.id}:</strong> {violation.description}
          <ul>
            {violation.nodes.map((node, i) => (
              <li key={i} style={{ marginTop: '0.5rem' }}>
                <div>
                  <strong>Target:</strong>{' '}
                  <code>{node.target.join(', ')}</code>
                </div>
                {node.failureSummary && (
                  <div> {node.failureSummary}</div>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </>
)}
        </div>
      )}
    </div>
  );
}
export async function fetchData() {
	const storyblokApi = getStoryblokApi();
	return await storyblokApi.get(`cdn/stories/home`, { version: 'draft' });
}
