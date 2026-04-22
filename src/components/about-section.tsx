"use client";
import React from "react";
import { motion } from "motion/react";

export function AboutSection() {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Building with <span className="italic font-serif text-neutral-400">Purpose</span> & Precision.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-400 text-sm md:text-base leading-relaxed">
            <p>
              I am a passionate developer focused on creating digital experiences that are not only functional but also visually captivating. My approach combines technical excellence with a keen eye for design, ensuring every project I touch makes a meaningful impact.
            </p>
            <p>
              With expertise in modern web technologies, I specialize in building responsive, high-performance applications. I believe in the power of minimalism and clean code, striving to deliver seamless interactions that delight users.
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none z-[-1]" />
    </section>
  );
}
