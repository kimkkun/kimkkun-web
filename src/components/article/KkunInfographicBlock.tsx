import KkunInfographic from "@/components/KkunInfographic";
import type { KkunCategory } from "@/components/KkunThumbnail";

interface KkunInfographicBlockProps {
  content: string;
}

interface InfographicData {
  category: KkunCategory;
  titleLines: string[];
  accentLine: string;
  sectionTitle: string;
  tableHeaders: [string, string, string];
  tableRows: string[][];
  calloutTitle: string;
  calloutSub: string;
  stepsTitle: string;
  steps: { num: string; title: string; desc: string }[];
  footerLine: string;
  footerAccent: string;
}

export default function KkunInfographicBlock({ content }: KkunInfographicBlockProps) {
  let data: InfographicData;
  try {
    data = JSON.parse(content);
  } catch {
    return (
      <div className="my-8 p-4 border border-red-500/30 rounded text-xs text-red-400">
        [infographic block: invalid JSON]
      </div>
    );
  }

  return (
    <div className="my-16 -mx-6 flex justify-center">
      <KkunInfographic {...data} />
    </div>
  );
}
