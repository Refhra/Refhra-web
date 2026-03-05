type Props = { onNext: () => void };

export default function WelcomeStep({ onNext }: Props) {
  return (
    <div className=" w-full  flex-1 flex flex-col items-center justify-center text-center px-6 relative">
      {/* Illustration / Emoji */}
      <div className="text-9xl mb-6">🎉</div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-4">
        Welcome to <span className="text-blue-600">Refhra</span>
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-md mb-8">
        We’re excited to have you here!  
        In just a few quick steps, we’ll personalize your dashboard  
        so you can stay productive, balanced, and stress-free.  
      </p>

      {/* Call to action */}
      <div className=" ">
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-blue-500 transition"
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}
