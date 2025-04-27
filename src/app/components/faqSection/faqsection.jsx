import { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is the purpose of this website?",
            answer: "This website aims to provide a comprehensive platform for users to find information and support related to our services."
        },
        {
            question: "How can I contact support?",
            answer: "You can contact support through the 'Contact Us' page or by emailing support@example.com."
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept all major credit cards, PayPal, and bank transfers."
        }
    ];

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h1>
            {faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                    <div 
                        className="flex justify-between items-center p-4 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                        onClick={() => toggleAnswer(index)}
                    >
                        <h3 className="text-lg font-semibold">{faq.question}</h3>
                        <span className="text-xl">{activeIndex === index ? '−' : '+'}</span>
                    </div>
                    {activeIndex === index && (
                        <div className="p-4 mt-2 bg-gray-100 rounded">
                            <p>{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQ;
