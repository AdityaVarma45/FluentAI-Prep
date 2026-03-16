import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}

      <div className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
          Master English with <span className="text-blue-600">AI</span>
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mb-10">
          FluentAI Prep helps students preparing for IELTS and TOEFL improve
          grammar, vocabulary, essay writing, and sentence clarity using
          powerful AI models.
        </p>

        {/* Buttons */}

        <div className="flex gap-6">
          <Link
            to="/app"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition shadow"
          >
            Start Demo
          </Link>

          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-blue-50 transition"
          >
            Login to Save Progress
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-6 max-w-xl">
          Demo mode lets you explore AI grammar correction, vocabulary
          generation, and essay evaluation without creating an account.
        </p>
      </div>

      {/* Features */}

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful AI Learning Tools
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Feature 1 */}

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Grammar Checker</h3>

            <p className="text-gray-600 text-sm">
              Instantly fix grammar mistakes and understand the rules behind
              them.
            </p>
          </div>

          {/* Feature 2 */}

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Vocabulary Builder</h3>

            <p className="text-gray-600 text-sm">
              Discover advanced vocabulary useful for IELTS and TOEFL exams.
            </p>
          </div>

          {/* Feature 3 */}

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Essay Evaluator</h3>

            <p className="text-gray-600 text-sm">
              Get AI-generated feedback and estimated IELTS band scores.
            </p>
          </div>

          {/* Feature 4 */}

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Multi-AI Engine</h3>

            <p className="text-gray-600 text-sm">
              Uses multiple AI providers to deliver reliable responses.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="text-center text-sm text-gray-500 pb-6">
        Built with ❤️ using MERN + AI
      </div>
    </div>
  );
}
