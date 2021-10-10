import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import APIClient from "../../utils/APIClient";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      await APIClient.login({ email, password });
      toast.success("Login successfully");

      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="App">
      <Container>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="Password"
          type="password"
          variant="standard"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Container>
    </div>
  );
}
