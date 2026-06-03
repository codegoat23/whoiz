export default function PhotoStack() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center  overflow-hidden ">

      {/* BACK CARD (pink jacket) */}
      <div className="absolute  top-6 left-10 z-10">
        <img
          src="/img1.png"
          alt="card1"
          className="w-50 h-50 object-cover rounded-3xl border-8 border-white shadow-xl"
        />
      </div>

      {/* MIDDLE CARD (hand selfie) */}
      <div className="absolute rotate-10 z-20 right-7">
        <img
          src="/img2.png"
          alt="card2"
          className="w-50 h-50 object-cover rounded-3xl border-8 border-white shadow-2xl"
        />
      </div>

      {/* FRONT CARD (black & white portrait) */}
      <div className="absolute -rotate-20 top-68 right-6 z-30">
        <img
          src="/img3.png"
          alt="card3"
          className="w-50 h-50 object-cover rounded-3xl border-8 border-white shadow-2xl"
        />
      </div>

    </div>
  )
}