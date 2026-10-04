import "./ProjectSelector.css";
export default function ProjectSelector({ projects, projectId, setProjectId, loading = false, error = "" }) {
    /*
     * Defensive normalization.
     *
     * Normally projects will always be Project[],
     * because api.listProjects() guarantees that.
     */
    const projectList = Array.isArray(projects)
        ? projects
        : [];
    /*
     * Find selected project.
     */
    const selectedProject = projectList.find(project => String(project.id) ===
        String(projectId));
    return (<section className="project-selection-card">


            {/* =================================================
            HEADER
           ================================================= */}

            <div className="project-selection-header">

                <div className="project-selection-icon">
                    📁
                </div>


                <div className="project-selection-title">

                    <h3>
                        Select Project
                    </h3>

                    <p>
                        Choose the application you want to assess
                    </p>

                </div>

            </div>


            {/* =================================================
            BODY
           ================================================= */}

            <div className="project-selection-body">


                <label htmlFor="projectId" className="project-field-label">

                    Project

                    <span className="required-marker">
                        *
                    </span>

                </label>


                {/* =================================================
            PROJECT DROPDOWN
           ================================================= */}

                <div className="project-select-wrapper">

                    <select id="projectId" className="project-select" value={projectId} disabled={loading ||
            projectList.length === 0} onChange={(event) => {
            setProjectId(event.target.value);
        }}>

                        <option value="">

                            {loading
            ? "Loading projects..."
            : projectList.length === 0
                ? "No projects available"
                : "Select a project..."}

                        </option>


                        {projectList.map(project => (<option key={project.id} value={project.id}>

                                        {project.name}

                                    </option>))}

                    </select>

                </div>


                {/* =================================================
            LOADING
           ================================================= */}

                {loading && (<div className="project-loading-message">

                        <span className="project-loading-spinner"/>

                        Loading projects from EngineeringAI...

                    </div>)}


                {/* =================================================
            API ERROR
           ================================================= */}

                {!loading &&
            error && (<div className="project-error-message">

                            <strong>
                                Unable to load projects
                            </strong>

                            <span>
                                {error}
                            </span>

                        </div>)}


                {/* =================================================
            EMPTY RESULT
           ================================================= */}

                {!loading &&
            !error &&
            projectList.length === 0 && (<div className="project-empty-message">

                            No projects were returned by the
                            EngineeringAI Project API.

                        </div>)}


                {/* =================================================
            SELECTED PROJECT DETAILS
           ================================================= */}

                {selectedProject && (<div className="selected-project-details">


                        <div className="selected-project-item">

                            <span className="selected-project-label">
                                Project UUID
                            </span>

                            <strong className="selected-project-uuid" title={selectedProject.id}>

                                {selectedProject.id}

                            </strong>

                        </div>


                        {selectedProject.repositoryUrl && (<div className="selected-project-item">

                                    <span className="selected-project-label">
                                        Repository / Source
                                    </span>

                                    <strong className="selected-project-repository" title={selectedProject.repositoryUrl}>

                                        {selectedProject.repositoryUrl}

                                    </strong>

                                </div>)}

                    </div>)}


                {/* =================================================
            AGENT INFORMATION
           ================================================= */}

                <div className="project-info-box">

                    <div className="project-info-icon">
                        i
                    </div>


                    

                </div>

            </div>

        </section>);
}
/* =========================================================
   AGENT DESCRIPTION
   ========================================================= */
function getAgentDescription(agentCode) {
    switch (agentCode) {
        case "JAVA_MIGRATION":
            return ("The Java Migration Agent uses the " +
                "repository URL or local source path " +
                "configured for this project.");
        case "PQC_MIGRATION":
            return ("The PQC Migration Agent scans the " +
                "repository URL or local source path " +
                "configured for this project to discover " +
                "cryptographic algorithms, APIs and " +
                "configurations requiring post-quantum " +
                "migration or security review.");
        case "OWASP_SECURITY":
            return ("The OWASP Security Agent analyzes the " +
                "configured project source for application " +
                "security risks and vulnerable patterns.");
        case "JVM_DIAGNOSTICS":
            return ("The JVM Diagnostics Agent analyzes the " +
                "configured application and available JVM " +
                "diagnostic evidence.");
        case "XML_JSON":
            return ("The Transformation Agent analyzes the " +
                "configured repository for XML, JSON, " +
                "XSLT, XPath, XQuery and schema " +
                "transformation opportunities.");
        default:
            return ("The selected EngineeringAI agent uses " +
                "the repository URL or local source path " +
                "configured for this project.");
    }
}
