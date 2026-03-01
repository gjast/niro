import React from 'react'
import Image from 'next/image'
interface StackCartProps {
	text: string
	description: string
	icon?: string
	padding?: boolean
}

export default function StackCart({text, description, icon, padding=false}: StackCartProps) {
	return (
		<div
			className='group bg-(--gray-color) rounded-[14px] sm:rounded-[18px] md:rounded-[22px] p-[6px] sm:p-[8px] md:p-[10px] w-full min-w-0 border border-(--border-color) flex flex-col items-center justify-center'
			style={{
				// Для кроссбраузерной поддержки: fallback на padding-top
				aspectRatio: '1 / 1',
				height: 'auto',
				position: 'relative',
			}}
		>
			<div
				aria-hidden
				style={{
					width: '100%',
					paddingTop: '100%',
					pointerEvents: 'none',
					position: 'absolute',
					inset: 0,
					zIndex: 0,
					opacity: 0,
				}}
			/>
			<div className='relative bg-white rounded-[10px] sm:rounded-[14px] md:rounded-[18px] aspect-square border border-(--border-color) w-full h-full overflow-hidden'>
				<div
					className={`absolute inset-0 flex flex-col items-center justify-center gap-[6px] md:gap-[12px] transition-all duration-200 ease-in ${
						icon ? 'group-hover:opacity-0 group-hover:translate-y-2' : ''
					}`}
				>
					<p className='text-[14px] sm:text-[18px] md:text-[24px] font-medium leading-[100%] tracking-[-2%]'>{text}</p>
					<p className='text-[11px] sm:text-[14px] md:text-[18px] font-regular leading-[100%] tracking-0 text-center'>{description}</p>
				</div>
				{icon && (
					<div className='absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-200 ease-in group-hover:opacity-100 scale-95 group-hover:scale-100'>
						<Image
							src={icon}
							alt={text}
							width={500}
							height={500}
							className={`w-full h-auto max-h-full object-contain rounded-[10px] sm:rounded-[14px] md:rounded-[18px] ${padding ? 'p-[6px] md:p-[10px]' : ''}`}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
