import type { Inscription } from '../../types';

interface CourseCardProps {
  inscription: Inscription;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ inscription, onClick }) => {
  // Calculate if course is forgotten
  const isForgotten = (() => {
    if (!inscription.inscripcionDate) return false;
    
    const inscriptionDate = new Date(inscription.inscripcionDate);
    const currentDate = new Date();
    const daysSinceInscription = Math.floor(
      (currentDate.getTime() - inscriptionDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const isMoreThanSixMonths = daysSinceInscription > 180;
    const isLowProgress = inscription.advance < 25;
    
    return isMoreThanSixMonths && isLowProgress;
  })();

  // Gamification: Calculate if course has exceptional performance
  const isExcellent = inscription.advance === 100 && inscription.scoreCourse >= 9;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={onClick}>
      {/* Image */}
      <div className="w-full h-40 bg-gray-200 p-4 flex items-center justify-center">
        {inscription.course.imageUrl ? (
          <img
            src={inscription.course.imageUrl}
            alt={inscription.course.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-medium"
          style={{
            color: inscription.course.sector.colorTheme,
            backgroundColor: `${inscription.course.sector.colorTheme}15`,
          }}
        >
          {inscription.course.sector.name}
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-800 text-lg mt-2 line-clamp-2 flex items-center gap-1">
          {inscription.course.name}
          {isExcellent && (
            <span 
              className="text-yellow-400" 
              title="Calificación Sobresaliente"
            >
              ⭐
            </span>
          )}
        </h3>

        {/* Forgotten course warning */}
        {isForgotten && (
          <div className="mt-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-semibold text-amber-600">
              ¿Retomamos este curso?
            </span>
          </div>
        )}

        {/* Progress bar */}
        <div className="bg-gray-200 h-2 rounded-full mt-4">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${inscription.advance}%`,
              backgroundColor: inscription.course.sector.colorTheme
            }}
          />
        </div>

        {/* Progress text */}
        <p className="text-sm text-gray-600 mt-2">
          Avance: {inscription.advance}%
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
