import { useState } from 'react'

const WorkspaceSetup = ({ onWorkspaceCreated }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')

  const workspaceTypes = [
    { id: 'retail', name: 'Retail Store', desc: 'Customer service, returns, inventory' },
    { id: 'delivery', name: 'Delivery Service', desc: 'Routes, customer communication, issues' },
    { id: 'warehouse', name: 'Warehouse Operations', desc: 'Inventory, shipping, quality control' },
    { id: 'restaurant', name: 'Restaurant', desc: 'Orders, customer service, kitchen ops' },
    { id: 'custom', name: 'Custom', desc: 'Build your own workspace type' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && type) {
      onWorkspaceCreated({
        name,
        type,
        createdAt: new Date().toISOString()
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Your Workspace</h2>
        <p className="text-gray-600 mb-6">
          A workspace contains all the rules and guidance for your team or organization.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Workspace Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Acme Delivery Co., Downtown Store #3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Workspace Type
        </label>
        <div className="space-y-3">
          {workspaceTypes.map((workspaceType) => (
            <label key={workspaceType.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value={workspaceType.id}
                checked={type === workspaceType.id}
                onChange={(e) => setType(e.target.value)}
                className="h-4 w-4 text-blue-600"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">{workspaceType.name}</div>
                <div className="text-sm text-gray-500">{workspaceType.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!name || !type}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Workspace
      </button>
    </form>
  )
}

export default WorkspaceSetup