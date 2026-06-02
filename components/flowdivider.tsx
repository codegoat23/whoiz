export function FlowDivider() {
  return (
    <div className="relative w-full h-24 flex items-center justify-center overflow-hidden">
      
      {/* soft glow line */}
      <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />

      {/* floating glow orb */}
      <div className="absolute w-40 h-40 bg-orange-500/10 blur-3xl rounded-full" />
    </div>
  );
}