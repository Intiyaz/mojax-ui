import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "../services/authApi";
import { getAccessToken } from "../services/apiFetch";
const OrganizationContext = createContext(undefined);
export function OrganizationProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    /*
     * =========================================================
     * LOAD CURRENT AUTHENTICATED USER
     * =========================================================
     *
     * No call to:
     *
     * GET /api/v1/organizations
     *
     * The user's organization comes directly from:
     *
     * GET /api/v1/auth/me
     */
    const loadOrganization = useCallback(async () => {
        const token = getAccessToken();
        /*
         * OrganizationProvider may also wrap
         * public pages such as /login and /register.
         *
         * Don't call /auth/me unless a JWT exists.
         */
        if (!token) {
            setCurrentUser(null);
            setError(null);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const user = await getCurrentUser();
            setCurrentUser(user);
            /*
             * Temporary compatibility support.
             *
             * Some existing MoJaX components may
             * still read this value.
             *
             * New components should use
             * OrganizationContext.organizationId.
             */
            if (user.organizationId) {
                localStorage.setItem("mojax.organizationId", user.organizationId);
            }
        }
        catch (err) {
            setCurrentUser(null);
            setError(getErrorMessage(err, "Unable to load your organization."));
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        void loadOrganization();
    }, [
        loadOrganization
    ]);
    const value = useMemo(() => ({
        organizationId: currentUser?.organizationId
            ?? null,
        organizationName: currentUser?.organizationName
            ?? null,
        currentUser,
        loading,
        error,
        refreshOrganization: loadOrganization
    }), [
        currentUser,
        loading,
        error,
        loadOrganization
    ]);
    return (<OrganizationContext.Provider value={value}>

      {children}

    </OrganizationContext.Provider>);
}
export function useOrganization() {
    const context = useContext(OrganizationContext);
    if (!context) {
        throw new Error("useOrganization must be used inside OrganizationProvider.");
    }
    return context;
}
function getErrorMessage(error, fallback) {
    if (error instanceof Error) {
        return error.message;
    }
    return fallback;
}
