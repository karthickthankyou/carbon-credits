import { useAccount } from '@carbon-credits/hooks/web3'
import { Container } from '@carbon-credits/ui/src/components/atoms/Container'
import { AlertSection } from '@carbon-credits/ui/src/components/organisms/AlertSection'
import { InventoryPage } from '@carbon-credits/ui/src/components/templates/InventoryPage'

export default function Inventory() {
  const { account, contract, isVerifier } = useAccount()

  if (!isVerifier) {
    return <AlertSection>You are not a verifier.</AlertSection>
  }
  return (
    <Container>
      <InventoryPage />
    </Container>
  )
}
