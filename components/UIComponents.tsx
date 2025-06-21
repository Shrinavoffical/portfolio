// Badge Component
export const Badge = ({ children, className = "", ...props }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`} {...props}>
    {children}
  </span>
)

// Card Components
export const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white shadow rounded-lg ${className}`} {...props}>
    {children}
  </div>
)

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
)

// Input Component
export const Input = ({ className = "", ...props }) => (
  <input
    className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
    {...props}
  />
)

// Textarea Component
export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
    {...props}
  />
)

// Button Component
export const Button = ({ children, className = "", variant = "default", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants = {
    default: "border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
    outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
