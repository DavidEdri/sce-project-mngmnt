import React from "react";
import Loading from "../common/Loading";
import { useFetch } from "../../utils/hooks";

export default function Reports() {
  const { loading, data: reports } = useFetch("/managers/reports");

  if (loading) return <Loading />;

  return (
    <div>
      {reports.map((r, i) => (
        <div key={i}> {r.message}</div>
      ))}
    </div>
  );
}
