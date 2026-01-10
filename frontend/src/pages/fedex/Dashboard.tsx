import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { getRecommendations } from "../../api/recommendation";
import type { Recommendation } from "../../api/recommendation";
import { allocateCase } from "../../api/allocation";

type CasePriority = {
  caseId: number;
  accountId: number;
  outstandingAmount: number;
  riskSegment: string;
  priorityScore: number;
};

export default function FedexDashboard() {
  const [cases, setCases] = useState<CasePriority[]>([]);
  const [loading, setLoading] = useState(true);
  const [recoLoading, setRecoLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [assignedAccounts, setAssignedAccounts] = useState<number[]>([]);

  const REGION_ID = 1;

  useEffect(() => {
    api
      .post("/api/case-intelligence/run?page=0&size=5")
      .then((res) => setCases(res.data.content || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const runRecommendation = async () => {
    setRecoLoading(true);
    try {
      const data = await getRecommendations(REGION_ID);
      setRecommendations(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setRecoLoading(false);
    }
  };

  const handleAssign = async (accountId: number, dcaId: number) => {
    try {
      await allocateCase(accountId, dcaId);

      setAssignedAccounts((prev) => [...prev, accountId]);

      alert("Case allocated successfully");
    } catch (err) {
      console.error(err);
      alert("Allocation failed");
    }
  };

  if (loading) {
    return <div style={{ padding: 20 }}>Loading priority engine...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
        FedEx – Case Allocation
      </h1>

      <button
        onClick={runRecommendation}
        style={{
          marginTop: 16,
          marginBottom: 16,
          padding: "8px 12px",
          background: "#2563eb",
          color: "white",
          borderRadius: 4,
        }}
      >
        Run AI Recommendation
      </button>

      {recoLoading && <p>Running recommendation engine...</p>}

      <table border={1} cellPadding={8} width="100%">
        <thead>
          <tr>
            <th>Account</th>
            <th>Risk</th>
            <th>Priority</th>
            <th>Recommended DCA</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => {
            const reco = recommendations.find(
              (r) => r.accountId === c.accountId
            );
            const assigned = assignedAccounts.includes(c.accountId);

            return (
              <tr key={c.caseId}>
                <td>{c.accountId}</td>
                <td>{c.riskSegment}</td>
                <td>{c.priorityScore}</td>
                <td>{reco ? reco.dcaName : "-"}</td>
                <td>
                  {reco && !assigned ? (
                    <button
                      onClick={() => handleAssign(c.accountId, reco.dcaId)}
                      style={{
                        background: "red",
                        color: "white",
                        padding: "4px 8px",
                      }}
                    >
                      Assign
                    </button>
                  ) : assigned ? (
                    <span style={{ color: "green" }}>Assigned</span>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
