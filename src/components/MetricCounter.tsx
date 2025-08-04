import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, Award, Target, BarChart3 } from "lucide-react";

interface MetricCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: string;
  delay?: number;
  company?: string;
}

const getIcon = (iconType: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    growth: TrendingUp,
    users: Users,
    performance: Zap,
    award: Award,
    target: Target,
    chart: BarChart3,
  };

  return iconMap[iconType] || BarChart3;
};

const MetricCounter = ({
  value,
  suffix = "",
  prefix = "",
  label,
  icon = "chart",
  delay = 0,
  company = "default",
}: MetricCounterProps) => {
  const IconComponent = getIcon(icon);

  const getGradientClasses = () => {
    switch (company.toLowerCase()) {
      case "stripe":
        return "bg-gradient-to-br from-stripe-light to-stripe/30 border-stripe/40 hover:border-stripe/60";
      case "pwc":
        return "bg-gradient-to-br from-pwc-light to-pwc/30 border-pwc/40 hover:border-pwc/60";
      default:
        return "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`${getGradientClasses()} rounded-lg p-4 text-center border transition-colors duration-300`}
    >
      <div className="flex items-center justify-center mb-2">
        <div className="p-2 bg-primary/10 rounded-full">
          <IconComponent className="w-5 h-5 text-primary" />
        </div>
      </div>

      <div className="text-2xl font-bold text-primary mb-1">
        {prefix}
        <CountUp
          start={0}
          end={value}
          duration={4}
          delay={delay}
          separator=","
        />
        {suffix}
      </div>

      <div className="text-xs text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
};

export default MetricCounter;
