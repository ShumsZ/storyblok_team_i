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
  const [showPopup, setShowPopup] = useState(false);

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

      <button
        onClick={() => setShowPopup(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999,
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Show Accessibility Report
      </button>

      {showPopup && a11yResults && (
        <div
          onClick={() => setShowPopup(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 10000,
            overflowY: 'auto',
            padding: '2rem',
            color: 'white',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#222',
              borderRadius: '8px',
              maxWidth: '600px',
              margin: '0 auto',
              padding: '1rem 2rem',
              color: 'white',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            }}
          >
            <h2>Accessibility Violations</h2>
            {a11yResults.violations.length === 0 ? (
              <p>✅ All accessibility checks passed!</p>
            ) : (
              <ul>
                {a11yResults.violations.map((violation, index) => (
                  <li key={index} style={{ marginBottom: '1rem' }}>
                    <strong>{violation.id}:</strong> {violation.description}
                    <ul>
                      {violation.nodes.map((node, i) => (
                        <li key={i} style={{ marginTop: '0.5rem' }}>
                          <div>
                            🔍 <strong>Target:</strong>{' '}
                            <code>{node.target.join(', ')}</code>
                          </div>
                          {node.failureSummary && (
                            <div>⚠️ {node.failureSummary}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowPopup(false)}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export async function fetchData() {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/home`, { version: 'draft' });
}
