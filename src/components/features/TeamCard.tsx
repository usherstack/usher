import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import type { TeamMember } from "@/lib/data/teamData";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-blue-500/50 transition-all duration-300 h-full">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all duration-300" />

        <div className="relative z-10">
          {/* Image Container */}
          <div className="relative mb-6 overflow-hidden rounded-xl h-52 md:h-64">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="space-y-3">
            {/* Role Badge */}
            <div className="inline-flex items-center">
              <span className="px-3 py-1 text-xs font-semibold text-blue-300 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                {member.role}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {member.name}
            </h3>

            {/* Role Full Name */}
            <p className="text-sm text-slate-400 font-medium">
              {member.roleFullName}
            </p>

            {/* Bio */}
            <p className="text-slate-300 text-sm leading-relaxed">
              {member.bio}
            </p>

            {/* Social Links */}
            {member.social && (
              <div className="flex gap-4 pt-4">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                    aria-label={member.name + "'s LinkedIn"}
                  >
                    <FaLinkedin size={20} />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                    aria-label={member.name + "'s GitHub"}
                  >
                    <FaGithub size={20} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
