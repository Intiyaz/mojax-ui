export default function RemediationActionCard({ action }) {
    const priority = action.priority
        ?.toLowerCase() ||
        "medium";
    return (<article className={`remediation-action priority-${priority}`}>

            <div className="remediation-action-header">

                <span className="phase-number">
                    {action.order}
                </span>

                <div className="remediation-action-heading">

                    <small>
                        {action.phase}
                    </small>

                    <h4>
                        {action.title}
                    </h4>

                </div>

                <span className={`priority-badge ${priority}`}>
                    {action.priority}
                </span>

            </div>

            {action.description && (<p className="remediation-action-description">
                    {action.description}
                </p>)}

            {action.tasks &&
            action.tasks.length > 0 && (<div className="remediation-task-section">

                    <small className="remediation-section-label">
                        REMEDIATION TASKS
                    </small>

                    <div className="remediation-tasks">

                        {action.tasks.map((task, index) => (<div className="remediation-task" key={index}>

                                    <span className="task-check">
                                        ✓
                                    </span>

                                    <span>
                                        {task}
                                    </span>

                                </div>))}

                    </div>

                </div>)}

            {action.validation && (<div className="validation-box">

                    <small>
                        VALIDATION
                    </small>

                    <strong>
                        {action.validation}
                    </strong>

                </div>)}

            {action.approvalRequired && (<div className="approval-required">

                    <span>
                        🔒
                    </span>

                    <div>

                        <strong>
                            Human Approval Required
                        </strong>

                        <small>
                            EngineeringAI will not apply
                            this remediation automatically.
                        </small>

                    </div>

                </div>)}

        </article>);
}
