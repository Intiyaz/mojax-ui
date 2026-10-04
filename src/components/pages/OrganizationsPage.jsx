import { useEffect, useState } from "react";
import { apiGet, apiPut } from "../../services/apiFetch";
import { useOrganization } from "../../context/OrganizationContext";
export default function OrganizationPage() {
    const { organizationId, refreshOrganization } = useOrganization();
    const [organization, setOrganization] = useState(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    useEffect(() => {
        if (!organizationId) {
            setLoading(false);
            setError("Organization is not available for the current user.");
            return;
        }
        void loadOrganization();
    }, [organizationId]);
    async function loadOrganization() {
        if (!organizationId) {
            return;
        }
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            const data = await apiGet(`/api/v1/organizations/${organizationId}`);
            setOrganization(data);
            setForm({
                name: data.name ?? "",
                description: data.description ?? "",
                addressLine1: data.addressLine1 ?? "",
                addressLine2: data.addressLine2 ?? "",
                city: data.city ?? "",
                state: data.state ?? "",
                postalCode: data.postalCode ?? "",
                country: data.country ?? ""
            });
        }
        catch (err) {
            setError(err instanceof Error
                ? err.message
                : "Unable to load organization.");
        }
        finally {
            setLoading(false);
        }
    }
    function updateField(field, value) {
        setForm(current => ({
            ...current,
            [field]: value
        }));
        setError(null);
        setSuccess(null);
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if (!organizationId) {
            setError("Organization is not available for the current user.");
            return;
        }
        if (!form.name.trim()) {
            setError("Organization name is required.");
            return;
        }
        try {
            setSaving(true);
            setError(null);
            setSuccess(null);
            const request = {
                name: form.name.trim(),
                description: trimToUndefined(form.description),
                addressLine1: trimToUndefined(form.addressLine1),
                addressLine2: trimToUndefined(form.addressLine2),
                city: trimToUndefined(form.city),
                state: trimToUndefined(form.state),
                postalCode: trimToUndefined(form.postalCode),
                country: trimToUndefined(form.country)
            };
            const updated = await apiPut(`/api/v1/organizations/${organizationId}`, request);
            setOrganization(updated);
            setForm({
                name: updated.name ?? "",
                description: updated.description ?? "",
                addressLine1: updated.addressLine1 ?? "",
                addressLine2: updated.addressLine2 ?? "",
                city: updated.city ?? "",
                state: updated.state ?? "",
                postalCode: updated.postalCode ?? "",
                country: updated.country ?? ""
            });
            await refreshOrganization();
            setSuccess("Organization details updated successfully.");
        }
        catch (err) {
            setError(err instanceof Error
                ? err.message
                : "Unable to update organization.");
        }
        finally {
            setSaving(false);
        }
    }
    if (loading) {
        return (<div className="page">
        <div className="content-card">
          Loading organization...
        </div>
      </div>);
    }
    return (<div className="page">

      <div className="page-header">
        <div>
          <h1>Organization Details</h1>
          <p>
            Maintain your organization profile and business address.
          </p>
        </div>
      </div>


      {error && (<div className="error-message">
          {error}
        </div>)}


      {success && (<div className="success-message">
          {success}
        </div>)}


      <form className="content-card organization-details-form" onSubmit={handleSubmit}>

        <div className="organization-section">

          <h2>Organization</h2>

          <div className="organization-form-grid">

            <label className="organization-field organization-field-full">
              <span>Organization Name *</span>
              <input type="text" maxLength={200} value={form.name} disabled={saving} onChange={event => updateField("name", event.target.value)}/>
            </label>


            <label className="organization-field organization-field-full">
              <span>Description</span>
              <textarea rows={5} maxLength={1000} value={form.description ?? ""} disabled={saving} placeholder="Brief description of your organization" onChange={event => updateField("description", event.target.value)}/>
              <small>
                {(form.description ?? "").length}/1000
              </small>
            </label>

          </div>
        </div>


        <div className="organization-section">

          <h2>Business Address</h2>

          <div className="organization-form-grid">

            <label className="organization-field organization-field-full">
              <span>Address Line 1</span>
              <input type="text" maxLength={200} value={form.addressLine1 ?? ""} disabled={saving} placeholder="Building, street, area" onChange={event => updateField("addressLine1", event.target.value)}/>
            </label>


            <label className="organization-field organization-field-full">
              <span>Address Line 2</span>
              <input type="text" maxLength={200} value={form.addressLine2 ?? ""} disabled={saving} placeholder="Suite, floor, landmark" onChange={event => updateField("addressLine2", event.target.value)}/>
            </label>


            <label className="organization-field">
              <span>City</span>
              <input type="text" maxLength={100} value={form.city ?? ""} disabled={saving} onChange={event => updateField("city", event.target.value)}/>
            </label>


            <label className="organization-field">
              <span>State / Province</span>
              <input type="text" maxLength={100} value={form.state ?? ""} disabled={saving} onChange={event => updateField("state", event.target.value)}/>
            </label>


            <label className="organization-field">
              <span>Postal Code</span>
              <input type="text" maxLength={30} value={form.postalCode ?? ""} disabled={saving} onChange={event => updateField("postalCode", event.target.value)}/>
            </label>


            <label className="organization-field">
              <span>Country</span>
              <input type="text" maxLength={100} value={form.country ?? ""} disabled={saving} onChange={event => updateField("country", event.target.value)}/>
            </label>

          </div>
        </div>


        {organization?.createdAt && (<div className="organization-created-at">
            Organization created: {formatDate(organization.createdAt)}
          </div>)}


        <div className="organization-form-actions">

          <button type="button" className="secondary-button" disabled={saving} onClick={() => void loadOrganization()}>
            Reset
          </button>

          <button type="submit" className="primary-button" disabled={saving}>
            {saving ? "Saving..." : "Save Organization"}
          </button>

        </div>

      </form>

    </div>);
}
function trimToUndefined(value) {
    const normalized = value?.trim() ?? "";
    return normalized
        ? normalized
        : undefined;
}
function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString();
}
