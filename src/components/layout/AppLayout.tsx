import {
  useState
} from "react";

import {
  Navigate,
  NavLink,
  Outlet,
  useLocation
} from "react-router-dom";

import {
  getAccessToken
} from "../../services/apiFetch";

import {
  logout
} from "../../services/authApi";

import {
  useOrganization
} from "../../context/OrganizationContext";

import mojaXLogo from "../../assets/MoJaX.png";


export default function AppLayout() {

  const location =
    useLocation();


  const [
    sidebarOpen,
    setSidebarOpen
  ] =
    useState(false);


  const token =
    getAccessToken();


  const {
    organizationName,
    currentUser,
    loading,
    error,
    refreshOrganization
  } =
    useOrganization();


  /*
   * =========================================================
   * AUTH GUARD
   * =========================================================
   */

  if (!token) {

    return (

      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname
        }}
      />

    );
  }


  /*
   * =========================================================
   * USER / ORGANIZATION LOADING
   * =========================================================
   */

  if (loading) {

    return (

      <div className="app-loading">

        <div className="app-loading-card">

          <div className="app-loading-logo">

            M

          </div>


          <strong>

            MoJaX

          </strong>


          <span>

            Loading workspace...

          </span>

        </div>

      </div>
    );
  }


  /*
   * =========================================================
   * /auth/me FAILED
   * =========================================================
   */

  if (
    error
    &&
    !currentUser
  ) {

    return (

      <div className="app-loading">

        <div className="app-loading-card">

          <div className="app-layout-error">

            Unable to load your MoJaX workspace.

          </div>


          <div
            style={{
              display:
                "flex",

              gap:
                "10px",

              justifyContent:
                "center"
            }}
          >

            <button
              type="button"
              className="secondary-button"
              onClick={
                () =>
                  void refreshOrganization()
              }
            >

              Retry

            </button>


            <button
              type="button"
              className="primary-button"
              onClick={
                logout
              }
            >

              Sign in again

            </button>

          </div>

        </div>

      </div>
    );
  }


  function closeSidebar() {

    setSidebarOpen(
      false
    );
  }


  return (

    <div className="app-layout">


      {/* MOBILE OVERLAY */}

      {
        sidebarOpen
        &&
        (

          <button
            type="button"
            className="sidebar-overlay"
            aria-label="Close navigation"
            onClick={
              closeSidebar
            }
          />

        )
      }


      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside
        className={
          sidebarOpen
            ?
            "app-sidebar app-sidebar-open"
            :
            "app-sidebar"
        }
      >


        {/* BRAND */}

        <div className="sidebar-brand">
         
          <img
              src={mojaXLogo}
              alt="MoJaX"
              className="sidebar-logo"
          />
          
        </div>


        {/* ORGANIZATION */}

        <div className="sidebar-organization">

          <span>

            ORGANIZATION

          </span>


          <strong>

            {
              organizationName
              ??
              "MoJaX Workspace"
            }

          </strong>

        </div>


        {/* NAVIGATION */}

        <nav className="sidebar-navigation">


          <NavItem
            to="/dashboard"
            label="Dashboard"
            icon="⌂"
            onNavigate={
              closeSidebar
            }
          />


          <NavItem
            to="/projects"
            label="Projects"
            icon="▣"
            onNavigate={
              closeSidebar
            }
          />


          <NavItem
            to="/agents"
            label="Agents"
            icon="◇"
            onNavigate={
              closeSidebar
            }
          />


          <NavItem
            to="/assessments"
            label="Assessments"
            icon="✓"
            onNavigate={
              closeSidebar
            }
          />


          <NavItem
            to="/reports"
            label="Reports"
            icon="▤"
            onNavigate={
              closeSidebar
            }
          />


          <div className="sidebar-navigation-divider" />


          <NavItem
            to="/organization"
            label="Organization"
            icon="◎"
            onNavigate={
              closeSidebar
            }
          />


          <NavItem
            to="/subscription"
            label="Subscription"
            icon="◉"
            onNavigate={
              closeSidebar
            }
          />


          <NavItem
            to="/settings"
            label="Settings"
            icon="⚙"
            onNavigate={
              closeSidebar
            }
          />


        </nav>


        {/* USER */}

        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="sidebar-user-avatar">

              {
                getInitials(
                  currentUser?.displayName,
                  currentUser?.email
                )
              }

            </div>


            <div className="sidebar-user-details">

              <strong>

                {
                  currentUser?.displayName
                  ||
                  "MoJaX User"
                }

              </strong>


              <span>

                {
                  currentUser?.email
                  ||
                  ""
                }

              </span>

            </div>

          </div>


          <button
            type="button"
            className="sidebar-logout"
            onClick={
              logout
            }
          >

            <span>

              ↪

            </span>

            Sign out

          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <div className="app-main">


        {/* HEADER */}

        <header className="app-header">

          <div className="app-header-left">


            <button
              type="button"
              className="mobile-menu-button"
              aria-label="Open navigation"
              onClick={
                () =>
                  setSidebarOpen(
                    true
                  )
              }
            >

              ☰

            </button>


            <div className="app-header-title">

              <span>

                {
                  getPageSection(
                    location.pathname
                  )
                }

              </span>


              <strong>

                {
                  getPageTitle(
                    location.pathname
                  )
                }

              </strong>

            </div>

          </div>


          <div className="app-header-right">


            <div className="app-header-organization">

              <span>

                Workspace

              </span>


              <strong>

                {
                  organizationName
                  ??
                  "MoJaX"
                }

              </strong>

            </div>


            <div className="app-header-user">

              <div className="app-header-avatar">

                {
                  getInitials(
                    currentUser?.displayName,
                    currentUser?.email
                  )
                }

              </div>


              <div>

                <strong>

                  {
                    currentUser?.displayName
                    ||
                    currentUser?.email
                    ||
                    "User"
                  }

                </strong>


                {
                  currentUser?.displayName
                  &&
                  currentUser?.email
                  &&
                  (

                    <span>

                      {
                        currentUser.email
                      }

                    </span>

                  )
                }

              </div>

            </div>


            <button
              type="button"
              className="header-logout-button"
              onClick={
                logout
              }
            >

              Sign out

            </button>

          </div>

        </header>


        {/* PAGE */}

        <main className="app-page">

          <Outlet />

        </main>


        {/* FOOTER */}

        <footer className="app-footer">

          <span>

            MoJaX

          </span>


          <span>

            Enterprise Java Modernization Intelligence

          </span>

        </footer>

      </div>

    </div>
  );
}


