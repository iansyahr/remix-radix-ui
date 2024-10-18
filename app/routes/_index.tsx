import type { MetaFunction } from "@remix-run/node";
import { Flex, Button,Card,TextField,Box,Container,Heading, Switch} from "@radix-ui/themes";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

    // Ensure the component is mounted to avoid hydration mismatch
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) {
      return null; // Render nothing until mounted
    }

  return (
    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <Container size="1">
      <Card>
          <Flex direction="column" gap="3">
            <Heading>Log In</Heading>
            <TextField.Root placeholder="Username" type="text"/>
            <TextField.Root placeholder="Password" type="password"/>
            <Button type="submit">Log in</Button>
          </Flex>
      </Card>
      </Container>
      <Switch 
        defaultChecked={theme === 'dark'}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }} 
      />
    </Box>
	);
}
