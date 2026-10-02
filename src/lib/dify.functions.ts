import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const askDify = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ query: z.string().trim().min(1).max(1000) }).parse(d))
  .handler(async ({ data }) => {
    const key = process.env["DIFY_API_KEY"] ?? "app-X2YxY1LmzaotAoNZHmkylj6p";
    try {
      const res = await fetch("https://api.dify.ai/v1/chat-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ 
          query: data.query, 
          response_mode: "blocking", 
          user: "etudiant-solusen-" + Date.now(),
          inputs: {}
        }),
      });
      if (!res.ok) {
        console.error("Dify error", res.status, await res.text());
        return { answer: "", error: "L'agent est momentanément indisponible. Réessayez dans un instant." };
      }
      const json = (await res.json()) as { answer?: string };
      const answer = json.answer ?? "";
      return { answer, error: null as string | null };
    } catch (e) {
      console.error(e);
      return { answer: "", error: "Impossible de joindre l'agent. Vérifiez votre connexion." };
    }
  });
