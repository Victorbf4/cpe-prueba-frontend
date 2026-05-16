import type { Inscription } from '../../types';
import { formatDate } from '../../utils/formatDate';

interface CourseModalProps {
  inscription: Inscription;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ inscription, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Course title */}
        <h2 className="text-2xl font-bold text-gray-800 pr-8">
          {inscription.course.name}
        </h2>

        {/* Details */}
        <div className="mt-6 space-y-3">
          {/* Inscription date */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Inscripción:</span>
            <span className="text-gray-800 font-medium">
              {formatDate(inscription.inscripcionDate)}
            </span>
          </div>

          {/* Evaluation badge */}
          {inscription.anyTest && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Evaluación:</span>
              <span 
                className="text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  color: inscription.course.sector.colorTheme,
                  backgroundColor: `${inscription.course.sector.colorTheme}15`
                }}
              >
                Incluye evaluación
              </span>
            </div>
          )}

          {/* Score */}
          {inscription.scoreCourse > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Calificación final:</span>
              <span className="text-gray-800 font-medium">{inscription.scoreCourse}</span>
            </div>
          )}
        </div>

        {/* Certificate section */}
        <div className="mt-6">
          {inscription.certificationDate && inscription.folioCertificate ? (
            <div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Certificación:</span>
                <span className="text-gray-800 font-medium">
                  {formatDate(inscription.certificationDate)}
                </span>
              </div>
              <button 
                className="w-full text-white p-3 rounded-lg mt-4 font-semibold transition-colors"
                style={{ backgroundColor: inscription.course.sector.colorTheme }}
              >
                Descargar Certificado
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Folio: {inscription.folioCertificate}
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-500 text-sm">Aún no certificado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
