import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { redirect } from "@remix-run/node";
import { getSession, commitSession } from "~/utils/sessions";
import { Flex, Button, Card, TextField, Box, Container, Heading, Switch } from "@radix-ui/themes";
import { useTheme } from 'next-themes';

export const meta: MetaFunction = () => {
  return [
    { title: "Furina" },
    { name: "description", content: "just random note-taking apps" },
  ];
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (username === "furina" && password === "focalors") {
    const session = await getSession(request.headers.get("Cookie"));
    session.set("user", { username });

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return { errorMessage: "Username atau password salah" };
};

export default function Index() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/?index", {
      method: "POST",
      body: new URLSearchParams({ username, password }),
    });

    if (response.redirected) {
      navigate("/dashboard");
    } else {
      const result = await response.json();
      setErrorMessage(result.errorMessage);
    }
  };

  return (
    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Container size="1">
        <Card>
          <form onSubmit={handleLogin}>
            <Flex direction="column" gap="4">
              <Heading>Log In</Heading>
              <TextField.Root
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField.Root
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit">Log in</Button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </Flex>
          </form>
        </Card>
      </Container>
      <Switch
        defaultChecked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      />
    </Box>
  );
}
