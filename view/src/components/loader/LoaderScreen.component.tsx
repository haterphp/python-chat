import { ILoaderProps } from "./Loader.props";

export default function LoaderScreen(props: ILoaderProps) {
	const { height } = props

	return (
		<div className="loader-container" style={{ height: height }}>
			<div className="loader"></div>
		</div>
	)
}