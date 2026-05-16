import { useEffect, useState, useRef } from 'react';
import Navbar from './components/layout/Navbar';
import CourseCard from './components/ui/CourseCard';
import CourseModal from './components/ui/CourseModal';
import { useFetchUserCourses } from './hooks/useFetchUserCourses';
import type { Inscription } from './types';

const TABS = [
  'Tus cursos',
  'Tus rutas',
  'Tus diplomados',
  'Tus especialidades',
  'Tus certificados',
] as const;

const CHIPS = [
  'Todos',
  'Próximos retos',
  'En progreso',
  'Completados',
  'Recientes',
  'Favoritos',
] as const;

function App() {
  const { data, isLoading, error } = useFetchUserCourses();
  const [selectedCourse, setSelectedCourse] = useState<Inscription | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>(TABS[0]);
  const [activeChip, setActiveChip] = useState<typeof CHIPS[number]>(CHIPS[0]);
  const observerTarget = useRef<HTMLDivElement>(null);

  const filteredCourses = data
    ? (() => {
        // Validación de Tab: Solo mostrar contenido si es "Tus cursos"
        if (activeTab !== 'Tus cursos') {
          return [];
        }

        let courses = data.inscriptions;

        // Validación de Progreso (Chips)
        if (activeChip === 'Próximos retos') {
          courses = courses.filter((item) => item.advance === 0);
        } else if (activeChip === 'En progreso') {
          courses = courses.filter((item) => item.advance > 0 && item.advance < 100);
        } else if (activeChip === 'Completados') {
          courses = courses.filter((item) => item.advance === 100);
        } else if (activeChip === 'Recientes' || activeChip === 'Favoritos') {
          return [];
        }
        // "Todos" no aplica filtro de progreso

        // Validación de Búsqueda
        return courses.filter(
          (item) =>
            item.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.course.sector.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })()
    : [];

  const displayedCourses = filteredCourses.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredCourses.length) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      { threshold: 1 }
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [visibleCount, filteredCourses.length]);

  useEffect(() => {
    setVisibleCount(12);
  }, [searchTerm, activeTab, activeChip]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Profile Banner */}
      <div className="bg-[#f4f7f9] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Large avatar */}
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#8cb33e] to-[#6a8a2a] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#8cb33e]/30">
              <span className="text-white text-5xl font-bold uppercase">{data?.people[0]?.name?.charAt(0) || 'U'}</span>
            </div>
            
            {/* User info */}
            <div className="flex-1">
              <h2 className="text-gray-500 font-medium">¡Hola!</h2>
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {data?.people[0]?.name} {data?.people[0]?.lastName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500 text-sm">
                  {data?.email || 'usuario@ejemplo.com'}
                </p>
              </div>
            </div>

            {/* Edit button */}
            <button className="w-full md:w-auto md:ml-auto bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition-all rounded-lg px-5 py-2.5 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Editar
            </button>
          </div>
        </div>
      </div>

      <main role="main">
        {/* Tabs */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'text-[#8cb33e] border-b-2 border-[#8cb33e]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Chips and Search container */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Chips (Filters) - Left side */}
              {activeTab === 'Tus cursos' && (
                <div className="flex space-x-2 overflow-x-auto flex-1">
                  {CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setActiveChip(chip)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        activeChip === chip
                          ? 'bg-[#8cb33e] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Search input - Right side */}
              <div className="flex items-center border-b border-gray-300 pb-2 flex-shrink-0">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="text-gray-500 hover:text-gray-700 ml-4" aria-label="Activar filtro de búsqueda">
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {displayedCourses.map((item) => (
                  <CourseCard key={item.courseId} inscription={item} onClick={() => setSelectedCourse(item)} />
                ))}
              </div>

              <div ref={observerTarget} className="h-10 w-full mt-4"></div>

              {filteredCourses.length === 0 && displayedCourses.length === 0 && (
                <div className="flex justify-center items-center py-12">
                  <p className="text-gray-500 text-center">No se encontraron cursos que coincidan con tu búsqueda.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {selectedCourse && <CourseModal inscription={selectedCourse} onClose={() => setSelectedCourse(null)} />}
    </div>
  );
}

export default App;
