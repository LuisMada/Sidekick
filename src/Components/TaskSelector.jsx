const TaskSelector = ({ taskBlocks, onTaskSelected }) => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">What situation do you need help with?</h2>
          <p className="text-gray-600 mb-6">
            Select the task that matches your current uncertainty. This will generate personalized guidance.
          </p>
        </div>
  
        <div className="grid gap-4 md:grid-cols-2">
          {taskBlocks.map((task) => (
            <button
              key={task.id}
              onClick={() => onTaskSelected(task)}
              className="p-6 text-left border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="font-medium text-gray-900 mb-2">{task.name}</div>
              <div className="text-sm text-gray-600 line-clamp-3">{task.content}</div>
              <div className="mt-4 text-sm text-blue-600 font-medium">
                Click to get guidance →
              </div>
            </button>
          ))}
        </div>
  
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">
            💡 <strong>This is the frontline worker experience</strong> - they just pick their situation and get instant, aligned guidance without needing to understand prompt engineering or company policies.
          </div>
        </div>
      </div>
    )
  }
  
  export default TaskSelector