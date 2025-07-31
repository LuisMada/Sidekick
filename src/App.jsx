import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import WorkspaceModal from './components/WorkspaceModal'

function App() {
  const [workspaces, setWorkspaces] = useState([])
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false)

  const handleCreateWorkspace = (workspaceData) => {
    const newWorkspace = {
      ...workspaceData,
      id: `workspace-${Date.now()}`,
      promptBlocks: [], // Initialize empty array for prompt blocks
      promptStacks: [], // Initialize empty array for prompt stacks
      createdAt: new Date().toISOString()
    }
    const updatedWorkspaces = [...workspaces, newWorkspace]
    setWorkspaces(updatedWorkspaces)
    setSelectedWorkspace(newWorkspace)
    setShowWorkspaceModal(false)
  }

  const handleSelectWorkspace = (workspace) => {
    setSelectedWorkspace(workspace)
  }

  const handleUpdateWorkspace = (updatedWorkspace) => {
    const updatedWorkspaces = workspaces.map(w => 
      w.id === updatedWorkspace.id ? updatedWorkspace : w
    )
    setWorkspaces(updatedWorkspaces)
    setSelectedWorkspace(updatedWorkspace)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        workspaces={workspaces}
        selectedWorkspace={selectedWorkspace}
        onSelectWorkspace={handleSelectWorkspace}
        onCreateWorkspace={() => setShowWorkspaceModal(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedWorkspace ? selectedWorkspace.name : 'Sidekick Dashboard'}
              </h1>
              <p className="text-gray-600">
                {selectedWorkspace 
                  ? `${selectedWorkspace.type} workspace` 
                  : 'Select a workspace or create a new one'
                }
              </p>
            </div>
            <button
              onClick={() => setShowWorkspaceModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <span>+</span>
              <span>Create Workspace</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <Dashboard 
            workspace={selectedWorkspace}
            onUpdateWorkspace={handleUpdateWorkspace}
          />
        </main>
      </div>

      {/* Workspace Creation Modal */}
      {showWorkspaceModal && (
        <WorkspaceModal
          onCreateWorkspace={handleCreateWorkspace}
          onClose={() => setShowWorkspaceModal(false)}
        />
      )}
    </div>
  )
}

export default App