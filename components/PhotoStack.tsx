export default function PhotoStack() {
  return (
    <div className="relative w-full h-[380px] sm:h-[450px] md:h-[520px] flex items-center justify-center overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] bg-orange-500/20 blur-[120px] rounded-full" />

      {/* BACK CARD */}
      <div className="absolute -translate-x-16 -translate-y-10 sm:-translate-x-24 sm:-translate-y-14 z-10 rotate-[-6deg] hover:rotate-0 transition duration-500">
        <img
          src="/img1.png"
          alt="card1"
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-3xl
                     border border-orange-200/20 shadow-[0_20px_60px_-20px_rgba(249,115,22,0.25)]
                     hover:shadow-orange-500/30 transition"
        />
      </div>

      {/* MIDDLE CARD */}
      <div className="absolute translate-x-14 -translate-y-6 sm:translate-x-20 sm:-translate-y-10 z-20 rotate-[8deg] hover:rotate-0 transition duration-500">
        <img
          src="/img2.png"
          alt="card2"
          className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 object-cover rounded-3xl
                     border border-orange-200/20 shadow-[0_25px_70px_-25px_rgba(249,115,22,0.35)]
                     hover:shadow-orange-500/40 transition"
        />
      </div>

      {/* FRONT CARD */}
      <div className="absolute translate-y-16 sm:translate-y-20 z-30 -rotate-[10deg] hover:rotate-0 transition duration-500">
        <img
          src="/img3.png"
          alt="card3"
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover rounded-3xl
                     border border-orange-300/20 shadow-[0_30px_90px_-30px_rgba(249,115,22,0.45)]
                     hover:shadow-orange-500/50 transition"
        />
      </div>

    </div>
  );
}