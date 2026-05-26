import React from 'react'

const BentoCard = ({ icon, title, desc, className , children }) => {
  return (
    <div className={`border border-white/10 rounded-lg p-6 flex flex-col items-start gap-4 hover:border-blue-400/30 transition cursor-pointer ${className}`}>
      <span className="w-11 h-11 rounded-xl bg-blue-400/10 border border-blue-400 flex items-center justify-center text-xl mb-5
      ">{icon}</span>
      <h3 className="font-serif text-xl tracking-tight mb-2">{title}</h3>
      <p className="text-stone-400 leading-relaxed">{desc}</p>
      {children}
    </div>
  )
}

export default BentoCard