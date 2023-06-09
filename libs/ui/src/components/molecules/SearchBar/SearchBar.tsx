import { IconSearch } from '@tabler/icons-react'

export interface ISearchBarProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  className?: string
}

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  className,
}: ISearchBarProps) => {
  return (
    <div
      className={`flex items-center border rounded-full bg-white shadow-lg p-1 border-gray-600 ${className}`}
    >
      <IconSearch className="w-6 h-6 ml-2 text-gray-600" />
      <input
        className="w-full py-2 pl-2 text-lg leading-tight text-gray-700 bg-transparent outline-none focus:ring-0"
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder={'Search for project names here.'}
      />
    </div>
  )
}
