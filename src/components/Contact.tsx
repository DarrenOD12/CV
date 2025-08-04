import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowLeft, ExternalLink, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <motion.div
        className="fixed top-8 left-8 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </motion.div>

      {/* Main content */}
      <div className="container max-w-4xl mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Connect
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to discuss opportunities or collaborate on something exciting?
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          {/* LinkedIn */}
          <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => window.open("https://linkedin.com", "_blank")}
          >
            <div className="relative overflow-hidden rounded-2xl bg-card p-8 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <img
                    src="/src/assets/linked_website_shadow.png"
                    alt="LinkedIn Profile"
                    className="w-64 h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    LinkedIn
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Connect professionally
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[#0077b5] text-sm font-medium">
                    <span>View Profile</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CV Download */}
          <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => {
              console.log("Download CV clicked");
            }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-card p-8 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <img
                    src="/src/assets/CV 3D dropshadow.png"
                    alt="Download CV"
                    className="w-64 h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    Resume
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Download complete CV
                  </p>
                  <div className="flex items-center justify-center gap-2 text-primary text-sm font-medium">
                    <span>Download PDF</span>
                    <Download className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom text */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-muted-foreground text-sm">
            Always open to interesting conversations and new opportunities
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
