import { useEffect, useState } from "react";
import type { MetaFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession } from "~/utils/sessions";

export const meta: MetaFunction = () => {
    return [
      { title: "Furina Dashboard" },
      { name: "description", content: "just random note-taking apps" },
    ];
  };

  export const loader = async ({ request }: { request: Request }) => {
    const session = await getSession(request.headers.get("Cookie"));
  
    if (!session.has("user")) {
      return redirect("/");
    }
  
    return null;
  };
  
  export default function Dashboard() {
    const [catImage, setCatImage] = useState("");
  
    useEffect(() => {
      fetch("https://cataas.com/cat?json=true")
        .then((response) => response.json())
        .then((data) => setCatImage(`https://cataas.com${data.url}`));
    }, []);
  
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to the Dashboard!</h1>
        {catImage ? (
          <img src={catImage} alt="Random Cat" style={{ width: "300px", height: "300px" }} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }