import Container from "@mui/material/Container";
import MyTable from "./components/MyTable";
import CreatePerson from "./components/Create_Person";

function App() {
  return (
    <>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>AWS Amplify - API Gateway, DynamoDB, Lambda</h1>
        </div>

        <hr />
        <CreatePerson />

        <hr />
        <MyTable />
      </Container>
    </>
  );
}

export default App;
