'use client';
import axe from "axe-core";
import { useState, useEffect } from "react";

type AccessibilityReport = {
    id: string;
    description: string;
    impact: string;
    nodes: Array<{
        html: string;
        failureSummary: string;}>
}

type AccessibilityCheckerProps = {
    onResults?: (results: AccessibilityReport[]) => void;
    showResults?: boolean;
};

const AccessibilityChecker = ({onResults, showResults = true}: AccessibilityCheckerProps) => {

const [violations, setViolations] = useState<AccessibilityReport[]>([]);
const [showPopup, setShowPopup] = useState(false);

useEffect(() => {
const runAccessibilityCheck = async () => {
    console.log("Running accessibility check...");
    const allViolations = await axe.run(document);
    console.log("Accessibility check completed", allViolations);
    const {violations} = await axe.run(document, {
        runOnly: {
            type: "rule",
            values: ["image-alt", "object-alt", "svg-img-alt"],
        }
        });

    const filteredViolations = violations.filter((violation) => [
        "image-alt",
        "object-alt",
        "svg-img-alt"
    ].includes(violation.id));

    setViolations(allViolations.violations);

    if(onResults) {
        onResults(allViolations.violations);
    }   
}

    setTimeout(runAccessibilityCheck, 2000);
}, [onResults]);

if(!showResults) return null;
return (
    <>
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

      {showPopup && (
        
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
        <h2>Accessibility Checker</h2>
        {violations.length > 0 ? (
            <ul>
                {violations.map((violation) => (
                    <li key={violation.id}>
                        <strong>{violation.impact}</strong> - {violation.description}
                        <ul>
                            {violation.nodes.map((node, index) => (
                                <li key={index}>
                                    
                                    <p>⚠️{node.failureSummary}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        ) : (
            <p>✅ All accessibility checks passed!</p>
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

    
    </>
    
);
}


export default AccessibilityChecker;