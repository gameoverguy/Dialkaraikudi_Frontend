import { MdCancel } from 'react-icons/md';

const AmentiesModal = ({ data, isExpanded, toggleExpand }) => {
    return (
        <div className="flex flex-wrap">
            {data.amenities?.slice(0, 3).map((a, i) => (
                <p
                    key={i}
                    className="bg-gray-300 inline-block m-1 px-2 py-1 rounded text-[12px]"
                >
                    {a}
                </p>
            ))}

            {data.amenities?.length > 3 && !isExpanded && (
                <button
                    className="bg-amber-200 inline-block m-1 px-2 py-1 rounded text-[12px]"
                    onClick={toggleExpand}
                >
                    More...
                </button>
            )}

            {isExpanded && (
                <>
                    {data.amenities.slice(3).map((a, i) => (
                        <p
                            key={i + 3}
                            className="bg-gray-300 hover:bg-gray-500 inline-block m-1 px-2 py-1 rounded text-[12px]"
                        >
                            {a}
                        </p>
                    ))}
                    <button className="text-base" onClick={toggleExpand}>
                        <MdCancel />
                    </button>
                </>
            )}
        </div>
    );
};

export default AmentiesModal;