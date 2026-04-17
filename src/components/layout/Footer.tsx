import { GithubIcon } from "@/components/ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          © 2025 Geonu Kim. All rights reserved.
        </p>
        <a
          href="https://github.com/caseBread"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 프로필"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <GithubIcon className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
