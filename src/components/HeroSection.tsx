import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown, Moon, Sun } from "lucide-react";

const TypedText = () => {
  const lines = [
    "Originally from Ireland",
    "Relocated to Sydney",
    "Currently working at Stripe",
  ];

  const renderTextWithBold = (text: string) => {
    return text
      .replace(
        /(Ireland)/g,
        '<strong style="font-family: Callestany; font-size: 1.5em; font-weight: bold;">$1</strong>',
      )
      .replace(
        /(Sydney)/g,
        '<strong style="font-family: Callestany; font-size: 1.5em; font-weight: bold;">$1</strong>',
      )
      .replace(
        /(Stripe)/g,
        '<strong style="color: #635BFF; font-family: Callestany; font-size: 1.5em; font-weight: bold;">$1</strong>',
      );
  };

  return (
    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground dark:text-gray-300 leading-relaxed text-center lg:text-left space-y-4">
      {lines.map((line, index) => (
        <motion.p
          key={index}
          className="min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem]"
          style={{ fontFamily: "Helixa Light" }}
          dangerouslySetInnerHTML={{ __html: renderTextWithBold(line) }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: 1.5 + index * 0.8, // Start after hero animation, then stagger each line
          }}
        />
      ))}
    </div>
  );
};

interface HeroSectionProps {
  name?: string;
  title?: string;
  summary?: string;
  profileImage?: string;
}

const HeroSection = ({
  name = "Darren",
  title = "Migrations Lead",
  summary = "Passionate Team Lead for the EMEA & APAC region in Stripe, with expertise in managing large-scale user onboardings. Proven track record of cross-functional collaboration with Sales and Professional Services teams. Responsible for knowledge sharing, training, and development of both internal and public-facing migration documentation. Skilled in fostering team growth, optimizing migration processes, and enhancing user experiences across diverse global markets..",
  profileImage = "/src/assets/headshot.jpg",
}: HeroSectionProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is already enabled
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <section className="min-h-screen flex flex-col px-4 py-16 bg-background relative overflow-hidden">
      {/* Logo in top-left */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
        <div
          className="text-2xl md:text-4xl text-muted-foreground cursor-pointer hover:text-primary transition-colors flex items-center"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span style={{ fontFamily: "Callestany" }}>D</span>
          <span
            style={{
              fontFamily: "Brenda Harmony",
              marginLeft: "0.03em",
              marginRight: "-0.32em",
            }}
          >
            O
          </span>
          <span style={{ fontFamily: "Callestany", marginLeft: "-0.32em" }}>
            D
          </span>
        </div>
      </div>

      {/* Navigation Menu at Top */}
      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-8 pt-4 md:pt-8 pb-4 md:pb-8 px-4">
        <button
          className="text-sm md:text-lg font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          onClick={() => {
            const experienceSection =
              document.getElementById("experience-section");
            if (experienceSection) {
              const headerOffset = -400;
              const elementPosition =
                experienceSection.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }}
        >
          Experience
        </button>
        <span className="text-sm md:text-lg text-muted-foreground hidden sm:inline">
          |
        </span>
        <button
          className="text-sm md:text-lg font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          onClick={() => {
            const educationSection =
              document.getElementById("education-section");
            educationSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Education
        </button>
        <span className="text-sm md:text-lg text-muted-foreground hidden sm:inline">
          |
        </span>
        <button
          className="text-sm md:text-lg font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          onClick={() => {
            const experienceSection =
              document.getElementById("experience-section");
            if (experienceSection) {
              // Scroll to the bottom of the experience section where CV and LinkedIn are located
              const headerOffset = -200; // Negative offset to scroll past the section
              const elementPosition =
                experienceSection.getBoundingClientRect().bottom;
              const offsetPosition =
                elementPosition + window.pageYOffset + headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }}
        >
          CV
        </button>
        <span className="text-sm md:text-lg text-muted-foreground hidden sm:inline">
          |
        </span>
        <button
          className="flex items-center gap-1 md:gap-2 text-sm md:text-lg font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <Sun className="h-3 w-3 md:h-4 md:w-4" />
          ) : (
            <Moon className="h-3 w-3 md:h-4 md:w-4" />
          )}
          <span className="hidden sm:inline">
            {isDarkMode ? "Try Light Mode" : "Try Dark Mode"}
          </span>
          <span className="sm:hidden">{isDarkMode ? "Light" : "Dark"}</span>
        </button>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="container max-w-6xl mx-auto z-10 px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* Main Name - Left Side */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none flex flex-col items-center"
                style={{ color: isDarkMode ? "white" : "#333333" }}
              >
                <h1 className="mb-2 font-normal text-center">
                  <span
                    style={{
                      fontFamily: "Callestany",
                    }}
                  >
                    D
                  </span>
                  <span
                    style={{
                      fontFamily: "Helixa Light",
                    }}
                  >
                    ARREN
                  </span>
                </h1>
                <div className="w-24 sm:w-32 h-px bg-muted-foreground mb-1 mt-1"></div>
                <h1 className="font-normal text-center">
                  <span
                    style={{
                      fontFamily: "Brenda Harmony",
                      fontSize: "1.4em",
                      marginRight: "-0.1em",
                    }}
                  >
                    O'
                  </span>
                  <span
                    style={{
                      fontFamily: "Callestany",
                    }}
                  >
                    D
                  </span>
                  <span
                    style={{
                      fontFamily: "Helixa Light",
                    }}
                  >
                    ONNELL
                  </span>
                </h1>
              </div>
            </motion.div>

            {/* Vertical Line Separator */}
            <motion.div
              className="w-px h-32 sm:h-48 lg:h-64 bg-muted-foreground hidden lg:block"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 2.5, delay: 1.2 }}
            ></motion.div>

            {/* Horizontal Line Separator for mobile */}
            <motion.div
              className="h-px w-32 sm:w-48 bg-muted-foreground lg:hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 2.5, delay: 1.2 }}
            ></motion.div>

            {/* Tagline - Right Side */}
            <div className="flex flex-col items-center lg:items-start max-w-md">
              <TypedText />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Explore Indicator - Centered at Bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            const experienceSection =
              document.getElementById("experience-section");
            if (experienceSection) {
              const headerOffset = -100;
              const elementPosition =
                experienceSection.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }}
        >
          <span className="text-sm text-muted-foreground mb-2 font-medium">
            Scroll to explore
          </span>
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
