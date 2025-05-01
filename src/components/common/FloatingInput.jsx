export const FloatingInput = ({ label, id, type = 'text', className = '', ...props }) => {
  return (
    <div className="rounded-md bg-gray-300/5 px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600">
      <label htmlFor={id} className="block text-xs font-medium text-white-900">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder=""
        {...props}
        className="block w-full text-white-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 bg-transparent [-webkit-autofill:bg-transparent] [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_transparent]"
      />
    </div>
  )
}