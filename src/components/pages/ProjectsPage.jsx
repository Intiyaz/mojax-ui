import { useEffect, useState } from "react";
import { createProject, getProjects } from "../../services/projectApi";
export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [repositoryUrl, setRepositoryUrl] = useState("");
    useEffect(() => {
        loadProjects();
    }, []);
    async function loadProjects() {
        try {
            setLoading(true);
            setError(null);
            const data = await getProjects();
            setProjects(Array.isArray(data)
                ? data
                : []);
        }
        catch (err) {
            setError(getErrorMessage(err, "Unable to load projects."));
        }
        finally {
            setLoading(false);
        }
    }
    async function handleCreateProject(event) {
        event.preventDefault();
        if (!name.trim()) {
            setError("Project name is required.");
            return;
        }
        if (!repositoryUrl.trim()) {
            setError("Repository URL or source location is required.");
            return;
        }
        try {
            setCreating(true);
            setError(null);
            /*
             * This is currently retained because
             * your existing MoJaX frontend stores
             * the selected organization here.
             *
             * The backend should ultimately validate
             * organization membership from the JWT.
             */
            const organizationId = localStorage.getItem("mojax.organizationId");
            if (!organizationId) {
                setError("Organization information is missing. Please sign in again.");
                return;
            }
            const created = await createProject({
                name: name.trim(),
                description: description.trim()
                    || undefined,
                repositoryUrl: repositoryUrl.trim(),
                organizationId: organizationId
                    || undefined
            });
            setProjects(current => [
                created,
                ...current
            ]);
            setName("");
            setDescription("");
            setRepositoryUrl("");
            setShowCreateForm(false);
        }
        catch (err) {
            setError(getErrorMessage(err, "Unable to create project."));
        }
        finally {
            setCreating(false);
        }
    }
    return (<div className="page-content">


      {/* HEADER */}

      <div className="page-header">

        <div>

          <span className="page-kicker">

            PROJECT WORKSPACE

          </span>


          <h1>

            Projects

          </h1>


          <p>

            Register Java applications and
            repositories for MoJaX assessment.

          </p>

        </div>


        <button type="button" className="primary-button" onClick={() => setShowCreateForm(current => !current)}>

          {showCreateForm
            ? "Cancel"
            : "+ New Project"}

        </button>

      </div>


      {/* ERROR */}

      {error
            &&
                (<div className="page-error">

            {error}

          </div>)}


      {/* CREATE PROJECT */}

      {showCreateForm
            &&
                (<form className="project-create-card" onSubmit={handleCreateProject}>

            <div className="section-heading">

              <div>

                <h2>

                  Create Project

                </h2>


                <p>

                  Add a Java repository that
                  MoJaX can assess.

                </p>

              </div>

            </div>


            <div className="project-form-grid">


              <label>

                <span>

                  Project Name

                </span>


                <input type="text" value={name} placeholder="Payment Platform" disabled={creating} onChange={event => setName(event.target.value)}/>

              </label>


              <label>

                <span>

                  Repository / Source Location

                </span>


                <input type="text" value={repositoryUrl} placeholder="https://github.com/company/application.git" disabled={creating} onChange={event => setRepositoryUrl(event.target.value)}/>

              </label>


              <label className="project-description-field">

                <span>

                  Description

                </span>


                <textarea value={description} placeholder="Optional project description" disabled={creating} rows={3} onChange={event => setDescription(event.target.value)}/>

              </label>

            </div>


            <div className="project-form-actions">

              <button type="button" className="secondary-button" disabled={creating} onClick={() => setShowCreateForm(false)}>

                Cancel

              </button>


              <button type="submit" className="primary-button" disabled={creating}>

                {creating
                        ? "Creating..."
                        : "Create Project"}

              </button>

            </div>

          </form>)}


      {/* LOADING */}

      {loading
            &&
                (<div className="page-loading">

            Loading projects...

          </div>)}


      {/* EMPTY */}

      {!loading
            &&
                projects.length === 0
            &&
                (<div className="empty-state">

            <h3>

              No projects available

            </h3>


            <p>

              Create your first Java project
              to begin a MoJaX assessment.

            </p>


            <button type="button" className="primary-button" onClick={() => setShowCreateForm(true)}>

              Create Project

            </button>

          </div>)}


      {/* PROJECT LIST */}

      {!loading
            &&
                projects.length > 0
            &&
                (<div className="projects-grid">

            {projects.map(project => (<div key={project.id} className="project-card">

                    <div className="project-card-header">

                      <div>

                        <span className="project-card-label">

                          JAVA PROJECT

                        </span>


                        <h3>

                          {project.name}

                        </h3>

                      </div>


                      <span className="project-status">

                        Active

                      </span>

                    </div>


                    {project.description
                            &&
                                (<p className="project-description">

                          {project.description}

                        </p>)}


                    <div className="project-meta">

                      {project.repositoryUrl
                            &&
                                (<div>

                            <span>

                              Repository

                            </span>

                            <strong>

                              {project.repositoryUrl}

                            </strong>

                          </div>)}


                      {project.sourceLocation
                            &&
                                (<div>

                            <span>

                              Source

                            </span>

                            <strong>

                              {project.sourceLocation}

                            </strong>

                          </div>)}


                      {project.createdAt
                            &&
                                (<div>

                            <span>

                              Created

                            </span>

                            <strong>

                              {formatDate(project.createdAt)}

                            </strong>

                          </div>)}

                    </div>


                    <div className="project-id">

                      Project ID:
                      {" "}

                      <code>

                        {project.id}

                      </code>

                    </div>

                  </div>))}

          </div>)}

    </div>);
}
function formatDate(value) {
    try {
        return new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium"
        }).format(new Date(value));
    }
    catch {
        return value;
    }
}
function getErrorMessage(error, fallback) {
    return error instanceof Error
        ? error.message
        : fallback;
}
