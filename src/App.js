import { useEffect, useState } from "react";
import Airtable from "airtable";
import Goal from "./components/Goal";

import styled from "styled-components";
import { GlobalStyle } from "./styles/Global.style";

const base = new Airtable({ apiKey: "key75QzAyUyTPExoZ" }).base(
  "appjz5RfvPbhXwin5"
);

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 4rem;
  margin: 1rem 0;
`;

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
      <GlobalStyle />
      <StyledH1>My Goals</StyledH1>
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
