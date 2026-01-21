import { FaWhatsapp } from 'react-icons/fa';

const WhatsappFollowButton = () => {
  return (
    <button
      className="group relative flex items-center bg-gray-800 rounded-full p-1 pr-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-700 ring-1 ring-gray-600"
      onClick={() => window.open('https://whatsapp.com/channel/0029Vb6t7rnKrWQx4oL6m31f', '_blank')}
    >
      {/* Icon Container */}
      <div className="absolute -left-1 flex-shrink-0 bg-[#25D366] p-2 rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
        <FaWhatsapp size={28} />
      </div>

      {/* Text */}
      <span className="ml-3 text-white font-bold text-xl tracking-tight pl-8">
        Follow
      </span>
    </button>
  );
};

export default WhatsappFollowButton;