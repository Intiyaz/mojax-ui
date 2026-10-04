import { useEffect, useMemo, useState } from "react";
import { useOrganization } from "../../context/OrganizationContext";
import { getSubscription } from "../../services/subscriptionApi";
import type { SubscriptionResponse } from "../../services/subscriptionApi";

export default function SubscriptionPage() {
  const { organizationId, organizationName } = useOrganization();
  const [subscription, setSubscription] =
    useState<SubscriptionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!organizationId) {
      setLoading(false);
      setError("Organization is not available for the current user.");
      return;
    }
    void loadSubscription();
  }, [organizationId]);

  async function loadSubscription() {
    if (!organizationId) return;

    try {
      setLoading(true);
      setError(null);
      setSubscription(await getSubscription(organizationId));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load subscription."
      );
    } finally {
      setLoading(false);
    }
  }

  const usagePercent = useMemo(() => {
    if (!subscription || subscription.scanLimit <= 0) return 0;
    return Math.min(
      100,
      Math.round(
        subscription.scansUsed / subscription.scanLimit * 100
      )
    );
  }, [subscription]);

  if (loading) {
    return (
      <div className="page">
        <div className="content-card">Loading subscription...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Subscription</h1>
            <p>View your current plan and project scan usage.</p>
          </div>
        </div>
        <div className="error-message">{error}</div>
        <button
          type="button"
          className="secondary-button"
          onClick={() => void loadSubscription()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="page">
        <div className="empty-state">
          Subscription information is not available.
        </div>
      </div>
    );
  }

  const limitReached = subscription.scansRemaining <= 0;
  const lowBalance =
    !limitReached && subscription.scansRemaining <= 2;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Subscription</h1>
          <p>
            Plan and project scan usage for{" "}
            {organizationName ?? "your organization"}.
          </p>
        </div>
      </div>

      <div className="subscription-summary-grid">
        <div className="subscription-plan-card">
          <span className="subscription-card-label">CURRENT PLAN</span>
          <strong className="subscription-plan-name">
            {formatPlanName(subscription.planCode)}
          </strong>
          <span className="subscription-plan-code">
            {subscription.planCode}
          </span>
          <div className="subscription-plan-activated">
            Activated {formatDate(subscription.activatedAt)}
          </div>
        </div>

        <SubscriptionMetric
          label="Scan Limit"
          value={subscription.scanLimit}
        />
        <SubscriptionMetric
          label="Scans Used"
          value={subscription.scansUsed}
        />
        <SubscriptionMetric
          label="Scans Remaining"
          value={subscription.scansRemaining}
          emphasis={
            limitReached
              ? "danger"
              : lowBalance
                ? "warning"
                : "normal"
          }
        />
      </div>

      <div className="content-card subscription-usage-card">
        <div className="subscription-usage-heading">
          <div>
            <span className="subscription-card-label">
              PROJECT SCAN USAGE
            </span>
            <h2>
              {subscription.scansUsed} / {subscription.scanLimit} scans used
            </h2>
          </div>
          <strong className="subscription-usage-percent">
            {usagePercent}%
          </strong>
        </div>

        <div
          className="subscription-progress"
          aria-label={`${usagePercent}% of scan allowance used`}
        >
          <div
            className="subscription-progress-fill"
            style={{ width: `${usagePercent}%` }}
          />
        </div>

        <div className="subscription-usage-footer">
          <span>
            {subscription.scansRemaining} scan
            {subscription.scansRemaining === 1 ? "" : "s"} remaining
          </span>
          <span>Limit: {subscription.scanLimit}</span>
        </div>

        {limitReached && (
          <div className="subscription-alert subscription-alert-danger">
            <strong>Scan limit reached</strong>
            <span>
              Your current plan has no project scans remaining.
              Upgrade or renew your plan to continue running assessments.
            </span>
          </div>
        )}

        {lowBalance && (
          <div className="subscription-alert subscription-alert-warning">
            <strong>Scan allowance running low</strong>
            <span>
              Only {subscription.scansRemaining} project scan
              {subscription.scansRemaining === 1 ? "" : "s"} remaining.
            </span>
          </div>
        )}
      </div>

      <div className="content-card subscription-details-card">
        <div className="subscription-details-heading">
          <div>
            <span className="subscription-card-label">
              SUBSCRIPTION DETAILS
            </span>
            <h2>Billing & activation</h2>
          </div>
        </div>

        <div className="subscription-details-grid">
          <SubscriptionDetail
            label="Plan"
            value={formatPlanName(subscription.planCode)}
          />
          <SubscriptionDetail
            label="Amount Paid"
            value={formatAmount(
              subscription.amountPaid,
              subscription.currency
            )}
          />
          <SubscriptionDetail
            label="Currency"
            value={subscription.currency}
          />
          <SubscriptionDetail
            label="Activated"
            value={formatDate(subscription.activatedAt)}
          />
        </div>
      </div>
    </div>
  );
}

function SubscriptionMetric({
  label,
  value,
  emphasis = "normal"
}: {
  label: string;
  value: number;
  emphasis?: "normal" | "warning" | "danger";
}) {
  return (
    <div className={`subscription-metric subscription-metric-${emphasis}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SubscriptionDetail({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="subscription-detail">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatPlanName(planCode: string): string {
  if (!planCode) return "Plan";
  if (planCode.toUpperCase() === "FREE") return "Free";

  return planCode
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

function formatAmount(
  amount: number,
  currency: string
): string {
  try {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: currency || "INR",
        maximumFractionDigits: 2
      }
    ).format(amount ?? 0);
  } catch {
    return `${currency || ""} ${amount ?? 0}`.trim();
  }
}

function formatDate(value: string): string {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );
}
