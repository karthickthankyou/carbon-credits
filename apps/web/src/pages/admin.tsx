import { useAccount } from '@carbon-credits/hooks/web3'
import { Container } from '@carbon-credits/ui/src/components/atoms/Container'
import { AlertSection } from '@carbon-credits/ui/src/components/organisms/AlertSection'
import { AdminPage } from '@carbon-credits/ui/src/components/templates/AdminPage'

export default function Admin() {
  const { account, contract, isOwner } = useAccount()

  if (!isOwner) {
    return <AlertSection>You are not an admin.</AlertSection>
  }
  return (
    <Container>
      <AdminPage />
    </Container>
  )
}
