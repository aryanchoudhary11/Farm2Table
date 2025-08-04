const FAQHeader = () => {
  return (
    <div className="bg-[#f3fce8] py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto mt-4">
        <div className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
          <span role="img" aria-label="question">
            ❓
          </span>
          Frequently Asked Questions
        </div>
        <p className="text-lg text-gray-700">
          Got questions? We’ve got answers.
        </p>
      </div>
    </div>
  );
};
export default FAQHeader;
