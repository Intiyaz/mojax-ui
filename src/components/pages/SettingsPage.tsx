import {
  FormEvent,
  useMemo,
  useState
} from "react";

import {
  apiPut
} from "../../services/apiFetch";


type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};


type ChangePasswordResponse = {
  message: string;
};


type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};


const INITIAL_FORM: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
};


export default function SettingsPage() {

  const [
    form,
    setForm
  ] =
    useState<PasswordForm>(
      INITIAL_FORM
    );


  const [
    saving,
    setSaving
  ] =
    useState(false);


  const [
    error,
    setError
  ] =
    useState<string | null>(
      null
    );


  const [
    success,
    setSuccess
  ] =
    useState<string | null>(
      null
    );


  const [
    showCurrent,
    setShowCurrent
  ] =
    useState(false);


  const [
    showNew,
    setShowNew
  ] =
    useState(false);


  const [
    showConfirm,
    setShowConfirm
  ] =
    useState(false);


  const passwordChecks =
    useMemo(
      () => ({
        length:
          form.newPassword.length
          >=
          8,

        different:
          Boolean(
            form.newPassword
          )
          &&
          form.newPassword
          !==
          form.currentPassword,

        matches:
          Boolean(
            form.confirmPassword
          )
          &&
          form.newPassword
          ===
          form.confirmPassword
      }),
      [
        form
      ]
    );


  function updateField(
    field: keyof PasswordForm,
    value: string
  ) {

    setForm(
      current => ({
        ...current,
        [field]: value
      })
    );

    setError(
      null
    );

    setSuccess(
      null
    );
  }


  async function handleChangePassword(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    if (
      !form.currentPassword
    ) {

      setError(
        "Enter your current password."
      );

      return;
    }


    if (
      form.newPassword.length
      <
      8
    ) {

      setError(
        "New password must contain at least 8 characters."
      );

      return;
    }


    if (
      form.newPassword
      ===
      form.currentPassword
    ) {

      setError(
        "New password must be different from your current password."
      );

      return;
    }


    if (
      form.newPassword
      !==
      form.confirmPassword
    ) {

      setError(
        "New password and confirmation do not match."
      );

      return;
    }


    try {

      setSaving(
        true
      );

      setError(
        null
      );

      setSuccess(
        null
      );


      const request:
        ChangePasswordRequest = {

        currentPassword:
          form.currentPassword,

        newPassword:
          form.newPassword,

        confirmPassword:
          form.confirmPassword
      };


      const response =
        await apiPut<ChangePasswordResponse>(
          "/api/v1/auth/password",
          request
        );


      setSuccess(
        response.message
        ||
        "Password changed successfully."
      );


      setForm(
        INITIAL_FORM
      );


      setShowCurrent(
        false
      );

      setShowNew(
        false
      );

      setShowConfirm(
        false
      );

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Unable to change password."
      );

    } finally {

      setSaving(
        false
      );
    }
  }


  return (
    <div className="page">

      <div className="page-header">

        <div>

          <span className="eyebrow">
            PLATFORM CONFIGURATION
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Manage account security and
            platform configuration.
          </p>

        </div>

      </div>


      <div className="settings-security-layout">

        <section className="settings-security-card">

          <div className="settings-security-hero">

            <div className="settings-security-icon">
              🔐
            </div>

            <div>

              <span className="eyebrow">
                ACCOUNT SECURITY
              </span>

              <h2>
                Change Password
              </h2>

              <p>
                Update the password used to sign in
                to your MoJaX account.
              </p>

            </div>

          </div>


          {error && (

            <div className="settings-password-message error">
              <span>
                !
              </span>

              <div>
                <strong>
                  Password not changed
                </strong>

                <p>
                  {error}
                </p>
              </div>
            </div>

          )}


          {success && (

            <div className="settings-password-message success">
              <span>
                ✓
              </span>

              <div>
                <strong>
                  Password updated
                </strong>

                <p>
                  {success}
                  {" "}
                  Use the new password the next
                  time you sign in.
                </p>
              </div>
            </div>

          )}


          <form
            className="settings-password-form"
            onSubmit={
              handleChangePassword
            }
          >

            <PasswordField
              label="Current Password"
              value={
                form.currentPassword
              }
              visible={
                showCurrent
              }
              disabled={
                saving
              }
              autoComplete="current-password"
              placeholder="Enter your current password"
              onChange={
                value =>
                  updateField(
                    "currentPassword",
                    value
                  )
              }
              onToggle={() =>
                setShowCurrent(
                  current =>
                    !current
                )
              }
            />


            <div className="settings-password-grid">

              <PasswordField
                label="New Password"
                value={
                  form.newPassword
                }
                visible={
                  showNew
                }
                disabled={
                  saving
                }
                autoComplete="new-password"
                placeholder="Minimum 8 characters"
                onChange={
                  value =>
                    updateField(
                      "newPassword",
                      value
                    )
                }
                onToggle={() =>
                  setShowNew(
                    current =>
                      !current
                  )
                }
              />


              <PasswordField
                label="Confirm New Password"
                value={
                  form.confirmPassword
                }
                visible={
                  showConfirm
                }
                disabled={
                  saving
                }
                autoComplete="new-password"
                placeholder="Repeat the new password"
                onChange={
                  value =>
                    updateField(
                      "confirmPassword",
                      value
                    )
                }
                onToggle={() =>
                  setShowConfirm(
                    current =>
                      !current
                  )
                }
              />

            </div>


            <div className="settings-password-requirements">

              <span className="settings-password-requirements-title">
                Password checks
              </span>

              <PasswordCheck
                passed={
                  passwordChecks.length
                }
                label="At least 8 characters"
              />

              <PasswordCheck
                passed={
                  passwordChecks.different
                }
                label="Different from current password"
              />

              <PasswordCheck
                passed={
                  passwordChecks.matches
                }
                label="New passwords match"
              />

            </div>


            <div className="settings-password-actions">

              <button
                type="button"
                className="secondary-button"
                disabled={
                  saving
                }
                onClick={
                  () => {

                    setForm(
                      INITIAL_FORM
                    );

                    setError(
                      null
                    );

                    setSuccess(
                      null
                    );
                  }
                }
              >
                Clear
              </button>


              <button
                type="submit"
                className="primary-button settings-password-submit"
                disabled={
                  saving
                  ||
                  !form.currentPassword
                  ||
                  !passwordChecks.length
                  ||
                  !passwordChecks.different
                  ||
                  !passwordChecks.matches
                }
              >
                {
                  saving
                    ? "Changing Password..."
                    : "Change Password"
                }
              </button>

            </div>

          </form>

        </section>


        <aside className="settings-security-info">

          <div className="settings-security-info-card blue">

            <span className="settings-security-info-icon">
              ◇
            </span>

            <div>
              <strong>
                Password protection
              </strong>

              <p>
                Your current password is verified
                before any change is accepted.
              </p>
            </div>

          </div>


          <div className="settings-security-info-card green">

            <span className="settings-security-info-icon">
              ✓
            </span>

            <div>
              <strong>
                Secure storage
              </strong>

              <p>
                MoJaX stores the encoded password hash,
                not your plain-text password.
              </p>
            </div>

          </div>


          <div className="settings-security-info-card purple">

            <span className="settings-security-info-icon">
              ↻
            </span>

            <div>
              <strong>
                Existing session
              </strong>

              <p>
                Changing your password does not
                interrupt the current signed-in session.
              </p>
            </div>

          </div>

        </aside>

      </div>


    

    </div>
  );
}


