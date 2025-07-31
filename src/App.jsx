import { useState } from 'react'
import WorkspaceSetup from './components/WorkspaceSetup'
import BlockBuilder from './components/BlockBuilder'
import TaskSelector from './components/TaskSelector'
import PromptOutput from './components/PromptOutput'

function App() {
  const [currentStep, setCurrentStep] = useState('workspace')
  const [workspace, setWorkspace] = useState(null)
  const [globalBlocks, setGlobalBlocks] = useState([])
  const [taskBlocks, setTaskBlocks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [promptStack, setPromptStack] = useState(null)

  const handleWorkspaceCreated = (workspaceData) => {
    setWorkspace(workspaceData)
    setCurrentStep('blocks')
  }

  const handleBlocksCreated = (globals, tasks) => {
    setGlobalBlocks(globals)
    setTaskBlocks(tasks)
    setCurrentStep('selector')
  }

  const handleTaskSelected = (task) => {
    setSelectedTask(task)
    // Compile prompt stack
    const stack = {
      global: globalBlocks,
      task: task,
      compiled: `${globalBlocks.map(g => g.content).join('\n\n')}\n\n${task.content}`
    }
    setPromptStack(stack)
    setCurrentStep('output')
  }

  const handleReset = () => {
    setCurrentStep('workspace')
    setWorkspace(null)
    setGlobalBlocks([])
    setTaskBlocks([])
    setSelectedTask(null)
    setPromptStack(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sidekick MVP</h1>
          <p className="text-gray-600">Agentic workspace for frontline workers</p>
          {workspace && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">Workspace: {workspace.name}</p>
              <button 
                onClick={handleReset}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Flow Steps */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            {['workspace', 'blocks', 'selector', 'output'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === step 
                    ? 'bg-blue-600 text-white' 
                    : index < ['workspace', 'blocks', 'selector', 'output'].indexOf(currentStep)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && <div className="w-8 h-0.5 bg-gray-300 mx-2" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {currentStep === 'workspace' && (
            <WorkspaceSetup onWorkspaceCreated={handleWorkspaceCreated} />
          )}
          
          {currentStep === 'blocks' && (
            <BlockBuilder 
              workspace={workspace}
              onBlocksCreated={handleBlocksCreated} 
            />
          )}
          
          {currentStep === 'selector' && (
            <TaskSelector 
              taskBlocks={taskBlocks}
              onTaskSelected={handleTaskSelected}
            />
          )}
          
          {currentStep === 'output' && (
            <PromptOutput 
              promptStack={promptStack}
              selectedTask={selectedTask}
              onBack={() => setCurrentStep('selector')}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App