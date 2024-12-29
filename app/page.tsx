import Hero from "./_ui/components/Hero";
import SubSection from "./_ui/components/subSectionLayout";

export default function Home() {
  return (
    <SubSection animationType="top-to-bottom" className="flex-1 flex flex-col">
      <Hero />
    </SubSection>
  );
}
