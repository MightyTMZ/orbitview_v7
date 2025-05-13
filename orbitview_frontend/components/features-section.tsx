"use client";

import { motion } from "framer-motion";
import {
  Search,
  Trophy,
  BookOpen,
  TrendingUp,
  Users,
  Target,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

const painPoints = [
  {
    title: "The Resume Paradox",
    description:
      "100+ versions saved, still wondering which one works. “Founding a startup” shouldn’t be reduced to “Managed 3-person team.”",
  },

  {
    title: "The Hidden Work",
    description:
      "Side projects, leadership roles, late-night coding sessions – too many achievements get lost in translation.",
  },
  {
    title: `"That feeling again..."`,
    description:
      "“Can I even put this on my resume?” and talking yourself out of doing what they love.",
  },
  {
    title: "The Opportunity Gap",
    description:
      "Amazing opportunities exist, but finding the right ones feels like searching for a needle in a haystack.",
  },
  {
    title: "Recruiters are guessing instead of connecting",
    description:
      "Even recruiters are tired — of scanning buzzword-filled resumes, guessing who candidates really are, and spending HOURS in interviews just to uncover the context that should’ve been obvious from the start.",
  },
  {
    title: "Endless interviews just to explain what your work already proves",
    description: `Opportunity (e.g. job) seekers spend HOURS in interviews trying to explain what they've done — 
      answering vague questions like 'Tell me about yourself' or 'Walk me through your resume.' 
      It’s exhausting, especially when all of it could’ve been automated and shown clearly from the start.
      `,
  },
];

const solutions = [
  {
    icon: Target,
    title: "Story Building",
    description: `Transform your experiences into 
    compelling narratives using the power of AI
     that showcase your true 
    potential, not just bullet points. Own your 
    full story, not shrink it`,
  },
  {
    icon: Trophy,
    title: "Growth Portfolio",
    description: `Build a dynamic showcase of your
     journey – every project, every achievement, 
     every learning moment matters. Whether you’re 
     applying to your first internship, pitching 
     your startup, or preparing for grad school — 
     OrbitView helps you take control of the journey.
     `,
  },
  {
    icon: Rocket,
    title: "Opportunity Matching",
    description: `Your unique aspirations will be 
    connected with opportunities and content that 
    align with them. 
     `,
  },
  /*{
    icon: Users,
    title: "Community of Builders",
    description: "Connect with others who understand that a career is more than a list of jobs – it's a story of growth."
  }*/
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="why-we-exist">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-500/5 to-cyan-500/5" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Our Upcoming Product: <span className="font-thin">OrbitView</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Because too many brilliant careers are hidden behind generic
              resumes and missed opportunities.
            </p>
          </motion.div>

          <div className="space-y-12">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border"
              >
                <h3 className="text-2xl font-semibold mb-3">{point.title}</h3>
                <p className="text-lg text-muted-foreground">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Here's How We're Changing That
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative p-6 bg-card/80 backdrop-blur-sm rounded-lg border hover:border-transparent transition-colors duration-300">
                <solution.icon className="h-12 w-12 mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-muted-foreground">{solution.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-muted-foreground mb-8">
            Ready to build a career story that reflects who you really are?
          </p>
          <Link href={ROUTES.REGISTER}>
            <Button
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
