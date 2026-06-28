export default function NotFound() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>

			<p className="text-gray-500">요청하신 페이지가 존재하지 않습니다.</p>

			<a href="/" className="text-blue-600 underline">
				서비스 선택 페이지로 이동
			</a>
		</div>
	);
}
