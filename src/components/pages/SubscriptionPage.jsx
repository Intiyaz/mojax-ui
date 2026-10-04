import { useEffect, useState } from "react";
import { useOrganization } from "../../context/OrganizationContext";
import { getSubscription } from "../../services/subscriptionApi";
export default function SubscriptionPage() {
    const { organizationId } = useOrganization();
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!organizationId) {
            setLoading(false);
            setError("Organization is not available.");
            return;
        }
        void loadSubscription();
    }, [
        organizationId
    ]);
    async function loadSubscription() {
        if (!organizationId) {
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const data = await getSubscription(organizationId);
            setSubscription(data);
        }
        catch (err) {
            setError(err instanceof Error
                ? err.message
                : "Unable to load subscription.");
        }
        finally {
            setLoading(false);
        }
    }
    if (loading) {
        return (<div className="page">

        <div className="content-card">

          Loading subscription...

        </div>

      </div>);
    }
    if (error) {
        return (<div className="page">

        <div className="error-message">

          {error}

        </div>

      </div>);
    }
    if (!subscription) {
        return (<div className="page">

        <div className="empty-state">

          Subscription not found.

        </div>

      </div>);
    }
    const percentage = subscription.scanLimit > 0
        ?
            Math.min(100, Math.round(subscription.scansUsed
                /
                    subscription.scanLimit
                *
                    100))
        :
            0;
    return (<div className="page">


      <div className="subscription-summary">


        <div className="subscription-plan-card">

          <span className="subscription-label">

            CURRENT PLAN

          </span>

          <h2>

            {subscription.planCode}

          </h2>

          <p>

            Activated{" "}

            {new Date(subscription.activatedAt).toLocaleDateString()}

          </p>

        </div>


        <div className="subscription-stat">

          <span>

            Scan Limit

          </span>

          <strong>

            {subscription.scanLimit}

          </strong>

        </div>


        <div className="subscription-stat">

          <span>

            Used

          </span>

          <strong>

            {subscription.scansUsed}

          </strong>

        </div>


        <div className="subscription-stat">

          <span>

            Remaining

          </span>

          <strong>

            {subscription.scansRemaining}

          </strong>

        </div>


      </div>


      <div className="subscription-usage-card">

        <div className="subscription-usage-header">

          <div>

            <span className="subscription-label">

              PROJECT SCAN USAGE

            </span>

            <h3>

              {subscription.scansUsed}
              {" / "}
              {subscription.scanLimit}
              {" scans used"}

            </h3>

          </div>


          <strong>

            {percentage}%

          </strong>

        </div>


        <div className="subscription-progress">

          <div className="subscription-progress-fill" style={{
            width: `${percentage}%`
        }}/>

        </div>


        <div className="subscription-remaining">

          {subscription.scansRemaining}
          {" project scans remaining"}

        </div>


        {subscription.scansRemaining <= 2
            &&
                subscription.scansRemaining > 0
            &&
                (<div className="subscription-warning">

              Your scan allowance is running low.

            </div>)}


        {subscription.scansRemaining === 0
            &&
                (<div className="subscription-limit-warning">

              Your project scan limit has been reached.

            </div>)}

      </div>


      <div className="subscription-payment-card">

        <span className="subscription-label">

          SUBSCRIPTION DETAILS

        </span>


        <div className="subscription-payment-grid">

          <div>

            <span>

              Amount Paid

            </span>

            <strong>

              {subscription.currency}
              {" "}
              {formatAmount(subscription.amountPaid)}

            </strong>

          </div>


          <div>

            <span>

              Currency

            </span>

            <strong>

              {subscription.currency}

            </strong>

          </div>


          <div>

            <span>

              Plan

            </span>

            <strong>

              {subscription.planCode}

            </strong>

          </div>


          <div>

            <span>

              Activated

            </span>

            <strong>

              {new Date(subscription.activatedAt).toLocaleDateString()}

            </strong>

          </div>

        </div>

      </div>


    </div>);
}
function formatAmount(amount) {
    return new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 2
    }).format(amount ?? 0);
}
