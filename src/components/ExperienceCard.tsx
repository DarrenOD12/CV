import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MetricCounter from "./MetricCounter";

interface Achievement {
  text: string;
  highlight?: boolean;
  subPoints?: string[];
  metric?: {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    icon?: string;
  };
}

interface LogoInfo {
  src: string;
  alt: string;
  company: string;
  summary: string;
}

interface ExperienceCardProps {
  company: string;
  position: string;
  duration: string;
  logo?: string;
  description: string;
  achievements: Achievement[];
  technologies?: string[];
  isVisible?: boolean;
  index?: number;
  multipleLogos?: LogoInfo[];
  isActive?: boolean;
}

const ExperienceCard = ({
  company = "Company Name",
  position = "Position Title",
  duration = "Jan 2020 - Present",
  description = "Description of your role and responsibilities at the company.",
  achievements = [
    {
      text: "Led a team of 5 developers to deliver project on time",
      highlight: true,
      metric: {
        value: 5,
        label: "Team Members",
        icon: "users",
      },
    },
    {
      text: "Increased site performance by 40%",
      metric: {
        value: 40,
        suffix: "%",
        label: "Performance Boost",
        icon: "performance",
      },
    },
    {
      text: "Implemented new features that grew user engagement by 25%",
      metric: {
        value: 25,
        suffix: "%",
        label: "Engagement Growth",
        icon: "growth",
      },
    },
  ],
  technologies = ["React", "TypeScript", "Tailwind CSS"],
  isVisible = true,
  index = 0,
  multipleLogos,
  isActive = false,
}: ExperienceCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
      },
    },
  };

  const getBorderColor = () => {
    switch (company.toLowerCase()) {
      case "stripe":
        return "border-l-stripe";
      case "pwc":
        return "border-l-pwc";
      case "boston scientific":
        return "border-l-red-600";
      case "insight centre":
        return "border-l-green-600";
      case "google":
        return "border-l-blue-500";
      default:
        return "border-l-primary";
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={cardVariants}
      className="w-full mb-12"
    >
      <div
        className={`py-8 px-0 transition-all duration-500 ${
          isActive ? "opacity-100" : "opacity-75"
        }`}
      >
        {/* Header with position, company, and duration */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                  {position}
                </h3>
                <span
                  className="text-xl sm:text-2xl md:text-3xl text-primary/80"
                  style={{ fontFamily: "Callestany" }}
                >
                  {company}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-medium text-muted-foreground">
                {company}
              </h4>
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground font-mono">
              {duration}
            </span>
          </div>
          <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
            {description}
          </p>
        </div>

        {/* Company summaries for multiple logos */}
        {multipleLogos && (
          <div className="mb-8">
            <h5 className="font-medium mb-4 text-foreground text-sm uppercase tracking-wide">
              Company Highlights
            </h5>
            <div className="space-y-4">
              {multipleLogos.map((logoInfo, i) => (
                <div
                  key={i}
                  className="pl-4 border-l border-muted-foreground/20"
                >
                  <h6 className="font-medium text-foreground mb-1">
                    {logoInfo.company}
                  </h6>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {logoInfo.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mb-8">
            <h5 className="font-medium mb-4 text-foreground text-sm uppercase tracking-wide">
              Key Achievements
            </h5>
            <ul className="space-y-3">
              {achievements.map((achievement, i) => (
                <li key={i} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">
                      {achievement.text}
                    </span>
                  </div>
                  {achievement.subPoints &&
                    achievement.subPoints.length > 0 && (
                      <ul className="ml-6 space-y-1.5">
                        {achievement.subPoints.map((subPoint, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary/70 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-foreground/90 leading-relaxed">
                              {subPoint}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>

            {/* Metrics counters placed after achievements */}
            {achievements.some((a) => a.metric) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {achievements
                  .filter((achievement) => achievement.metric)
                  .map((achievement, i) => (
                    <MetricCounter
                      key={i}
                      value={achievement.metric!.value}
                      suffix={achievement.metric!.suffix}
                      prefix={achievement.metric!.prefix}
                      label={achievement.metric!.label}
                      icon={achievement.metric!.icon}
                      delay={i * 0.3}
                      company={company}
                    />
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Technologies/Skills */}
        {technologies && technologies.length > 0 && (
          <div>
            <h5 className="font-medium mb-4 text-foreground text-sm uppercase tracking-wide">
              {company.toLowerCase() === "pwc"
                ? "Accreditations"
                : "Technologies & Skills"}
            </h5>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-muted/30 text-muted-foreground rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
