import { useEffect, useState } from "react";
import "./styles.css";
import Airtable from "airtable";
import Goal from "./components/Goal";

const base = new Airtable({ apiKey: "key75QzAyUyTPExoZ" }).base(
  "appjz5RfvPbhXwin5"
);

export default function App() {
  const [goals, setGoals] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    base("goals")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setGoals(records);
        fetchNextPage();
      });

    base("updates")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setUpdates(records);
        fetchNextPage();
      });
  }, []);
  return (
    <div className="App">
      <h1>My Goals</h1>
      {goals.map((goal) => (
        <Goal
          key={goal.id}
          goal={goal}
          updates={updates.filter(
            (update) => update.fields.goalsid[0] === goal.id
          )}
        />
      ))}
    </div>
  );
}
