const Sidebar = ({ workspaces, selectedWorkspace, onSelectWorkspace, onCreateWorkspace }) => {
    return (
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Sidekick</h2>
          <p className="text-sm text-gray-600">AI Workspace Manager</p>
        </div>
  
        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Workspaces
            </h3>
            
            {workspaces.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m4 0h1"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-500 mb-4">No workspaces yet</p>
                <button
                  onClick={onCreateWorkspace}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Create your first workspace
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => onSelectWorkspace(workspace)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedWorkspace?.id === workspace.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium truncate">{workspace.name}</div>
                    <div className="text-sm text-gray-500 capitalize">
                      {workspace.type} • {workspace.promptStacks?.length || 0} prompts
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
  
        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Sidekick MVP v0.1.0
          </div>
        </div>
      </div>
    )
  }
  
  export default Sidebar