import React from 'react'

export default function Label({children}: {children: React.ReactNode}) {
	return (
		<div className='flex items-center gap-[20px] bg-(--black-color)/5 border border-(--border-color)/10 rounded-full py-[5px] text-(--black-color) text-[16px] font-medium leading-[100%] h-[40px] w-max'>
			{children}
		</div>
	)
}