/* =============================================================
   NAVIGATION ITEM
   ============================================================= */

type NavItemProps = {

  to: string;

  label: string;

  icon: string;

  onNavigate: () => void;

};


function NavItem({
  to,
  label,
  icon,
  onNavigate
}: NavItemProps) {

  return (

    <NavLink
      to={
        to
      }
      onClick={
        onNavigate
      }
      className={
        ({
          isActive
        }) =>
          isActive
            ?
            "sidebar-nav-item sidebar-nav-item-active"
            :
            "sidebar-nav-item"
      }
    >

      <span className="sidebar-nav-icon">

        {icon}

      </span>


      <span className="sidebar-nav-label">

        {label}

      </span>

    </NavLink>
  );
}


/* =============================================================
   PAGE TITLE
   ============================================================= */

function getPageTitle(
  pathname: string
): string {

  if (
    pathname.startsWith(
      "/dashboard"
    )
  ) {

    return "Dashboard";
  }


  if (
    pathname.startsWith(
      "/projects"
    )
  ) {

    return "Projects";
  }


  if (
    pathname.startsWith(
      "/agents"
    )
  ) {

    return "Assessment Agents";
  }


  if (
    pathname.startsWith(
      "/assessments"
    )
  ) {

    return "Assessments";
  }


  if (
    pathname.startsWith(
      "/reports"
    )
  ) {

    return "Reports";
  }


  if (
    pathname === "/organization"
    ||
    pathname.startsWith(
      "/organization/"
    )
  ) {

    return "Organization Details";
  }


  if (
    pathname.startsWith(
      "/subscription"
    )
  ) {

    return "Subscription";
  }


  if (
    pathname.startsWith(
      "/settings"
    )
  ) {

    return "Settings";
  }


  return "MoJaX";
}


/* =============================================================
   PAGE SECTION
   ============================================================= */

function getPageSection(
  pathname: string
): string {

  if (
    pathname.startsWith(
      "/projects"
    )
  ) {

    return "PROJECT WORKSPACE";
  }


  if (
    pathname.startsWith(
      "/agents"
    )
  ) {

    return "MODERNIZATION INTELLIGENCE";
  }


  if (
    pathname.startsWith(
      "/assessments"
    )
  ) {

    return "ASSESSMENT INTELLIGENCE";
  }


  if (
    pathname.startsWith(
      "/reports"
    )
  ) {

    return "REPORTING";
  }


  if (
    pathname === "/organization"
    ||
    pathname.startsWith(
      "/organization/"
    )
  ) {

    return "ORGANIZATION PROFILE";
  }


  if (
    pathname.startsWith(
      "/subscription"
    )
  ) {

    return "PLAN & USAGE";
  }


  if (
    pathname.startsWith(
      "/settings"
    )
  ) {

    return "WORKSPACE";
  }


  return "ENTERPRISE MODERNIZATION";
}


/* =============================================================
   INITIALS
   ============================================================= */

function getInitials(
  displayName?: string,
  email?: string
): string {

  if (
    displayName
    &&
    displayName.trim()
  ) {

    const parts =
      displayName
        .trim()
        .split(
          /\s+/
        );


    if (
      parts.length === 1
    ) {

      return parts[0]
        .substring(
          0,
          2
        )
        .toUpperCase();
    }


    const first =
      parts[0]
        .charAt(0);


    const last =
      parts[
        parts.length - 1
      ]
        .charAt(0);


    return (
      first + last
    ).toUpperCase();
  }


  if (
    email
    &&
    email.trim()
  ) {

    return email
      .substring(
        0,
        2
      )
      .toUpperCase();
  }


  return "MX";
}