import { useState } from 'react'

const PromptStackCard = ({ promptStack, workspace, onEdit, onDelete, onUse }) => {
  const [showFullStack, setShowFullStack] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  const handleUse = () => {
    onUse(promptStack.id)
    generateAIResponse()
  }

  const generateAIResponse = () => {
    if (!userInput.trim()) return

    // Get the combined prompt stack
    const combinedPrompt = getCombinedPrompt()
    
    const response = `Based on the combined guidance from "${promptStack.name}":

**For your situation:**
${userInput}

**Following our established protocols:**
${combinedPrompt.substring(0, 200)}...

**My recommendation:**
This approach ensures you're following both company-wide standards and situation-specific guidance. The combined protocols help you handle this appropriately while maintaining consistency with our established practices.

Would you like more specific guidance on any aspect?`

    setAiResponse(response)
  }

  const getCombinedPrompt = () => {
    const globalBlocks = promptStack.globalBlockIds?.map(id => 
      workspace.promptBlocks?.find(block => block.id === id)
    ).filter(Boolean) || []

    const taskBlocks = promptStack.taskBlockIds?.map(id => 
      workspace.promptBlocks?.find(block => block.id === id)
    ).filter(Boolean) || []

    const globalContent = globalBlocks.map(block => block.content).join('\n\n')
    const taskContent = taskBlocks.map(block => block.content).join('\n\n')

    return `${globalContent}\n\n${taskContent}`.trim()
  }

  const getStackBlocks = () => {
    const globalBlocks = promptStack.globalBlockIds?.map(id => 
      workspace.promptBlocks?.find(block => block.id === id)
    ).filter(Boolean) || []

    const taskBlocks = promptStack.taskBlockIds?.map(id => 
      workspace.promptBlocks?.find(block => block.id === id)
    ).filter(Boolean) || []

    return { globalBlocks, taskBlocks }
  }

  const { globalBlocks, taskBlocks } = getStackBlocks()
  const primaryTaskBlock = taskBlocks[0] // Show the first task block as primary

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900">{promptStack.name}</h3>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-50 border-purple-200 text-purple-800">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
                Stack
              </span>
            </div>
            {primaryTaskBlock && (
              <p className="text-sm text-gray-600 line-clamp-2">{primaryTaskBlock.content}</p>
            )}
          </div>
          <div className="flex space-x-1 ml-4">
            <button
              onClick={() => onEdit(promptStack)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button
              onClick={() => onDelete(promptStack.id)}
              className="p-1 text-gray-400 hover:text-red-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{globalBlocks.length} global blocks</span>
            <span>{taskBlocks.length} task blocks</span>
            <span>{promptStack.usageCount} uses</span>
          </div>
          <button
            onClick={() => setShowFullStack(!showFullStack)}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            {showFullStack ? 'Hide Full Stack' : 'Show Full Stack'}
          </button>
        </div>
      </div>

      {/* Full Stack Details */}
      {showFullStack && (
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="space-y-4">
            {/* Global Blocks */}
            {globalBlocks.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Global Blocks</h4>
                <div className="space-y-2">
                  {globalBlocks.map((block) => (
                    <div key={block.id} className="text-xs bg-blue-50 text-blue-800 p-2 rounded">
                      <strong>{block.name}:</strong> {block.content}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Task Blocks */}
            {taskBlocks.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Task Blocks</h4>
                <div className="space-y-2">
                  {taskBlocks.map((block) => (
                    <div key={block.id} className="text-xs bg-green-50 text-green-800 p-2 rounded">
                      <strong>{block.name}:</strong> {block.content}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Combined Prompt */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Combined Prompt</h4>
              <div className="text-xs bg-gray-100 p-3 rounded border">
                <pre className="whitespace-pre-wrap font-mono">{getCombinedPrompt()}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

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
            className="w-full px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get AI Guidance (Full Stack)
          </button>

          {/* AI Response */}
          {aiResponse && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <div className="text-sm font-medium text-green-900 mb-2">🤖 AI Guidance (Combined Stack):</div>
              <div className="text-sm text-green-800 whitespace-pre-line">{aiResponse}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PromptStackCard