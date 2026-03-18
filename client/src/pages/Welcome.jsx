import { Link } from "react-router-dom";
import {
  FaRobot,
  FaSpellCheck,
  FaBookOpen,
  FaFileAlt,
  FaPenFancy,
  FaCompressAlt,
} from "react-icons/fa";

export default function Welcome() {
  return (
    <div className="min-h-screen pt-8 sm:pt-10">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 space-y-12 sm:space-y-16">
        {/* HERO */}
        <div className="text-center space-y-5 sm:space-y-6 pt-12 sm:pt-16">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-200 tracking-wide leading-tight">
            Master English with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-orange-400 bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
            FluentAI Prep helps students preparing for IELTS and TOEFL improve
            grammar, vocabulary, essay writing, sentence clarity, and
            summarization using powerful AI models.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
            <Link
              to="/app"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm transition text-center"
            >
              Start Demo
            </Link>

            <Link
              to="/login"
              className="glass px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm text-gray-200 hover:bg-white/10 transition border border-white/10 text-center"
            >
              <span className="text-orange-300">Login</span> to Save Progress
            </Link>
          </div>

          <p className="text-[11px] sm:text-xs text-gray-500 max-w-md mx-auto px-2">
            Demo mode lets you explore AI grammar correction, vocabulary
            generation, rewriting, and summarization without creating an
            account.
          </p>
        </div>

        {/* FEATURES */}
        <div className="space-y-8 sm:space-y-10">
          <h2 className="flex items-center justify-center gap-2 text-sm sm:text-lg text-gray-300 tracking-wide">
            <FaRobot className="text-orange-300 text-sm" />
            <span>Powerful AI Learning Tools</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="glass p-4 sm:p-5 rounded-xl space-y-2 hover:bg-white/10 transition border border-white/10 hover:border-white/20">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaSpellCheck className="text-indigo-400 text-xs" />
                Grammar Checker
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                Instantly fix grammar mistakes and understand the rules behind
                them.
              </p>
            </div>

            <div className="glass p-4 sm:p-5 rounded-xl space-y-2 hover:bg-white/10 transition border border-white/10 hover:border-white/20">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaBookOpen className="text-orange-300 text-xs" />
                Vocabulary Builder
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                Learn meanings, examples, and synonyms instantly.
              </p>
            </div>

            <div className="glass p-4 sm:p-5 rounded-xl space-y-2 hover:bg-white/10 transition border border-white/10 hover:border-white/20">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaPenFancy className="text-indigo-400 text-xs" />
                Rewrite Tool
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                Improve sentence clarity while strictly preserving original
                meaning.
              </p>
            </div>

            <div className="glass p-4 sm:p-5 rounded-xl space-y-2 hover:bg-white/10 transition border border-white/10 hover:border-white/20">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaCompressAlt className="text-orange-300 text-xs" />
                Summarizer
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                Convert long paragraphs into short, clear, and structured
                summaries instantly.
              </p>
            </div>

            <div className="glass p-4 sm:p-5 rounded-xl space-y-3 hover:bg-white/10 transition border border-white/10 hover:border-white/20 sm:col-span-2">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaFileAlt className="text-indigo-400 text-xs" />
                Essay Evaluator
              </h3>

              <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                Get a complete IELTS-style evaluation including band score,
                grammar accuracy, vocabulary strength, and coherence.
              </p>

              <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                Receive actionable suggestions to improve structure, clarity,
                and overall writing quality.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-white/10 pt-5 sm:pt-6 text-center space-y-2 px-2">
          <p className="text-xs sm:text-sm text-gray-400">
            Built for serious learners aiming for IELTS & TOEFL excellence.
          </p>

          <p className="text-[11px] sm:text-xs text-gray-500">
            Powered by Multi-AI Engine • MERN Stack • Real-time AI Feedback
          </p>

          <p className="text-[11px] sm:text-xs text-gray-600">
            © {new Date().getFullYear()} FluentAI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
