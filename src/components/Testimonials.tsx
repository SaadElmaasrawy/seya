export function Testimonials() {
  const testimonials = [
    {
      quote: '"SEYA cut my content creation time in half! The article writer is a game-changer for my blog."',
      author: "Sarah J.",
      role: "Content Marketer",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfYgEWJ733jh6L7uN_Fuj53HBuHOlwAZpipPzKaaViMqJdOEeVqkzX6sQtVqeY5qXUuWyO2MVjDhSYURqqnNpORz2ukrZurIrX-qmignFH0K7YVzewO9nezhNlPDonX-TgGNtXfcydf9oh3A-cKdFtnun2DhtO3BpH-cV1shB69ob7Tw_rgVSA6mhsdyERvxhbFby6ZWp1XXInJDaSpDuc9r-jb7A79o9GMdUP_5y_TANQ3xYvQXoKZ-NZaivINVVB7GdluSUQW50",
    },
    {
      quote: '"As a YouTuber, I struggled with scripts. SEYA\'s Script Pro gives me fantastic ideas and structures to work with."',
      author: "Mike R.",
      role: "YouTuber",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmXVDKjW5JMD39ZlsbdeUO3iZflXm5scMnuU9LJrEaC3Qqq_qRseTfYv_81YbAc5OLlKn1A9bExlR3Qt9vndqL3iOWfBw72nY9uIUxsZY5XfKEBm6ZVOnyACx4MxGJVt65AAlcJ_D8D_HkWm6mm6T55-qPZqq-OWYAuPxyokkOGsPova7dykE-FhrGzNtSikhWPBiQDGa3bUk9Sy9F2SMG8O8a7aFSjBRuTBhQPkYVkhfBTxeSIbCCBFhiSswKn5lk39fcYqyeaqg",
    },
    {
      quote: '"Managing social media for multiple clients is tough. The Social Media Genius tool is my secret weapon."',
      author: "Chloe L.",
      role: "Social Media Manager",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFYW1iOaoFibaQsApEddcN_mO5stvWOlfYdCpmF_Uo0YoJB6IA0P6BmBE9FPONF_Ww5JEXb5aW4BdPOe_k1abklddl8FUIamf7ye3NJJ8o__swMVyDjW0evnS04xVgdAgHBYtxRd1WRsSzTLiAFOSSIQtamjex1YGRUfgKEWu66MztcmUx40l8ij8A3S2F3C_zFhbkmkDwH74ZmVyaz9ggXT_R72nXjL3RFQ4Hc0aTu27Y52Ar7nkffJ8fufVDoxbBOhlEO_Z4-ZE",
    },
  ];

  return (
    <section className="flex flex-col gap-10 px-4 py-10 relative z-10">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-white tracking-light text-3xl font-bold leading-tight md:text-4xl md:font-black md:leading-tight md:tracking-[-0.033em]">
          What Our Users Say
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex flex-col gap-4 rounded-xl border border-[#2a2a32] bg-[#1E1E24]/50 backdrop-blur-sm p-6">
            <p className="text-[#a0a0b0] italic">{testimonial.quote}</p>
            <div className="flex items-center gap-4 mt-2">
              <img
                alt={`Avatar of ${testimonial.author}`}
                className="w-12 h-12 rounded-full object-cover"
                src={testimonial.image}
              />
              <div>
                <p className="font-bold text-white">{testimonial.author}</p>
                <p className="text-sm text-[#a0a0b0]">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
