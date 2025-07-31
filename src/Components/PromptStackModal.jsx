import { useState, useEffect } from 'react'

const PromptBlockModal = ({ editingBlock, onCreatePromptBlock, onUpdatePromptBlock, onClose }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('task')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (editingBlock) {
      setName(editingBlock.name || '')
      setType(editingBlock.type || 'task')
      setContent(editingBlock.content || '')
    } else {
      // Reset form for new block
      setName('')
      setType('task')
      setContent('')
    }
  }, [editingBlock])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return

    const blockData = {
      name: name.trim(),
      type,
      content: content.trim()
    }

    if (editingBlock) {
      onUpdatePromptBlock({ ...editingBlock, ...blockData })
    } else {
      onCreatePromptBlock(blockData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingBlock ? 'Edit Prompt Block' : 'Create Prompt Block'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Block Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Customer Service Standards, Handle Refunds"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Block Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="global">Global - Company-wide rules</option>
                  <option value="task">Task - Situation-specific guidance</option>
                </select>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Block Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  type === 'global' 
                    ? "Enter company-wide rules and standards that apply across all situations..."
                    : "Enter specific guidance for handling this type of situation..."
                }
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {type === 'global' 
                  ? "Global blocks contain universal rules that apply to all situations (e.g., 'Always be respectful', 'Follow safety protocols')"
                  : "Task blocks contain specific guidance for particular scenarios (e.g., 'For refunds, check receipt first')"
                }
              </p>
            </div>

            {/* Examples */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Example {type === 'global' ? 'Global' : 'Task'} Block:
              </h4>
              <div className="text-sm text-gray-700">
                {type === 'global' ? (
                  <div>
                    <strong>Name:</strong> Customer Service Standards<br/>
                    <strong>Content:</strong> Always greet customers warmly. Listen actively to their concerns. Never promise what you cannot deliver. Escalate complex issues to supervisors when needed.
                  </div>
                ) : (
                  <div>
                    <strong>Name:</strong> Handle Refund Requests<br/>
                    <strong>Content:</strong> For refunds: Check receipt first. If no receipt, ask for purchase details and check system. Follow company refund policy. Offer alternatives if refund not possible (exchange, store credit).
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim() || !content.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingBlock ? 'Update Block' : 'Create Block'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PromptBlockModal