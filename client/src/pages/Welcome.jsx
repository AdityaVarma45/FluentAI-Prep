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
    <div className="min-h-screen pt-10">
      <div className="max-w-5xl mx-auto w-full px-8 space-y-16">
        <div className="text-center space-y-6 pt-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-200 tracking-wide">
            Master English with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-orange-400 bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            FluentAI Prep helps students preparing for IELTS and TOEFL improve
            grammar, vocabulary, essay writing, sentence clarity, and
            summarization using powerful AI models.
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
            generation, rewriting, and summarization without creating an
            account.
          </p>
        </div>

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
                Instantly fix grammar mistakes and understand the rules behind
                them.
              </p>
            </div>

            <div className="glass p-5 rounded-xl space-y-2 hover:bg-white/10 transition border border-white/10 hover:border-white/20">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaBookOpen className="text-orange-300 text-xs" />
                Vocabulary Builder
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Learn meanings, examples, and synonyms instantly.
              </p>
            </div>

            <div className="glass p-5 rounded-xl space-y-2 hover:bg-white/10 transition border border-white/10 hover:border-white/20">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaPenFancy className="text-indigo-400 text-xs" />
                Rewrite Tool
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Improve sentence clarity while strictly preserving original
                meaning.
              </p>
            </div>

            <div className="glass p-5 rounded-xl space-y-2 hover:bg-white/10 transition border border-white/10 hover:border-white/20">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaCompressAlt className="text-orange-300 text-xs" />
                Summarizer
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Convert long paragraphs into short, clear, and structured
                summaries instantly.
              </p>
            </div>

            <div className="glass p-5 rounded-xl space-y-3 hover:bg-white/10 transition border border-white/10 hover:border-white/20 md:col-span-2">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FaFileAlt className="text-indigo-400 text-xs" />
                Essay Evaluator
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed">
                Get a complete IELTS-style evaluation of your essay including
                estimated band score, grammar accuracy, vocabulary strength, and
                coherence analysis.
              </p>

              <p className="text-xs text-gray-500 leading-relaxed">
                Receive clear suggestions to improve structure, clarity, and
                overall writing quality — just like a real examiner.
              </p>
            </div>
          </div>
        </div>

        {/* PROFESSIONAL FOOTER */}

        <div className="border-t border-white/10 pt-6 text-center space-y-2">
          <p className="text-sm text-gray-400">
            Built for serious learners aiming for IELTS & TOEFL excellence.
          </p>

          <p className="text-xs text-gray-500">
            Powered by Multi-AI Engine • MERN Stack • Real-time AI Feedback
          </p>

          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} FluentAI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
