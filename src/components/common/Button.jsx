export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}