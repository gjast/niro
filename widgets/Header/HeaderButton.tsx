'use client'

import Link from 'next/link'
import Button from '@/ui/Button'
import { useDictionary } from '@/i18n/DictionaryProvider'

export function HeaderButton() {
	const dict = useDictionary()

	return (
		<Button>
			<Link href='#' className='text-white text-[14px] font-medium leading-[100%] tracking-[0.2px] px-[20px] py-[14px]'>{dict.header.getStarted}</Link>
		</Button>
	)
}
