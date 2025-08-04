import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail, Linkedin, Github, FileText, ExternalLink } from "lucide-react";

interface ContactBarProps {
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
}

const ContactBar = ({
  email = "darrenodonnell96@gmail.com",
  linkedinUrl = "https://www.linkedin.com/in/darren-o-donnell/",
  githubUrl = "https://github.com/yourusername",
  resumeUrl = "#",
}: ContactBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center h-14 sm:h-16 px-2 sm:px-4 bg-background/80 backdrop-blur-md border-t border-border">
      <div className="container flex items-center justify-between max-w-6xl">
        <div className="text-xs sm:text-sm text-muted-foreground">
          <span className="hidden sm:inline">Let's connect</span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  onClick={() => {
                    try {
                      window.location.href = `mailto:${email}`;
                    } catch (error) {
                      console.error("Error opening email client:", error);
                      // Fallback: copy email to clipboard
                      navigator.clipboard
                        ?.writeText(email)
                        .then(() => {
                          alert(`Email copied to clipboard: ${email}`);
                        })
                        .catch(() => {
                          alert(`Please email: ${email}`);
                        });
                    }
                  }}
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Email me</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  onClick={() => {
                    try {
                      window.open(linkedinUrl, "_blank", "noopener,noreferrer");
                    } catch (error) {
                      console.error("Error opening LinkedIn:", error);
                      // Fallback: try direct navigation
                      window.location.href = linkedinUrl;
                    }
                  }}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  onClick={() => {
                    try {
                      window.open(githubUrl, "_blank", "noopener,noreferrer");
                    } catch (error) {
                      console.error("Error opening GitHub:", error);
                      // Fallback: try direct navigation
                      window.location.href = githubUrl;
                    }
                  }}
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-1 sm:gap-2 h-8 sm:h-10 px-2 sm:px-3"
                  onClick={() => {
                    try {
                      if (resumeUrl === "#") {
                        // Use the actual CV file path
                        const link = document.createElement("a");
                        link.href =
                          "/src/assets/Darren_O_Donnell_CV_Jul_2025.pdf";
                        link.download = "Darren_O_Donnell_CV_Jul_2025.pdf";
                        link.target = "_blank";
                        link.rel = "noopener noreferrer";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      } else {
                        window.open(resumeUrl, "_blank", "noopener,noreferrer");
                      }
                    } catch (error) {
                      console.error("Error downloading resume:", error);
                      // Fallback: open in new tab
                      window.open(
                        "/src/assets/Darren_O_Donnell_CV_Jul_2025.pdf",
                        "_blank",
                      );
                    }
                  }}
                  aria-label="Download Resume"
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline text-xs sm:text-sm">
                    Resume
                  </span>
                  <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Resume</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;
