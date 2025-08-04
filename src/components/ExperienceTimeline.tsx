import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import ExperienceCard from "./ExperienceCard";

interface Achievement {
  text: string;
  highlight?: boolean;
  subPoints?: string[];
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  logo: string;
  description: string;
  achievements: Array<Achievement>;
  technologies: string[];
}

interface Education {
  institution: string;
  degree: string;
  duration: string;
  grade?: string;
  achievements: string[];
  description?: string;
}

interface ExperienceTimelineProps {
  experiences?: Experience[];
  education?: Education[];
}

const ExperienceTimeline = ({
  experiences = [
    {
      company: "Stripe",
      position: "EMEA and APAC Migrations Lead",
      duration: "July 2021 - Present",
      logo: "/src/assets/stripe_logo.png",
      description:
        "Leading onboarding through customer and payment migrations while scaling operations across EMEA & APAC regions.",
      achievements: [
        {
          text: "Successfully launched multiple regional payment methods and migration product initiatives such as UK Bacs, SEPA and AU BECS driving substantial year-over-year growth",
        },
        {
          text: "Built and scaled specialised operations team increasing operational capacity 10x within first two years",
          subPoints: [
            "Developed and implemented strategic growth plans for the region and created resource allocation and headcount projections for long-term scalability which led to an increase in case management capacity from 5% to 50% global case management within two years",
            "Recognized as Stripe Mentor of the Quarter",
            "Multiple team members earned excellence awards in region",
          ],
        },
        {
          text: "Led hundreds of client workshops across diverse industries and segments, creating tailored payment infrastructure migration solutions to meet unique business requirements and timelines",
        },
        {
          text: "Identified critical payment and onboarding vulnerability in network policy changes, led cross-functional initiative with internal stakeholders and payment network partners to implement solution protecting 5M+ cards from processing failures while adapting to evolving payment network policies",
        },
        {
          text: "Developed and published customer-facing Stripe documentation while ranking in top 0.5% of internal knowledge contributors based on document creation volume; delivered high-impact educational presentations across Sales, Professional Services, and Solution Engineering teams to strengthen cross-functional expertise",
        },
      ],
      technologies: [],
    },
    {
      company: "PwC",
      position: "Technology Consulting",
      duration: "September 2018 - May 2021",
      logo: "/src/assets/pwc_logo.png",
      description:
        "Developed cloud-based solutions and collaborated with cross-functional teams.",
      achievements: [
        {
          text: "Data Migration and UAT Lead for a public sector client, implementing a demand management system, demonstrating expertise in large-scale data transitions and user acceptance testing.",
        },
        {
          text: "Test Management Lead on a large-scale FinTech project for an international airline, showcasing ability to manage complex testing processes in the financial technology sector.",
        },
        {
          text: "Lead Data Analyst on a cyber security engagement for a building materials business, applying analytical skills to enhance security measures.",
        },
        {
          text: "Business Analyst for a new regulatory reporting system implementation at a commercial bank, combining financial sector knowledge with regulatory compliance expertise.",
        },
        {
          text: "Diverse industry experience working with both private and public sector clients, providing a broad perspective on various business challenges and solutions.",
        },
      ],
      technologies: [
        "Professional Scrum Master - scrum.org",
        "AlteryX Core Designer Certification",
        "PRINCE2 and Scrum Master Certified",
        "DCAM (Data Capability Assessment Model) Certified",
        "ITIL Foundation Certification",
      ],
    },
    {
      company: "Boston Scientific",
      position: "Business Analyst",
      duration: "2017",
      logo: "/src/assets/Boston_Scientific_Logo.png",
      description:
        "Enhanced reporting structures through SAP automation and VBA coding",
      achievements: [],
      technologies: [],
    },
    {
      company: "Insight Centre",
      position: "Research Assistant",
      duration: "2016",
      logo: "/src/assets/insight_logo.png",
      description:
        "Co-created D3 visualization web app and developed company website sections",
      achievements: [],
      technologies: [],
    },
    {
      company: "Google",
      position: "Internship",
      duration: "2013",
      logo: "/src/assets/google_logo.png",
      description:
        "Selected from 500 applicants for competitive internship program at European headquarters",
      achievements: [],
      technologies: [],
    },
  ],
  education = [
    {
      institution: "National University of Ireland, Galway",
      degree: "Business Information Systems",
      duration: "2014 - 2018",
      grade: "Degree Average: 1.1 (1st Class Honours)",
      achievements: [
        "Received University Scholarship for academic performance 2014/2015",
        "Selected as a Placement Ambassador for second year Business Information System students while in my final year of college. This was a paid employment.",
        "Employee of Blackstone Launchpad from 2016 -2018. Blackstone Launchpad is a campus based entrepreneurial programme set up to bring support to aspiring entrepreneurs.",
        "This programme is fully accredited by EPAS. EPAS accreditation is by the European Foundation for Management Development and confers that the BSc. BIS meets the highest international standards for management education.",
      ],
    },
    {
      institution: "University of Maryland Baltimore County",
      degree: "Business Information Systems - Erasmus Programme",
      duration: "2016 - 2016",
      description:
        "NUI Galway provides a number of opportunities for students to engage in a study abroad experience.",
      achievements: [],
    },
  ],
}: ExperienceTimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<
    "experience" | "education"
  >("experience");
  const [expandedExperience, setExpandedExperience] = useState<Set<number>>(
    new Set([0]), // Stripe card (index 0) open by default
  );
  const [expandedEducation, setExpandedEducation] = useState<number | null>(
    0, // NUIG card (index 0) open by default
  );

  // Create refs for each experience card and education card
  const experienceRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const educationRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Scroll progress for the timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  // Transform scroll progress to timeline height - match the circle position
  const timelineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "calc(100% - 8px)"],
  );

  // Create separate controls for each experience and education item
  const experienceControls = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
  ];

  const educationControls = [useAnimation(), useAnimation()];

  // Track which card is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const centerY = scrollY + windowHeight / 2;

      // Check experience cards
      experienceRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const cardTop = scrollY + rect.top;
          const cardBottom = cardTop + rect.height;

          if (centerY >= cardTop && centerY <= cardBottom) {
            setActiveIndex(index);
            setActiveSection("experience");
          }
        }
      });

      // Check education cards
      educationRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const cardTop = scrollY + rect.top;
          const cardBottom = cardTop + rect.height;

          if (centerY >= cardTop && centerY <= cardBottom) {
            setActiveIndex(index);
            setActiveSection("education");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Start animations with slight delays between them
  useEffect(() => {
    // Experience items
    experienceControls[0].start("visible");
    setTimeout(() => {
      experienceControls[1].start("visible");
    }, 150);
    setTimeout(() => {
      experienceControls[2].start("visible");
    }, 300);
    setTimeout(() => {
      experienceControls[3].start("visible");
    }, 450);
    setTimeout(() => {
      experienceControls[4].start("visible");
    }, 600);

    // Education items
    setTimeout(() => {
      educationControls[0].start("visible");
    }, 750);
    setTimeout(() => {
      educationControls[1].start("visible");
    }, 900);
  }, [experienceControls, educationControls]);

  // Get color based on active card and section - lighter in dark mode
  const getActiveColor = () => {
    return "#1c4275";
  };

  // Get timeline color for dark mode visibility
  const getTimelineColor = () => {
    return "rgb(229 231 235)"; // Light gray for dark mode visibility
  };

  // Shared animation variant
  const itemVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section
      id="experience-section"
      className="py-20 px-4 bg-background relative overflow-hidden"
    >
      {/* Parallax background elements - only in light mode */}
      <motion.div
        className="absolute inset-0 opacity-5 dark:hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #e2ddf8 0%, transparent 50%), radial-gradient(circle at 75% 75%, #f8eddd 0%, transparent 50%)",
          backgroundSize: "400px 400px",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Key Achievements
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Key achievements and milestones throughout my career
          </p>
        </motion.div>

        {/* Key Achievements Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="space-y-6 mb-8">
            <motion.div
              className="p-6 bg-muted/20 rounded-lg border border-muted/30 cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <img
                  src="/product.png"
                  alt="Product icon"
                  className="w-8 h-8 object-contain mt-1.5 flex-shrink-0 dark:filter dark:brightness-0 dark:invert"
                />
                <div className="flex-1">
                  <motion.div
                    className="font-medium text-foreground text-sm mb-2"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0.8 }}
                  >
                    Strategic Product Launches
                  </motion.div>
                  <motion.div
                    className="text-sm text-foreground leading-relaxed"
                    initial={{ height: "auto", opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Spearheaded mission-critical payment programs with global
                    impact, driving YOY growth through strategic migration
                    product launches including UK Bacs, AU BECS and SEPA across
                    multiple markets
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-6 bg-muted/20 rounded-lg border border-muted/30 cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <img
                  src="/src/assets/program.png"
                  alt="Program icon"
                  className="w-8 h-8 object-contain mt-1.5 flex-shrink-0 dark:filter dark:brightness-0 dark:invert"
                />
                <div className="flex-1">
                  <motion.div
                    className="font-medium text-foreground text-sm mb-2"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0.8 }}
                  >
                    Program Management and Team Building
                  </motion.div>
                  <motion.div
                    className="text-sm text-foreground leading-relaxed"
                    initial={{ height: "auto", opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Led cross-functional programs scaling operational capacity
                    10x (5% to 50% migration volume) through strategic
                    leadership, mentorship, and systematic resource optimization
                    across global markets
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-6 bg-muted/20 rounded-lg border border-muted/30 cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <img
                  src="/src/assets/client.png"
                  alt="Client icon"
                  className="w-8 h-8 object-contain mt-1.5 flex-shrink-0 dark:filter dark:brightness-0 dark:invert"
                />
                <div className="flex-1">
                  <motion.div
                    className="font-medium text-foreground text-sm mb-2"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0.8 }}
                  >
                    Client Engagement & Solution Design
                  </motion.div>
                  <motion.div
                    className="text-sm text-foreground leading-relaxed"
                    initial={{ height: "auto", opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Orchestrated enterprise-level migration and go-live
                    initiatives through consultative client workshops, aligning
                    complex technical solutions with diverse business
                    requirements
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-6 bg-muted/20 rounded-lg border border-muted/30 cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <img
                  src="/src/assets/knowledge.png"
                  alt="Knowledge icon"
                  className="w-8 h-8 object-contain mt-1.5 flex-shrink-0 dark:filter dark:brightness-0 dark:invert"
                />
                <div className="flex-1">
                  <motion.div
                    className="font-medium text-foreground text-sm mb-2"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0.8 }}
                  >
                    Knowledge Leadership & Documentation
                  </motion.div>
                  <motion.div
                    className="text-sm text-foreground leading-relaxed"
                    initial={{ height: "auto", opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Established reputation as knowledge leader, developing
                    comprehensive documentation frameworks that enhanced
                    cross-functional performance and client success
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Experience
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Leading programs and initiatives across diverse industries and
            global markets
          </p>
        </motion.div>

        <div className="relative z-10" ref={timelineRef}>
          {/* Timeline line - static background */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border dark:bg-gray-200" />

          {/* Dynamic timeline progress line */}
          <motion.div
            className="absolute left-4 sm:left-6 md:left-8 top-0 w-0.5 origin-top bg-[#1c4275] dark:bg-gray-200"
            style={{
              height: timelineHeight,
            }}
          />

          {/* Moving circle */}
          <motion.div
            className="absolute left-4 sm:left-6 md:left-8 transform -translate-x-1/2 z-20 w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-lg bg-[#1c4275] dark:bg-gray-200"
            style={{
              top: useTransform(scrollYProgress, [0, 1], ["0px", "100%"]),
            }}
          />

          {/* Click to expand label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-8 pl-12 sm:pl-16 md:pl-20"
          >
            <p className="text-sm text-muted-foreground italic">
              Click cards to expand details
            </p>
          </motion.div>

          {/* Experience Pane Boxes */}
          {experiences.map((experience, index) => (
            <div
              key={`experience-${index}`}
              className="relative flex items-start mb-12"
              ref={experienceRefs[index]}
            >
              {/* Experience pane */}
              <motion.div
                initial="hidden"
                animate={experienceControls[index]}
                variants={itemVariant}
                className="w-full pl-12 sm:pl-16 md:pl-20"
              >
                <div
                  className={`bg-muted/10 border border-muted/10 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:bg-muted/20 ${
                    activeSection === "experience" && activeIndex === index
                      ? "ring-2 ring-primary/20"
                      : ""
                  }`}
                  onClick={() => {
                    setExpandedExperience((prev) => {
                      const newSet = new Set(prev);
                      if (newSet.has(index)) {
                        newSet.delete(index);
                        return newSet;
                      } else {
                        newSet.add(index);
                        return newSet;
                      }
                    });
                  }}
                >
                  {/* Preview Header - only show when not expanded */}
                  {!expandedExperience.has(index) && (
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground">
                              {experience.position}
                            </h3>
                            <span
                              className="text-xl sm:text-2xl text-primary/80"
                              style={{ fontFamily: "Callestany" }}
                            >
                              {experience.company}
                            </span>
                          </div>
                          <div className="mb-3">
                            <span className="text-base sm:text-lg font-medium text-muted-foreground">
                              {experience.company}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <span className="text-sm text-muted-foreground font-mono">
                              {experience.duration}
                            </span>
                            <p className="text-sm text-foreground/70 line-clamp-2 sm:max-w-md">
                              {experience.description}
                            </p>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Header when expanded */}
                  {expandedExperience.has(index) && (
                    <div className="p-4 sm:p-6 border-b border-muted/10">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          {/* Empty div to maintain layout */}
                        </div>
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  )}

                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedExperience.has(index) ? "auto" : 0,
                      opacity: expandedExperience.has(index) ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <ExperienceCard
                        {...experience}
                        isVisible={true}
                        index={index}
                        isActive={
                          activeSection === "experience" &&
                          activeIndex === index
                        }
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}

          {/* Education Section Header */}
          <motion.div
            id="education-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-12 pl-12 sm:pl-16 md:pl-20 px-4 mt-20 sm:mt-24 md:mt-32"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              Education
            </h3>
            <p className="text-muted-foreground">
              Academic foundation in business and technology
            </p>
          </motion.div>

          {/* Education Cards */}
          {education.map((edu, index) => (
            <div
              key={`education-${index}`}
              className="relative flex items-start mb-4"
              ref={educationRefs[index]}
            >
              {/* Education pane */}
              <motion.div
                initial="hidden"
                animate={educationControls[index]}
                variants={itemVariant}
                className="w-full pl-12 sm:pl-16 md:pl-20"
              >
                <div
                  className={`bg-muted/10 border border-muted/5 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:bg-muted/20 ${
                    activeSection === "education" && activeIndex === index
                      ? "ring-2 ring-primary/20"
                      : ""
                  }`}
                  onClick={() => {
                    setExpandedEducation(
                      expandedEducation === index ? null : index,
                    );
                  }}
                >
                  {/* Preview Header - only show when not expanded */}
                  {expandedEducation !== index && (
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground">
                              {edu.degree}
                            </h3>
                            {edu.institution ===
                              "National University of Ireland, Galway" && (
                              <span
                                className="text-sm sm:text-base md:text-lg text-primary/80"
                                style={{ fontFamily: "Callestany" }}
                              >
                                NUIG
                              </span>
                            )}
                            {edu.institution ===
                              "University of Maryland Baltimore County" && (
                              <span
                                className="text-sm sm:text-base md:text-lg text-primary/80"
                                style={{ fontFamily: "Callestany" }}
                              >
                                UMBC
                              </span>
                            )}
                          </div>
                          <div className="mb-3">
                            <span className="text-base sm:text-lg font-medium text-muted-foreground">
                              {edu.institution}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <span className="text-sm text-muted-foreground font-mono">
                              {edu.duration}
                            </span>
                            {edu.description && (
                              <p className="text-sm text-foreground/70 line-clamp-2 sm:max-w-md">
                                {edu.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Header when expanded */}
                  {expandedEducation === index && (
                    <div className="p-4 sm:p-6 border-b border-muted/5">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          {/* Empty div to maintain layout */}
                        </div>
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  )}

                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedEducation === index ? "auto" : 0,
                      opacity: expandedEducation === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      {/* Header with degree, institution, and duration */}
                      <div className="mb-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-tight">
                                {edu.degree}
                              </h3>
                              {edu.institution ===
                                "National University of Ireland, Galway" && (
                                <span
                                  className="text-base sm:text-lg md:text-xl text-primary/80"
                                  style={{ fontFamily: "Callestany" }}
                                >
                                  NUIG
                                </span>
                              )}
                              {edu.institution ===
                                "University of Maryland Baltimore County" && (
                                <span
                                  className="text-base sm:text-lg md:text-xl text-primary/80"
                                  style={{ fontFamily: "Callestany" }}
                                >
                                  UMBC
                                </span>
                              )}
                            </div>
                            <h4 className="text-base sm:text-lg font-medium text-muted-foreground">
                              {edu.institution}
                            </h4>
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground font-mono">
                            {edu.duration}
                          </span>
                        </div>
                        {edu.grade && (
                          <p className="text-sm font-medium text-foreground/80 mb-3">
                            {edu.grade}
                          </p>
                        )}
                        {edu.description && (
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {edu.description}
                          </p>
                        )}
                      </div>

                      {/* Achievements */}
                      {edu.achievements.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-4 text-foreground text-sm uppercase tracking-wide">
                            Achievements
                          </h5>
                          <ul className="space-y-3">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i} className="space-y-2">
                                <div className="flex items-start gap-3">
                                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-sm text-foreground leading-relaxed">
                                    {achievement}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* CV and LinkedIn Images Section - Rebuilt from scratch */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col sm:flex-row justify-center items-center gap-20 sm:gap-28 lg:gap-40 mt-16 sm:mt-20 lg:mt-24"
        >
          {/* CV Download Section */}
          <div className="flex flex-col items-center group">
            <a
              href="/Darren_O_Donnell_CV_Jul_2025.pdf"
              download="Darren_O_Donnell_CV_Jul_2025.pdf"
              className="cursor-pointer transition-transform duration-300 group-hover:scale-105 mb-4"
            >
              <img
                src="/CV_3D_dropshadow.png"
                alt="CV Download"
                className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] object-cover object-center"
                style={{ objectPosition: "center" }}
              />
            </a>
            <a
              href="/Darren_O_Donnell_CV_Jul_2025.pdf"
              download="Darren_O_Donnell_CV_Jul_2025.pdf"
              className="text-base sm:text-lg font-medium text-foreground cursor-pointer hover:text-primary transition-colors duration-200"
            >
              Download CV
            </a>
          </div>

          {/* LinkedIn Section */}
          <div className="flex flex-col items-center group">
            <a
              href="https://www.linkedin.com/in/darren-o-donnell/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer transition-transform duration-300 group-hover:scale-105 mb-4"
            >
              <img
                src="/linked_website_shadow.png"
                alt="LinkedIn Profile"
                className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] object-contain"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/darren-o-donnell/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg font-medium text-foreground cursor-pointer hover:text-primary transition-colors duration-200"
            >
              View LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
