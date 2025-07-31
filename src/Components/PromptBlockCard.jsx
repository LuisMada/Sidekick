import { useState } from 'react'

const PromptBlockCard = ({ promptBlock, onEdit, onDelete, onUse }) => {
  const [userInput, setUserInput] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  // Safety check - if promptBlock is undefined, return null or a placeholder
  if (!promptBlock) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-gray-500">Loading prompt block...</div>
      </div>
    )
  }

  const handleUse = () => {
    if (!promptBlock?.id || !onUse) return
    onUse(promptBlock.id)
    generateAIResponse()
  }

  const generateAIResponse = () => {
    if (!userInput.trim() || !promptBlock) return

    // Simulate AI response based on the prompt block
    const response = `Based on the "${promptBlock.name}" guidance:

${promptBlock.content}

**For your situation:**
${userInput}

**My recommendation:**
Following the established protocols, here's how to handle this situation appropriately. This approach ensures you're acting within guidelines while effectively addressing the issue.

Would you like more specific guidance?`

    setAiResponse(response)
  }

  const getTypeColor = () => {
    if (!promptBlock?.type) return 'bg-gray-50 border-gray-200 text-gray-800'
    
    switch (promptBlock.type) {
      case 'global':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'task':
        return 'bg-green-50 border-green-200 text-green-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getTypeIcon = () => {
    if (!promptBlock?.type) return null
    
    switch (promptBlock.type) {
      case 'global':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
          </svg>
        )
      case 'task':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900">{promptBlock?.name || 'Untitled Block'}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
                {getTypeIcon()}
                <span className="ml-1 capitalize">{promptBlock?.type || 'unknown'}</span>
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{promptBlock?.content || 'No content available'}</p>
          </div>
          <div className="flex space-x-1 ml-4">
            <button
              onClick={() => onEdit && onEdit(promptBlock)}
              className="p-1 text-gray-400 hover:text-gray-600"
              disabled={!onEdit}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button
              onClick={() => onDelete && onDelete(promptBlock?.id)}
              className="p-1 text-gray-400 hover:text-red-600"
              disabled={!onDelete || !promptBlock?.id}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{promptBlock?.usageCount || 0} uses</span>
          <span>{promptBlock?.createdAt ? new Date(promptBlock.createdAt).toLocaleDateString() : ''}</span>
        </div>
      </div>

      {/* Usage Section */}
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your situation:
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Describe the situation you need guidance on..."
              rows={2}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleUse}
            disabled={!userInput.trim()}
            className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get AI Guidance
          </button>

          {/* AI Response */}
          {aiResponse && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="text-sm font-medium text-blue-900 mb-2">🤖 AI Guidance:</div>
              <div className="text-sm text-blue-800 whitespace-pre-line">{aiResponse}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PromptBlockCard