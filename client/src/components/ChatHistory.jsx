export default function ChatHistory({ history }) {
  return (
    <div className="space-y-4">
      {history.map((item, index) => (
        <div key={index}>
          <div className="bg-blue-100 p-3 rounded mb-2">
            <strong>You:</strong> {item.text}
          </div>

          <div className="bg-gray-100 p-3 rounded">
            <strong>AI ({item.provider}):</strong>
            <p className="mt-1 whitespace-pre-wrap">{item.result}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
