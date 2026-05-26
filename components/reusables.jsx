export const GrayTitle = ({ children }) => 
  <span className="bg-linear-to-br from-stone-100 via-stone-300 to-stone-500 bg-clip-text text-transparent">{children}</span>;

export const GoldTitle = ({ children }) => 
  <span className="bg-linear-to-br from-blue-100 via-blue-300 to-blue-500 bg-clip-text text-transparent">{children}</span>;

export const SectionLabel = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-[0.14em] uppercase mb-4">
  <span className="bg-linear-to-br from-blue-100 via-blue-300 to-blue-500 bg-clip-text text-transparent">{children}</span>
  </p>
);

export const SectionHeading = ({gray,blue}) => (
  <h2 className = "font-serif text-[clamp(2rem,4vw,3rem)]">
    <GrayTitle>{gray}</GrayTitle>
    <br/>
     <GoldTitle>{blue}</GoldTitle>
  </h2>
)
