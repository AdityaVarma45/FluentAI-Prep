import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}

      <div className="flex justify-between items-center px-10 py-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">FluentAI Prep</h1>

        <div className="flex gap-4">
          <Link to="/login" className="text-blue-600">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Hero Section */}

      <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h2 className="text-5xl font-bold mb-6">Master English with AI</h2>

        <p className="text-gray-600 text-lg max-w-2xl mb-8">
          FluentAI Prep is an AI-powered learning platform designed for students
          preparing for international English exams like IELTS and TOEFL.
          Improve grammar, expand vocabulary, paraphrase sentences, and evaluate
          essays using multiple AI models.
        </p>

        {/* Buttons */}

        <div className="flex gap-6">
          <Link
            to="/app"
            className="bg-blue-600 text-white px-6 py-3 rounded text-lg"
          >
            Start Demo
          </Link>

          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded text-lg"
          >
            Login to Save Progress
          </Link>
        </div>

        {/* Demo explanation */}

        <p className="text-sm text-gray-500 mt-6 max-w-xl">
          Demo mode lets you explore AI grammar correction, vocabulary
          generation, and essay evaluation without creating an account. Login or
          register to save your learning history and bookmarks.
        </p>
      </div>

      {/* Feature Section */}

      <div className="bg-white py-16 px-10">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h4 className="font-semibold text-lg mb-2">Grammar Checker</h4>
            <p className="text-gray-600">
              Correct sentences and understand grammar rules instantly.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">Vocabulary Builder</h4>
            <p className="text-gray-600">
              Learn advanced vocabulary for IELTS and TOEFL.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">Essay Evaluation</h4>
            <p className="text-gray-600">
              Get AI estimated band scores and writing feedback.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">Multi-AI Engine</h4>
            <p className="text-gray-600">
              Powered by multiple AI providers for reliable responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
