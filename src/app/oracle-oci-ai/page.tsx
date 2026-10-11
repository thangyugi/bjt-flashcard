import { LESSONS, getCourseMeta } from "@/data/oci-ai/course";
import { GLOSSARY } from "@/data/oci-ai/glossary";
import { OciHome } from "@/components/oci-ai/OciHome";

export default function OciAiHomePage() {
  const { modules, lessons } = getCourseMeta();
  const stats = {
    lessons: LESSONS.filter((l) => l.kind === "lesson").length,
    minutes: LESSONS.reduce((s, l) => s + (l.minutes ?? 0), 0),
    questions: LESSONS.reduce((s, l) => s + (l.quiz?.length ?? 0), 0),
    terms: GLOSSARY.length,
  };
  return <OciHome modules={modules} lessons={lessons} stats={stats} />;
}
