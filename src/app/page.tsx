import type { Metadata } from "next";
import ClientHome from "@/components/ClientHome";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Lions of Zion',
    description: 'Cognitive influence platform for truth and security.'
  };
}

export default function Home() {
  return <ClientHome />;
}