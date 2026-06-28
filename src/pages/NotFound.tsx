import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4">
			<h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>

			<p className="text-gray-500">요청하신 페이지가 존재하지 않습니다.</p>

			<Link to="/" className="text-blue-600 underline">
				서비스 선택 페이지로 이동
			</Link>
		</div>
	);
}
