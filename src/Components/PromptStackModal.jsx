import { useState, useEffect } from 'react'

const PromptStackModal = ({ workspace, editingStack, onCreatePromptStack, onUpdatePromptStack, onClose }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedGlobalBlocks, setSelectedGlobalBlocks] = useState([])
  const [selectedTaskBlocks, setSelectedTaskBlocks] = useState([])

  useEffect(() => {
    if (editingStack) {
      setName(editingStack.name || '')
      setDescription(editingStack.description || '')
      setSelectedGlobalBlocks(editingStack.globalBlockIds || [])
      setSelectedTaskBlocks(editingStack.taskBlockIds || [])
    }
  }, [editingStack])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || (selectedGlobalBlocks.length === 0 && selectedTaskBlocks.length === 0)) return

    const stackData = {
      name,
      description,
      globalBlockIds: selectedGlobalBlocks,
      taskBlockIds: selectedTaskBlocks
    }

    if (editingStack) {
      onUpdatePromptStack({ ...editingStack, ...stackData })
    } else {
      onCreatePromptStack(stackData)
    }
  }

  const toggleGlobalBlock = (blockId) => {
    setSelectedGlobalBlocks(prev =>
      prev.includes(blockId)
        ? prev.filter(id => id !== blockId)
        : [...prev, blockId]
    )
  }

  const toggleTaskBlock = (blockId) => {
    setSelectedTaskBlocks(prev =>
      prev.includes(blockId)
        ? prev.filter(id => id !== blockId)
        : [...prev, blockId]
    )
  }

  const globalBlocks = workspace?.promptBlocks?.filter(block => block.type === 'global') || []
  const taskBlocks = workspace?.promptBlocks?.filter(block => block.type === 'task') || []

  const getPreviewPrompt = () => {
    const selectedGlobals = globalBlocks.filter(block => selectedGlobalBlocks.includes(block.id))
    const selectedTasks = taskBlocks.filter(block => selectedTaskBlocks.includes(block.id))
    
    const globalContent = selectedGlobals.map(block => block.content).join('\n\n')
    const taskContent = selectedTasks.map(block => block.content).join('\n\n')
    
    return `${globalContent}${globalContent && taskContent ? '\n\n' : ''}${taskContent}`.trim()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-90vh overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingStack ? 'Edit Prompt Stack' : 'Create Prompt Stack'}
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
                  Stack Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Customer Refund Handler, Complaint Resolution"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="When to use this stack"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Global Blocks Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Select Global Blocks ({selectedGlobalBlocks.length})
                </h3>
                {globalBlocks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No global blocks available.</p>
                    <p className="text-sm">Create some global blocks first.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {globalBlocks.map((block) => (
                      <label
                        key={block.id}
                        className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedGlobalBlocks.includes(block.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedGlobalBlocks.includes(block.id)}
                          onChange={() => toggleGlobalBlock(block.id)}
                          className="h-4 w-4 text-blue-600 mt-1"
                        />
                        <div className="ml-3 flex-1">
                          <div className="font-medium text-gray-900">{block.name}</div>
                          <div className="text-sm text-gray-600 line-clamp-2">{block.content}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Task Blocks Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Select Task Blocks ({selectedTaskBlocks.length})
                </h3>
                {taskBlocks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No task blocks available.</p>
                    <p className="text-sm">Create some task blocks first.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {taskBlocks.map((block) => (
                      <label
                        key={block.id}
                        className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTaskBlocks.includes(block.id)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTaskBlocks.includes(block.id)}
                          onChange={() => toggleTaskBlock(block.id)}
                          className="h-4 w-4 text-green-600 mt-1"
                        />
                        <div className="ml-3 flex-1">
                          <div className="font-medium text-gray-900">{block.name}</div>
                          <div className="text-sm text-gray-600 line-clamp-2">{block.content}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Preview */}
            {(selectedGlobalBlocks.length > 0 || selectedTaskBlocks.length > 0) && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Combined Prompt Preview</h3>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono max-h-32 overflow-y-auto">
                    {getPreviewPrompt() || 'Select blocks to see preview...'}
                  </pre>
                </div>
              </div>
            )}

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
                disabled={!name || (selectedGlobalBlocks.length === 0 && selectedTaskBlocks.length === 0)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingStack ? 'Update Stack' : 'Create Stack'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PromptStackModal