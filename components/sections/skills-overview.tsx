import {
  Brain,
  Code2,
  Database,
  GitBranch,
  Handshake,
  ListChecks,
  Puzzle,
  Server,
  ShieldCheck,
  Smartphone,
  Users
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiAndroidstudio,
  SiCss,
  SiDocker,
  SiExpo,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiKotlin,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillGroups } from "@/lib/portfolio-data";

const skillIcons = {
  Frontend: Code2,
  Backend: Server,
  Mobile: Smartphone,
  "Database & Infrastructure": Database,
  Tools: GitBranch,
  "Soft Skills": Users
};

const itemIcons: Record<string, IconType | typeof Puzzle> = {
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  "Tailwind CSS": SiTailwindcss,
  Golang: SiGo,
  PHP: SiPhp,
  Laravel: SiLaravel,
  "REST API": Server,
  JWT: SiJsonwebtokens,
  Expo: SiExpo,
  "React Native": SiReact,
  Kotlin: SiKotlin,
  "Android Studio": SiAndroidstudio,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Supabase: SiSupabase,
  Firebase: SiFirebase,
  Redis: SiRedis,
  Docker: SiDocker,
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Postman: SiPostman,
  Figma: SiFigma,
  "Problem Solving": Puzzle,
  Teamwork: Users,
  Adaptability: GitBranch,
  Responsibility: ShieldCheck,
  "Attention to Detail": ListChecks
};

export function SkillsOverview() {
  return (
    <section className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Skills</p>
          <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
            Technical Stack
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Technologies and working habits used to build web, mobile, backend, and database-driven products.
          </p>
        </div>
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white/15">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold opacity-80">Product Focus</p>
              <p className="font-bold">Scalable apps, ATS, mobile, and AI workflows.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = skillIcons[group.title as keyof typeof skillIcons] ?? Code2;

          return (
            <Card className="transition-colors hover:border-primary/60" key={group.title}>
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{group.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const SkillIcon = itemIcons[item] ?? Handshake;

                  return (
                    <Badge className="gap-1.5" key={item}>
                      <SkillIcon aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                      {item}
                    </Badge>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
