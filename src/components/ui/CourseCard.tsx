import type { Inscription } from '../../types';

interface CourseCardProps {
  inscription: Inscription;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ inscription, onClick }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={onClick}>
      {/* Image */}
      <div className="w-full h-40 bg-gray-200">
        {inscription.course.imageUrl ? (
          <img
            src={inscription.course.imageUrl}
            alt={inscription.course.name}
            className="w-full h-full object-cover"
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
        <h3 className="font-bold text-gray-800 text-lg mt-2 line-clamp-2">
          {inscription.course.name}
        </h3>

        {/* Progress bar */}
        <div className="bg-gray-200 h-2 rounded-full mt-4">
          <div
            className="bg-[#8cb33e] h-2 rounded-full transition-all duration-300"
            style={{ width: `${inscription.advance}%` }}
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
