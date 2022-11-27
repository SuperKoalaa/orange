import { Container, Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Amplify from "aws-amplify";
import { API } from "aws-amplify";
import awsExports from "../aws-exports";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

Amplify.configure(awsExports);

// This function used to add the data to dynamoDB through APIgatway
async function addNewPerson() {
  const data = {
    body: {
      firstname: formState.firstname,
      lastname: formState.lastname,
      message: formState.message,
    },
  };

  console.log(data);
  const apiData = await API.post("orangeAPI", "/ProductTest", data);
  console.log({ apiData });
  alert("Data Post");
}

const formState = { firstname: "", lastname: "", message: "" };

function updateFormState(key, value) {
  formState[key] = value;
}

const create_person = () => {
  return (
    <>
      <h1> POST Method - Post Data to AWS DynamoDB</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="firstname_textfield"
          label="First Name"
          variant="standard"
          onChange={(e) => updateFormState("firstname", e.target.value)}
        />
        <TextField
          id="lastname_textfield"
          label="Last Name"
          variant="standard"
          onChange={(e) => updateFormState("lastname", e.target.value)}
        />
        <TextField
          id="standard-textarea"
          label="Message"
          placeholder="Add some message"
          multiline
          variant="standard"
          onChange={(e) => updateFormState("message", e.target.value)}
        />
      </Box>
      <Button variant="outlined" onClick={addNewPerson}>
        Add New Person
      </Button>
    </>
  );
};
export default create_person;
