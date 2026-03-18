import { Link } from "react-router-dom";
import {
  FaRobot,
  FaSpellCheck,
  FaBookOpen,
  FaFileAlt,
  FaLayerGroup,
} from "react-icons/fa";

export default function Welcome() {
  return (
    <div className="min-h-screen pt-10">
      <div className="max-w-5xl mx-auto w-full px-8 space-y-16">

        {/* HERO */}

        <div className="text-center space-y-6 pt-16">

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-200 tracking-wide">
            Master English with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-orange-400 bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            FluentAI Prep helps students preparing for IELTS and TOEFL improve
            grammar, vocabulary, essay writing, and sentence clarity using
            powerful AI models.
          </p>

          <div className="flex justify-center gap-4 pt-4">

            <Link
              to="/app"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm transition"
            >
              Start Demo
            </Link>

            <Link
              to="/login"
              className="glass px-6 py-3 rounded-lg text-sm text-gray-200 hover:bg-white/10 transition border border-white/10"
            >
              <span className="text-orange-300">Login</span> to Save Progress
            </Link>

          </div>

          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Demo mode lets you explore AI grammar correction, vocabulary
            generation, and essay evaluation without creating an account.
          </p>

        </div>

        {/* FEATURES */}

        <div className="space-y-10">

          <h2 className="flex items-center justify-center gap-2 text-lg text-gray-300 tracking-wide">
            <FaRobot className="text-orange-300 text-sm" />
            <span>Powerful AI Learning Tools</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="glass p-5 rounded-xl space-y-2 hover:bg-white/10 transition border border-white/10 hover:border-white/20">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaSpellCheck className="text-indigo-400 text-xs" />
                Grammar Checker
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Instantly fix grammar mistakes and understand the rules behind them.
              </p>
            </div>

            <div className="glass p-5 rounded-xl space-y-2 hover:bg-white/10 transition border border-white/10 hover:border-white/20">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaBookOpen className="text-orange-300 text-xs" />
                Vocabulary Builder
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Discover advanced vocabulary useful for IELTS and TOEFL exams.
              </p>
            </div>

            <div className="glass p-5 rounded-xl space-y-2 hover:bg-white/10 transition border border-white/10 hover:border-white/20">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaFileAlt className="text-indigo-400 text-xs" />
                Essay Evaluator
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Get AI-generated feedback and estimated IELTS band scores.
              </p>
            </div>

            <div className="glass p-5 rounded-xl space-y-2 hover:bg-white/10 transition border border-white/10 hover:border-white/20">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaLayerGroup className="text-orange-300 text-xs" />
                Multi-AI Engine
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Uses multiple AI providers to deliver reliable responses.
              </p>
            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="text-center text-xs text-gray-500 pb-6">
          Built with <span className="text-orange-300">❤️</span> using MERN + AI
        </div>

      </div>
    </div>
  );
}