import { useState } from 'react'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans text-gray-800">
      {/* 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed inset-y-0 left-0 w-56 bg-white shadow-lg transform transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-indigo-600">Analytics</h1>
        </div>
        <nav className="p-4 space-y-2">
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition">Overview</button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition">Reports</button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition">Settings</button>
        </nav>
      </aside>

      {/* 메인 컨텐츠 */}
      <div className="md:ml-56 flex flex-col min-h-screen">
        {/* 헤더 */}
        <header className="bg-white shadow-sm px-8 py-6 flex justify-between items-center">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="메뉴 열기"
          >
            ☰
          </button>
          <h2 className="text-2xl font-bold text-gray-800">애널리틱스 대시보드</h2>
          <span className="text-sm text-gray-500">승형님 👋</span>
        </header>

        {/* 메인 */}
        <main className="p-8 flex-1 space-y-6">
          {/* KPI 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
              <h3 className="text-sm text-gray-500">매출</h3>
              <p className="text-2xl font-bold text-indigo-600">₩12,340,000</p>
              <span className="text-xs text-green-600">+12% 지난달 대비</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
              <h3 className="text-sm text-gray-500">신규 고객</h3>
              <p className="text-2xl font-bold text-indigo-600">245</p>
              <span className="text-xs text-green-600">+8% 증가</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
              <h3 className="text-sm text-gray-500">재방문율</h3>
              <p className="text-2xl font-bold text-indigo-600">76%</p>
              <span className="text-xs text-red-600">-3% 감소</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
              <h3 className="text-sm text-gray-500">평균 세션</h3>
              <p className="text-2xl font-bold text-indigo-600">5m 32s</p>
              <span className="text-xs text-green-600">+15% 증가</span>
            </div>
          </div>

          {/* 그래프 섹션 */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">월별 매출 추이</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              📈 그래프 자리
            </div>
          </div>

          {/* 최근 활동 로그 */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">최근 활동</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                신규 고객 등록 — 2분 전
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                결제 완료 — 15분 전
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                보고서 생성 — 1시간 전
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App