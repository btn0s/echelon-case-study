interface AnchorProps {
  id: string;
}

export function Anchor({ id }: AnchorProps) {
  return <a id={id} className="relative -top-12" />;
}
