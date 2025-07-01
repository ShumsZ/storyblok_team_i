'use client';
import axe from "axe-core";
import { useState, useEffect } from "react";

type AccessibilityReport = {
    id: string;
    description: string;
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

useEffect(() => {
const runAccessibilityCheck = async () => {
    console.log("Running accessibility check...");
    const testViolations = await axe.run(document);
    console.log("Accessibility check completed", testViolations);
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

    setViolations(testViolations.violations);

    if(onResults) {
        onResults(testViolations.violations);
    }   
}

    setTimeout(runAccessibilityCheck, 3000);
}, [onResults]);

if(!showResults) return null;
return (
    <div className="accessibility-checker">
        <h2>Accessibility Checker</h2>
        {violations.length > 0 ? (
            <ul>
                {violations.map((violation) => (
                    <li key={violation.id}>
                        {violation.description}
                        <ul>
                            {violation.nodes.map((node, index) => (
                                <li key={index}>
                                    <div dangerouslySetInnerHTML={{ __html: node.html }} />
                                    <p>{node.failureSummary}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No accessibility issues found.</p>
        )}
    </div>
);
}


export default AccessibilityChecker;