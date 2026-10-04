import { Activity, Boxes, Code2, FileCode2, LockKeyhole, ShieldCheck, } from "lucide-react";
function Icon({ code }) {
    if (code.includes("PQC"))
        return <LockKeyhole />;
    if (code.includes("SECURITY") || code.includes("OWASP"))
        return <ShieldCheck />;
    if (code.includes("XML"))
        return <FileCode2 />;
    if (code.includes("MICROSERVICE"))
        return <Boxes />;
    if (code.includes("SONAR"))
        return <Activity />;
    return <Code2 />;
}
export default function AgentCard({ agent, running, disabled, onRun, }) {
    return (<div className="agent-card">
            <div className="agent-top">
                <Icon code={agent.code}/>
                <span className={agent.enabled ? "agent-enabled" : "agent-disabled"}>
                    {agent.enabled ? "Enabled" : "Disabled"}
                </span>
            </div>
            <span className="category">{agent.category}</span>
            <h3>{agent.name}</h3>
            <p>{agent.description}</p>
            <button disabled={disabled || !agent.enabled} onClick={onRun}>
                {running ? "Analyzing Application..." : "Run Assessment"}
            </button>
        </div>);
}
