import { useAccount } from '@carbon-credits/hooks/web3'
import { useState } from 'react'
import { useProjectsQuery } from '@carbon-credits/network/src/generated'
import { ShowData } from '../../organisms/ShowData'
import { ProjectCard } from '../../organisms/ProjectCard'
import { PageTitle } from '../../atoms/PageTitle'
import { CreateProject } from '../CreateProject'

export interface IMyProjectsProps {}

export const MyProjects = ({}: IMyProjectsProps) => {
  const [take, setTake] = useState(12)
  const [skip, setSkip] = useState(0)
  const { account } = useAccount()
  const { data, loading } = useProjectsQuery({
    variables: { where: { owner: { equals: account } } },
  })
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <PageTitle>My projects</PageTitle>
        <CreateProject />
      </div>
      <ShowData
        loading={loading}
        pagination={{
          skip,
          take,
          resultCount: data?.projects.length,
          totalCount: data?.projectsCount.count,
          setSkip,
          setTake,
        }}
      >
        {data?.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ShowData>
    </div>
  )
}
