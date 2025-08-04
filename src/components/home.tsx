import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import ExperienceTimeline from "./ExperienceTimeline";

function Home() {
  return (
    <div className="min-h-screen bg-metallic-gradient">
      <HeroSection
        name="Darren O'Donnell"
        title="Migrations Lead"
        summary="Data Migration Specialist and Team Lead for the EMEA & APAC region in Stripe, with expertise in managing large-scale user onboardings. Proven track record of cross-functional collaboration with Sales and Professional Services teams. Responsible for knowledge sharing, training, and development of both internal and public-facing migration documentation. Skilled in fostering team growth, optimizing migration processes, and enhancing user experiences across diverse global markets."
        profileImage="/src/assets/linkedin_headshot.jpeg"
      />

      <ExperienceTimeline />

      {/* Footer */}
      <footer className="bg-background py-8 px-4 text-center">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p
              className="text-lg text-muted-foreground mb-2"
              style={{ fontFamily: "Helixa Light" }}
            >
              Website designed by
            </p>
            <p
              className="text-xl text-foreground"
              style={{ fontFamily: "Callestany" }}
            >
              Darren O'Donnell
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
