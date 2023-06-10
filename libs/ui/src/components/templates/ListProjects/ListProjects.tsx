import {
  ProjectOrderByWithRelationInput,
  SortOrder,
  useProjectsQuery,
} from '@carbon-credits/network/src/generated'
import { ShowData } from '../../organisms/ShowData'
import { useState } from 'react'
import { ProjectCard } from '../../organisms/ProjectCard'
import { HtmlSelect } from '../../atoms/HtmlSelect'
import { SearchBar } from '../../molecules/SearchBar'
import { useDebouncedValue } from '@carbon-credits/hooks/async'

export interface IListProjectsProps {}

export const ListProjects = ({}: IListProjectsProps) => {
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(12)
  const [searchTerm, setSearchTerm] = useState('')
  const [orderBy, setOrderBy] =
    useState<ProjectOrderByWithRelationInput | null>(null)

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 400)

  const handleSort = (value: string) => {
    if (!value) {
      setOrderBy(null)
      return
    }
    let [field, direction] = value.split('_')
    direction = direction === 'ASC' ? SortOrder.Asc : SortOrder.Desc
    setOrderBy({ [field]: direction })
  }

  const { data, loading, error } = useProjectsQuery({
    variables: {
      skip,
      take,
      searchTerm: debouncedSearchTerm,
      ...(orderBy ? { orderBy } : null),
    },
  })

  return (
    <div className="mb-4 ">
      <div className="flex flex-col items-center max-w-lg gap-4 mx-auto mb-8 justify-stretch">
        <SearchBar
          className="w-full"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <SortDropdown handleSort={handleSort} />
      </div>
      <ShowData
        error={error?.message}
        loading={loading}
        hidePagination={Boolean(searchTerm)}
        pagination={{
          resultCount: data?.projects.length || 0,
          totalCount: data?.projectsCount.count || 0,
          setSkip,
          setTake,
          skip,
          take,
        }}
      >
        {data?.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ShowData>
    </div>
  )
}

export const SortDropdown = ({
  handleSort,
}: {
  handleSort: (value: string) => void
}) => (
  <HtmlSelect
    className="w-full max-w-xs rounded-full"
    onChange={(e) => handleSort(e.target.value)}
  >
    <option value="">Relevance</option>
    <option value="price_DESC">Price &darr;</option>
    <option value="price_ASC">Price &uarr;</option>
    <option value="balance_DESC">Balance &darr;</option>
    <option value="balance_ASC">Balance &uarr;</option>
  </HtmlSelect>
)
