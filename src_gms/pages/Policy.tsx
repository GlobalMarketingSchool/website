export default function Policy() {
  return (
    <div className="pt-32 pb-24 min-h-screen" style={{ background: "#121212" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Our <span style={{ color: "#FFD700" }}>Policy</span>
        </h1>
        <p className="text-lg text-slate-500 mb-12 pb-8 border-b border-white/10">
          Last updated: March 2026 · Global Marketing School
        </p>

        <div className="space-y-12">
          {[
            {
              num: 1, title: "Terms and Conditions",
              intro: "Welcome to Global Marketing School (GMS). By accessing our website, joining our community, or participating in any of our sessions, workshops, or programs, you agree to be bound by these Terms and Conditions.",
              points: [
                "All community members must maintain a respectful and professional environment. Harassment, spam, or any form of misconduct will result in immediate removal.",
                "You must be at least 18 years of age to register for paid plans. Free community membership is open to all aspiring entrepreneurs.",
                "GMS reserves the right to modify, suspend, or discontinue any service, session, or feature at any time without prior notice.",
                "Unauthorized solicitation, MLM pitches, or promotional content not approved by GMS is strictly prohibited in community channels.",
                "GMS is not responsible for any business decisions made based on information shared in sessions or community discussions.",
              ]
            },
            {
              num: 2, title: "Privacy Policy",
              intro: "We value your privacy. This policy outlines how we collect, use, and protect your personal information.",
              points: [
                "We collect: Name, email address, phone number, and business details provided during registration.",
                "We collect: Payment information processed securely through Razorpay (we do not store card details).",
                "We use your data to send you updates about upcoming sessions, workshops, and community events.",
                "We use your data to process payments and maintain subscription records.",
                "Your data is strictly confidential and will never be sold or shared with third-party marketing agencies.",
              ]
            },
            {
              num: 3, title: "Refund & Cancellation Policy",
              intro: "Please read this section carefully before making any payment.",
              points: [
                "Free membership has no fees and can be left at any time.",
                "Premium and Business Accelerator subscriptions are non-refundable once payment has been processed and access has been granted.",
                "You may cancel your subscription at any time by contacting us at gmssupport@gmail.com. Access continues until the end of the current billing period.",
                "In cases of technical errors or duplicate payments, refund requests will be reviewed on a case-by-case basis within 5–7 business days.",
                "GMS reserves the right to terminate a membership without refund in case of violation of community guidelines.",
              ]
            },
            {
              num: 4, title: "Intellectual Property",
              intro: "All content created and shared by Global Marketing School is the exclusive intellectual property of GMS.",
              points: [
                "Members may use shared materials for their own business improvement only.",
                "Redistribution, resale, or public publishing of any GMS content without explicit written permission is strictly prohibited.",
                "Recording of live sessions by members is not permitted without prior approval.",
                "Violation of intellectual property rights may result in legal action.",
              ]
            },
            {
              num: 5, title: "Community Code of Conduct",
              points: [
                "Treat all community members, mentors, and speakers with respect and courtesy.",
                "Keep discussions relevant to marketing, business, and entrepreneurship.",
                "Do not share misleading information, fake testimonials, or unverified claims.",
                "Politically sensitive, religious, or divisive content is not permitted in community channels.",
                "Members who engage in fraudulent activities or misrepresentation will be permanently banned.",
              ]
            },
            {
              num: 6, title: "Payment Security",
              intro: "All payments are processed through Razorpay, a PCI-DSS compliant payment gateway. GMS does not store any credit/debit card information on our servers.",
              points: [
                "Payments are secured with 256-bit SSL encryption.",
                "Supported payment methods: UPI, Net Banking, Credit/Debit Cards, and Wallets.",
                "For payment-related issues, contact Razorpay support or email us at gmssupport@gmail.com.",
              ]
            },
            {
              num: 7, title: "Disclaimer",
              intro: "Global Marketing School provides educational content and community networking for informational and skill-development purposes only. Results may vary based on individual effort, market conditions, and business circumstances. GMS does not guarantee specific business outcomes or financial results from attending sessions or applying the strategies taught."
            },
          ].map((section) => (
            <section key={section.num}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center shrink-0" style={{ background: "rgba(255,215,0,0.15)", color: "#FFD700" }}>
                  {section.num}
                </span>
                {section.title}
              </h2>
              {section.intro && <p className="text-slate-400 leading-relaxed mb-4">{section.intro}</p>}
              {section.points && (
                <ul className="space-y-3">
                  {section.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#FFD700" }} />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="mt-12 pt-8 border-t border-white/10 rounded-2xl p-8" style={{ background: "#0d1e35", border: "1px solid rgba(255,215,0,0.1)" }}>
            <h3 className="text-xl font-bold text-white mb-3">Contact Us</h3>
            <p className="text-slate-400 mb-4">For any questions, concerns, or policy-related queries, please reach out to us:</p>
            <div className="space-y-2 text-slate-300">
              <p>📧 <a href="mailto:gmssupport@gmail.com" className="hover:underline" style={{ color: "#FFD700" }}>gmssupport@gmail.com</a></p>
              <p>📱 <a href="https://wa.me/918385836308" className="hover:underline" style={{ color: "#FFD700" }} target="_blank" rel="noopener noreferrer">+91 83858 36308 (WhatsApp)</a></p>
              <p>🌐 <a href="https://www.globalmarketingschool.in" className="hover:underline" style={{ color: "#FFD700" }} target="_blank" rel="noopener noreferrer">www.globalmarketingschool.in</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
