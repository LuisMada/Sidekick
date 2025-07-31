import { useState } from 'react'
import PromptBlockCard from './PromptBlockCard'
import PromptStackCard from './PromptStackCard'
import PromptBlockModal from './PromptBlockModal'
import PromptStackModal from './PromptStackModal'

const Dashboard = ({ workspace, onUpdateWorkspace }) => {
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [showStackModal, setShowStackModal] = useState(false)
  const [editingBlock, setEditingBlock] = useState(null)
  const [editingStack, setEditingStack] = useState(null)
  const [activeTab, setActiveTab] = useState('blocks')

  const handleCreatePromptBlock = (blockData) => {
    if (!workspace) return

    const newBlock = {
      ...blockData,
      id: `block-${Date.now()}`,
      createdAt: new Date().toISOString(),
      usageCount: 0
    }

    const updatedWorkspace = {
      ...workspace,
      promptBlocks: [...(workspace.promptBlocks || []), newBlock]
    }

    onUpdateWorkspace(updatedWorkspace)
    setShowBlockModal(false)
  }

  const handleCreatePromptStack = (stackData) => {
    if (!workspace) return

    const newStack = {
      ...stackData,
      id: `stack-${Date.now()}`,
      createdAt: new Date().toISOString(),
      usageCount: 0
    }

    const updatedWorkspace = {
      ...workspace,
      promptStacks: [...(workspace.promptStacks || []), newStack]
    }

    onUpdateWorkspace(updatedWorkspace)
    setShowStackModal(false)
  }

  const handleEditPromptBlock = (block) => {
    setEditingBlock(block)
    setShowBlockModal(true)
  }

  const handleEditPromptStack = (stack) => {
    setEditingStack(stack)
    setShowStackModal(true)
  }

  const handleUpdatePromptBlock = (updatedBlock) => {
    if (!workspace) return

    const updatedBlocks = workspace.promptBlocks.map(b =>
      b.id === updatedBlock.id ? updatedBlock : b
    )

    const updatedWorkspace = {
      ...workspace,
      promptBlocks: updatedBlocks
    }

    onUpdateWorkspace(updatedWorkspace)
    setShowBlockModal(false)
    setEditingBlock(null)
  }

  const handleUpdatePromptStack = (updatedStack) => {
    if (!workspace) return

    const updatedStacks = workspace.promptStacks.map(s =>
      s.id === updatedStack.id ? updatedStack : s
    )

    const updatedWorkspace = {
      ...workspace,
      promptStacks: updatedStacks
    }

    onUpdateWorkspace(updatedWorkspace)
    setShowStackModal(false)
    setEditingStack(null)
  }

  const handleDeletePromptBlock = (blockId) => {
    if (!workspace) return

    const updatedBlocks = workspace.promptBlocks.filter(b => b.id !== blockId)
    const updatedWorkspace = {
      ...workspace,
      promptBlocks: updatedBlocks
    }

    onUpdateWorkspace(updatedWorkspace)
  }

  const handleDeletePromptStack = (stackId) => {
    if (!workspace) return

    const updatedStacks = workspace.promptStacks.filter(s => s.id !== stackId)
    const updatedWorkspace = {
      ...workspace,
      promptStacks: updatedStacks
    }

    onUpdateWorkspace(updatedWorkspace)
  }

  const handleUsePromptBlock = (blockId) => {
    if (!workspace) return

    const updatedBlocks = workspace.promptBlocks.map(b =>
      b.id === blockId ? { ...b, usageCount: b.usageCount + 1 } : b
    )

    const updatedWorkspace = {
      ...workspace,
      promptBlocks: updatedBlocks
    }

    onUpdateWorkspace(updatedWorkspace)
  }

  const handleUsePromptStack = (stackId) => {
    if (!workspace) return

    const updatedStacks = workspace.promptStacks.map(s =>
      s.id === stackId ? { ...s, usageCount: s.usageCount + 1 } : s
    )

    const updatedWorkspace = {
      ...workspace,
      promptStacks: updatedStacks
    }

    onUpdateWorkspace(updatedWorkspace)
  }

  if (!workspace) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-6">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Sidekick</h3>
          <p className="text-gray-600 mb-6 max-w-md">
            Create a workspace to get started with building AI-powered guidance for your frontline workers.
          </p>
        </div>
      </div>
    )
  }

  const promptBlocks = workspace.promptBlocks || []
  const promptStacks = workspace.promptStacks || []

  return (
    <div className="max-w-7xl mx-auto">
      {/* Workspace Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900">{promptBlocks.length}</div>
          <div className="text-sm text-gray-600">Prompt Blocks</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900">{promptStacks.length}</div>
          <div className="text-sm text-gray-600">Prompt Stacks</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900">
            {promptBlocks.reduce((sum, b) => sum + b.usageCount, 0) + 
             promptStacks.reduce((sum, s) => sum + s.usageCount, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Uses</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900 capitalize">{workspace.type}</div>
          <div className="text-sm text-gray-600">Workspace Type</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('blocks')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'blocks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Prompt Blocks ({promptBlocks.length})
            </button>
            <button
              onClick={() => setActiveTab('stacks')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stacks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Prompt Stacks ({promptStacks.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Prompt Blocks Tab */}
      {activeTab === 'blocks' && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Prompt Blocks</h2>
              <p className="text-gray-600">Individual blocks that can be combined into stacks</p>
            </div>
            <button
              onClick={() => setShowBlockModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <span>+</span>
              <span>Create Prompt Block</span>
            </button>
          </div>

          {promptBlocks.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No prompt blocks yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first prompt block - these are the building blocks for your AI guidance.
              </p>
              <button
                onClick={() => setShowBlockModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Prompt Block
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promptBlocks.map((block) => (
                <PromptBlockCard
                  key={block.id}
                  promptBlock={block}
                  onEdit={handleEditPromptBlock}
                  onDelete={handleDeletePromptBlock}
                  onUse={handleUsePromptBlock}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Prompt Stacks Tab */}
      {activeTab === 'stacks' && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Prompt Stacks</h2>
              <p className="text-gray-600">Combinations of prompt blocks for specific situations</p>
            </div>
            <button
              onClick={() => setShowStackModal(true)}
              disabled={promptBlocks.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <span>+</span>
              <span>Create Prompt Stack</span>
            </button>
          </div>

          {promptStacks.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No prompt stacks yet</h3>
              <p className="text-gray-600 mb-6">
                {promptBlocks.length === 0 
                  ? "Create some prompt blocks first, then combine them into stacks."
                  : "Combine your prompt blocks into stacks for specific situations."
                }
              </p>
              {promptBlocks.length > 0 && (
                <button
                  onClick={() => setShowStackModal(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Create Prompt Stack
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promptStacks.map((stack) => (
                <PromptStackCard
                  key={stack.id}
                  promptStack={stack}
                  workspace={workspace}
                  onEdit={handleEditPromptStack}
                  onDelete={handleDeletePromptStack}
                  onUse={handleUsePromptStack}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Prompt Block Modal */}
      {showBlockModal && (
        <PromptBlockModal
          editingBlock={editingBlock}
          onCreatePromptBlock={handleCreatePromptBlock}
          onUpdatePromptBlock={handleUpdatePromptBlock}
          onClose={() => {
            setShowBlockModal(false)
            setEditingBlock(null)
          }}
        />
      )}

      {/* Prompt Stack Modal */}
      {showStackModal && (
        <PromptStackModal
          workspace={workspace}
          editingStack={editingStack}
          onCreatePromptStack={handleCreatePromptStack}
          onUpdatePromptStack={handleUpdatePromptStack}
          onClose={() => {
            setShowStackModal(false)
            setEditingStack(null)
          }}
        />
      )}
    </div>
  )
}

export default Dashboard