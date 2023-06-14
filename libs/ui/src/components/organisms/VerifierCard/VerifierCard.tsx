import { VerifiersQuery } from '@carbon-credits/network/src/generated'
import { ShowHide } from '../../molecules/ShowHide'
import { useMemo, useState } from 'react'
import { IconAlertHexagon, IconCheck, IconCheckbox } from '@tabler/icons-react'
import { IconText } from '../../atoms/IconText'
import { useFetchIPFS } from '@carbon-credits/util'

export interface IVerifierCardProps {
  verifier: VerifiersQuery['verifiers'][number]
}

export const VerifierCard = ({ verifier }: IVerifierCardProps) => {
  const imageUrls = useMemo(() => [verifier.imageUrl], [verifier.imageUrl])

  const { images } = useFetchIPFS(imageUrls)
  console.log('images', images)

  return (
    <div key={verifier.walletAddress} className="flex gap-2">
      <div className="w-12 h-12">
        <img src={images[0]} />
      </div>
      <div>
        <div className="font-semibold">{verifier.name}</div>
        <ShowHide showText="Show address">
          <div className="break-words">{verifier.walletAddress}</div>
        </ShowHide>
        <div>
          {verifier.active ? (
            <IconText Icon={<IconCheckbox />}>Active</IconText>
          ) : (
            <IconText>Inactive</IconText>
          )}
        </div>
      </div>
    </div>
  )
}