function PasswordField({
  label,
  value,
  visible,
  disabled,
  placeholder,
  autoComplete,
  onChange,
  onToggle
}: {
  label: string;
  value: string;
  visible: boolean;
  disabled: boolean;
  placeholder: string;
  autoComplete: string;
  onChange: (
    value: string
  ) => void;
  onToggle: () => void;
}) {

  return (
    <label className="settings-password-field">

      <span>
        {label}
      </span>

      <div className="settings-password-input">

        <input
          type={
            visible
              ? "text"
              : "password"
          }
          value={
            value
          }
          disabled={
            disabled
          }
          autoComplete={
            autoComplete
          }
          placeholder={
            placeholder
          }
          onChange={
            event =>
              onChange(
                event.target.value
              )
          }
        />

        <button
          type="button"
          disabled={
            disabled
          }
          aria-label={
            visible
              ? `Hide ${label}`
              : `Show ${label}`
          }
          onClick={
            onToggle
          }
        >
          {
            visible
              ? "Hide"
              : "Show"
          }
        </button>

      </div>

    </label>
  );
}


function PasswordCheck({
  passed,
  label
}: {
  passed: boolean;
  label: string;
}) {

  return (
    <div
      className={
        passed
          ? "settings-password-check passed"
          : "settings-password-check"
      }
    >
      <span>
        {
          passed
            ? "✓"
            : "○"
        }
      </span>

      {label}

    </div>
  );
}
