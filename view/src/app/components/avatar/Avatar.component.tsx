import { Colors } from "../common/Colors"

interface IAvatarProps {
	text: string
	color?: Colors
}

export default function Avatar(props: IAvatarProps) {
	const { text, color = Colors.PRIMARY } = props

	return (
		<div className={['avatar', color].join(' ')}>
			{text}
		</div>
	)
}