import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ResumeInfo = ({
  resumeScore,
  candidateLevel,
  recommendedField,
  recommendedSkills = [],
  recommendedCourses = [],
  onBackToUpload,
}) => {
  const [offset, setOffset] = useState(0);

  // Circular progress bar variables
  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;

  // Calculate offset safely based on resumeScore
  useEffect(() => {
    const numericScore = Number(resumeScore);

    if (isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
      // Default: empty circle if invalid score
      setOffset(circleCircumference);
      return;
    }

    const progressOffset = ((100 - numericScore) / 100) * circleCircumference;
    setOffset(progressOffset);
  }, [resumeScore, circleCircumference]);

  return (
    <motion.div
      className="p-8 bg-gradient-to-r from-blue-100 to-blue-300 rounded-xl shadow-lg transition-transform transform duration-200 ease-in-out min-w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back button */}
      <div className="flex justify-end mb-6">
        <motion.button
          onClick={onBackToUpload}
          whileHover={{ scale: 1.05, backgroundColor: '#3b82f6' }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
        >
          Upload Another Resume
        </motion.button>
      </div>

      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h3 className="text-5xl font-semibold text-gray-800 mb-4">Resume Information</h3>
      </motion.div>

      {/* Resume Score Circle */}
     {/* Resume Score Circle */}
<div className="flex flex-col justify-center items-center mb-12">
  <div className="text-lg font-medium text-gray-800 mb-2">Resume Score:</div>
  <div className="relative flex items-center justify-center">
    <svg
      className="transform rotate-270"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle
        className="text-gray-300"
        stroke="currentColor"
        strokeWidth="10"
        fill="transparent"
        r={circleRadius}
        cx="60"
        cy="60"
      />
      {/* Progress circle */}
      <circle
        className="text-blue-600 transition-all duration-700 ease-out"
        stroke="currentColor"
        strokeWidth="10"
        strokeDasharray={circleCircumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="transparent"
        r={circleRadius}
        cx="60"
        cy="60"
      />
    </svg>

    {/* Score text */}
    <span className="absolute text-4xl font-bold text-gray-800">
      {isNaN(Number(resumeScore)) ? '0%' : `${resumeScore}%`}
    </span>
  </div>
</div>

      {/* Candidate Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Candidate Level:</span>{' '}
            {candidateLevel || 'Not Available'}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Recommended Field:</span>{' '}
            {recommendedField || 'Not Available'}
          </p>
        </motion.div>

        {/* Recommended Skills */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Recommended Skills:</h4>
          <ul className="list-disc pl-6 mb-4">
            {recommendedSkills.length > 0 ? (
              recommendedSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  className="text-lg text-gray-700 mb-1 cursor-pointer"
                  whileHover={{ scale: 1.05, color: '#3b82f6' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill.trim()}
                </motion.li>
              ))
            ) : (
              <li className="text-gray-500">No skills available</li>
            )}
          </ul>
        </motion.div>
      </div>

      {/* Recommended Courses */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Recommended Courses:</h4>
        <ul className="list-disc pl-6">
          {recommendedCourses.length > 0 ? (
            recommendedCourses.map((course, index) => (
              <motion.li
                key={index}
                className="text-lg text-gray-700 mb-1 cursor-pointer"
                whileHover={{ scale: 1.05, color: '#3b82f6' }}
                whileTap={{ scale: 0.95 }}
              >
                {course.trim()}
              </motion.li>
            ))
          ) : (
            <li className="text-gray-500">No courses available</li>
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ResumeInfo;