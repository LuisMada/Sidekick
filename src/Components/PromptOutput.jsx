import { useState } from 'react'

const PromptOutput = ({ promptStack, selectedTask, onBack }) => {
  const [showRawPrompt, setShowRawPrompt] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  // Simulate AI response based on the compiled prompt
  const generateAIResponse = () => {
    if (!userInput.trim()) return

    // This simulates what an AI would respond with based on the prompt stack
    const responses = {
      'refund': `You can say: "I understand you'd like a refund. Our policy usually requires a receipt, but I can check what options are available. May I ask when and where the item was purchased?"

This response:
• Respects the customer
• Doesn't commit outside policy  
• Starts gathering helpful info

If the customer insists, escalate to a supervisor. Would you like help wording that?`,
      
      'complaint': `Try this approach: "I'm sorry you've had this experience. Let me understand what happened so I can help make this right."

This response:
• Acknowledges their frustration
• Shows you're listening
• Focuses on solutions

Then listen actively and offer solutions within your authority. Need help with specific responses?`,
      
      'delay': `Send this message: "Hi! I'm currently on the way but traffic is slower than expected. I sincerely apologize for the delay — I'll keep you posted and do my best to get there as soon as I can."

This message:
• Takes responsibility without blaming
• Reduces emotional heat  
• Signals commitment to resolve

Want me to generate a follow-up in case they ask for a refund or complain?`,
      
      'damage': `You should mark it as "Minor packaging damage, contents unverified" and flag it for inspection.

This lets the next handler make an informed call without assuming damage or ignoring it.

Need help logging this in the system? I can walk you through it.`
    }

    // Simple keyword matching for demo
    const keywords = Object.keys(responses)
    const matchedKeyword = keywords.find(keyword => 
      userInput.toLowerCase().includes(keyword) || 
      selectedTask.name.toLowerCase().includes(keyword)
    )

    const response = responses[matchedKeyword] || `Based on your situation and our guidelines:

1. Follow the company standards: ${promptStack.global[0]?.content}
2. For this specific task: ${selectedTask.content}

This approach ensures you're acting within policy while helping resolve the situation. Need more specific guidance?`

    setAiResponse(response)
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 text-sm mb-4"
        >
          ← Back to task selection
        </button>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Guidance Ready</h2>
        <p className="text-gray-600 mb-4">
          Your prompt stack is compiled. Describe your specific situation to get personalized guidance.
        </p>
      </div>

      {/* Selected Task Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="font-medium text-green-900 mb-2">Selected Task: {selectedTask.name}</div>
        <div className="text-sm text-green-800">{selectedTask.content}</div>
      </div>

      {/* User Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe your specific situation:
        </label>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="e.g., A customer wants a refund but doesn't have the receipt and is getting upset..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generateAIResponse}
          disabled={!userInput.trim()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Get AI Guidance
        </button>
      </div>

      {/* AI Response */}
      {aiResponse && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="font-medium text-blue-900 mb-3">🤖 AI Guidance:</div>
          <div className="text-blue-800 whitespace-pre-line">{aiResponse}</div>
        </div>
      )}

      {/* Prompt Stack Debug */}
      <div className="border-t pt-6">
        <button
          onClick={() => setShowRawPrompt(!showRawPrompt)}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          {showRawPrompt ? '▼' : '▶'} Show compiled prompt stack (debug)
        </button>
        
        {showRawPrompt && (
          <div className="mt-4 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="font-medium text-blue-900 mb-2">Global Blocks ({promptStack.global.length})</div>
              {promptStack.global.map((block, i) => (
                <div key={i} className="text-sm text-blue-800 mb-2">
                  <strong>{block.name}:</strong> {block.content}
                </div>
              ))}
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-medium text-green-900 mb-2">Task Block</div>
              <div className="text-sm text-green-800">
                <strong>{promptStack.task.name}:</strong> {promptStack.task.content}
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">Compiled Prompt</div>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">{promptStack.compiled}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PromptOutput