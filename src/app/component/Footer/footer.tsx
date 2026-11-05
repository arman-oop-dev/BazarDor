const Footer = () => {
  return (
    <footer className="w-full mt-10 border-t border-base-300 bg-base-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand Description */}
          <p className="text-xs sm:text-sm text-base-content/70 text-center sm:text-left">
            <span className="font-semibold text-base-content">বাজার দর</span> —
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          {/* Disclaimer */}
          <p className="text-[11px] sm:text-xs text-base-content/50 text-center sm:text-right leading-relaxed">
            সকল দাম সম্ভাব্য; বাজার পরিস্থিতির ওপর নির্ভর করে পরিবর্তিত হতে
            পারে।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
