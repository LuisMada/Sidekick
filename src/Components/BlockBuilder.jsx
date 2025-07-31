import { useState } from 'react'

const BlockBuilder = ({ workspace, onBlocksCreated }) => {
  const [globalBlocks, setGlobalBlocks] = useState([])
  const [taskBlocks, setTaskBlocks] = useState([])
  const [showGlobalForm, setShowGlobalForm] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)

  // Predefined templates based on workspace type
  const getTemplates = () => {
    const templates = {
      retail: {
        global: [
          { name: 'Customer Service Standards', content: 'Always greet customers warmly. Listen actively to concerns. Never promise what you cannot deliver. Escalate complex issues to supervisors.' },
          { name: 'Brand Voice', content: 'Use friendly, professional language. Avoid jargon. Stay calm and helpful even when customers are frustrated.' }
        ],
        task: [
          { name: 'Handle Refund Requests', content: 'For refunds: Check receipt first. If no receipt, ask for purchase details. Follow company refund policy. Offer alternatives if refund not possible.' },
          { name: 'Deal with Complaints', content: 'Listen without interrupting. Acknowledge the problem. Apologize for the inconvenience. Offer solutions within your authority.' }
        ]
      },
      delivery: {
        global: [
          { name: 'Safety First', content: 'Never compromise on safety protocols. Report unsafe conditions immediately. Use proper protective equipment.' },
          { name: 'Customer Communication', content: 'Keep customers informed about delays. Be polite in all interactions. Represent the company professionally.' }
        ],
        task: [
          { name: 'Handle Delivery Delays', content: 'Inform customer as soon as delay is known. Provide realistic new timeframe. Offer compensation if appropriate.' },
          { name: 'Address Access Issues', content: 'Try alternative contact methods. Leave delivery notice if unable to deliver. Secure package safely if possible.' }
        ]
      },
      warehouse: {
        global: [
          { name: 'Accuracy Standards', content: 'Double-check all entries. Report discrepancies immediately. Never guess - verify or ask.' },
          { name: 'Safety Protocols', content: 'Follow all safety procedures. Report hazards. Use proper lifting techniques.' }
        ],
        task: [
          { name: 'Log Damaged Inventory', content: 'Document damage thoroughly. Photo evidence when possible. Classify severity level. Report to supervisor.' },
          { name: 'Handle Shipping Errors', content: 'Stop process if error detected. Verify correct information. Correct and document changes made.' }
        ]
      }
    }
    return templates[workspace.type] || { global: [], task: [] }
  }

  const loadTemplates = () => {
    const templates = getTemplates()
    setGlobalBlocks(templates.global.map((block, i) => ({ ...block, id: `global-${i}`, version: 'v1.0' })))
    setTaskBlocks(templates.task.map((block, i) => ({ ...block, id: `task-${i}`, version: 'v1.0' })))
  }

  const addGlobalBlock = (blockData) => {
    const newBlock = {
      ...blockData,
      id: `global-${Date.now()}`,
      version: 'v1.0'
    }
    setGlobalBlocks([...globalBlocks, newBlock])
    setShowGlobalForm(false)
  }

  const addTaskBlock = (blockData) => {
    const newBlock = {
      ...blockData,
      id: `task-${Date.now()}`,
      version: 'v1.0'
    }
    setTaskBlocks([...taskBlocks, newBlock])
    setShowTaskForm(false)
  }

  const handleContinue = () => {
    if (globalBlocks.length > 0 && taskBlocks.length > 0) {
      onBlocksCreated(globalBlocks, taskBlocks)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Build Your Blocks</h2>
        <p className="text-gray-600 mb-4">
          Create Global blocks (company-wide rules) and Task blocks (situation-specific guidance).
        </p>
        
        {workspace.type !== 'custom' && (
          <button
            onClick={loadTemplates}
            className="mb-6 px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
          >
            Load {workspace.type} Templates
          </button>
        )}
      </div>

      {/* Global Blocks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Global Blocks ({globalBlocks.length})</h3>
          <button
            onClick={() => setShowGlobalForm(true)}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            + Add Global
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {globalBlocks.map((block) => (
            <div key={block.id} className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900 mb-2">{block.name}</div>
              <div className="text-sm text-blue-800">{block.content}</div>
            </div>
          ))}
        </div>

        {showGlobalForm && (
          <BlockForm
            type="Global"
            onSubmit={addGlobalBlock}
            onCancel={() => setShowGlobalForm(false)}
          />
        )}
      </div>

      {/* Task Blocks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Task Blocks ({taskBlocks.length})</h3>
          <button
            onClick={() => setShowTaskForm(true)}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
          >
            + Add Task
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {taskBlocks.map((block) => (
            <div key={block.id} className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900 mb-2">{block.name}</div>
              <div className="text-sm text-green-800">{block.content}</div>
            </div>
          ))}
        </div>

        {showTaskForm && (
          <BlockForm
            type="Task"
            onSubmit={addTaskBlock}
            onCancel={() => setShowTaskForm(false)}
          />
        )}
      </div>

      {globalBlocks.length > 0 && taskBlocks.length > 0 && (
        <button
          onClick={handleContinue}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Continue to Task Selection
        </button>
      )}
    </div>
  )
}

const BlockForm = ({ type, onSubmit, onCancel }) => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && content) {
      onSubmit({ name, content })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded-lg bg-gray-50 mb-4">
      <h4 className="font-medium text-gray-900 mb-3">Add {type} Block</h4>
      
      <div className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`${type} block name`}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`${type} block content and rules`}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Add Block
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

export default BlockBuilder