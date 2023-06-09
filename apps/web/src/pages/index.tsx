import { useAccount } from '@carbon-credits/hooks/web3'
import { ListProjects } from '@carbon-credits/ui/src/components/templates/ListProjects'
import { Container } from '@carbon-credits/ui/src/components/atoms/Container'
import { AlertSection } from '@carbon-credits/ui/src/components/organisms/AlertSection'
import { PlainButton } from '@carbon-credits/ui/src/components/atoms/PlainButton'

export default function Home() {
  const { account, contract, isOwner } = useAccount()

  return (
    <Container>
      {account ? (
        <ListProjects />
      ) : (
        <AlertSection>
          <div>You need to sign in with metamask.</div>
          <PlainButton
            onClick={() => {
              window.location.reload()
            }}
          >
            Refresh.
          </PlainButton>
        </AlertSection>
      )}
    </Container>
  )
}
