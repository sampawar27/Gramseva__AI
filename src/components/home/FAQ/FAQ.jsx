import { useState } from "react";
import "./FAQ.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "How do I apply for a Birth Certificate?",
    answer:
      "Go to Certificate Services, select Birth Certificate, upload the required documents, and submit your application.",
  },
  {
    question: "How can I register a complaint?",
    answer:
      "Navigate to Complaint Management, select the department, describe your issue, and submit it online.",
  },
  {
    question: "Can I pay Gram Panchayat tax online?",
    answer:
      "Yes. Property tax, water tax, and other payments can be made securely through the portal.",
  },
  {
    question: "How does the AI Assistant help me?",
    answer:
      "The AI Assistant answers questions about certificates, schemes, taxes, complaints, and village services instantly.",
  },
  {
    question: "Which government schemes am I eligible for?",
    answer:
      "The portal will recommend schemes based on your profile and eligibility information.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to the most common questions.</p>
      </div>

      <div className="faq-container">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{item.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;