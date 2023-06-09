import { IconPlant, IconTree, IconTrees } from '@tabler/icons-react'
import { ScrollText } from '../../molecules/ScrollText'
import Link from 'next/link'

export interface ILogoProps {}

export const Logo = ({}: ILogoProps) => {
  return (
    <div className="relative flex items-center gap-1 ">
      <IconPlant className="text-primary w-7 h-7 p-0.5 border-2 border-black rounded-full" />

      <div
        // style={{
        //   backgroundImage:
        //     'linear-gradient(to right, hsl(10, 94%, 45%), hsl(30, 100%, 50%), hsl(116, 2%, 32%),hsl(52, 100%, 50%),hsl(116, 100%, 54%),hsl(116, 100%, 27%) )',
        //   backgroundClip: 'text',
        //   WebkitBackgroundClip: 'text',
        //   color: 'transparent',
        //   WebkitTextFillColor: 'transparent',
        // }}
        // className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red via-gray-50 to-green"
        className="z-10 text-xl font-semibold "
      >
        Carbon Credits
      </div>
      <div className="absolute z-20 px-1 mb-4 -translate-x-1 left-full">
        <ScrollText
          input={[
            'Web3',
            'Dapp',
            'Decentralized',
            'Trustless',
            'Permissionless',
            'On-chain',
            'Blockchain',
            'Smart Contract Driven',
            'Crypto-powered',
            'Distributed Ledger Technology',
          ]}
          className="px-2 text-xs font-semibold text-black border border-white rounded shadow-xl bg-white/30 backdrop-blur-sm whitespace-nowrap"
        />
      </div>
    </div>
  )
}
