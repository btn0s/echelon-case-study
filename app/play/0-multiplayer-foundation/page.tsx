import { MultiplayerFoundationPlayground } from "./playground";

export const metadata = {
  title: "Play: Multiplayer Foundation",
  description: "Runnable implementation of POC 0: Multiplayer Foundation.",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-6">
      <MultiplayerFoundationPlayground />
    </div>
  );
}

