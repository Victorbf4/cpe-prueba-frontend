import Navbar from './components/layout/Navbar';
import CourseCard from './components/ui/CourseCard';
import { useFetchUserCourses } from './hooks/useFetchUserCourses';

function App() {
  const { data, isLoading, error } = useFetchUserCourses();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Profile Banner */}
      <div className="bg-[#f4f7f9] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-6">
            {/* Large avatar */}
            <div className="h-24 w-24 rounded-full bg-[#8cb33e] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-3xl">U</span>
            </div>
            
            {/* User info */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">¡Hola!</h2>
              <p>
                {data?.people[0]?.name} {data?.people[0]?.lastName}
              </p>
              <p className="text-gray-600 mt-1">
                {data?.email || 'usuario@ejemplo.com'}
              </p>
            </div>

            {/* Edit button */}
            <button className="bg-[#8cb33e] hover:bg-[#7a9e35] text-white px-4 py-2 rounded text-sm font-medium transition-colors">
              Editar
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
              Vistos recientemente
            </button>
            <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
              Favoritos
            </button>
            <button className="py-4 text-sm font-medium text-gray-800 border-b-2 border-[#8cb33e]">
              Tus cursos
            </button>
            <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
              Tus certificados
            </button>
          </div>
        </div>
      </div>

      {/* Search input */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center border-b border-gray-300 pb-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="text-gray-500 hover:text-gray-700 ml-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8cb33e]"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {data && !isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {data.inscriptions.map((item) => (
              <CourseCard key={item.courseId} inscription={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
