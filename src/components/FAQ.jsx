
import React, { useState } from "react";
import LottieFAQ from '../assets/lottie/FAQ.json';
import Lottie from "lottie-react";

const FAQ = () => {
    // Set the first question (index 0) as active by default
    const [activeIndex, setActiveIndex] = useState(0);

    const faqs = [
        {
            question: "What is QueryHive?",
            answer:
                "QueryHive is a platform that allows users to ask questions, receive recommendations, and share feedback on various topics.",
        },
        {
            question: "How do I create a new query?",
            answer:
                "To create a new query, go to the 'Add Queries' page, fill in the required details, and submit your query.",
        },
        {
            question: "Can I recommend products or services?",
            answer:
                "Yes, you can recommend products or services by responding to queries or sharing your suggestions in the recommendation section.",
        },
        {
            question: "Is my personal information secure on QueryHive?",
            answer:
                "Absolutely. We prioritize user privacy and ensure that your data is protected with industry-standard security measures.",
        },
        {
            question: "How can I track the queries I posted?",
            answer:
                "You can track your posted queries under the 'My Queries' section available in your account dashboard.",
        },
        {
            question: "Are there any guidelines for posting queries or recommendations?",
            answer:
                "Yes, we encourage respectful and constructive contributions. Please avoid spam, offensive content, or irrelevant posts.",
        },
    ];

    const toggleFAQ = (index) => {
        // Toggle the active state; if clicked, close; otherwise open
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto my-10 px-2 xl:px-0">
            {/* Section Header */}
            <div className="text-center mb-12 px-5">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                    <span className="text-teal-500">Frequently</span> <span className="text-indigo-500">Asked Questions</span>
                </h2>
                <p className="text-lg">
                    Find answers to common questions about QueryHive. For additional help, feel free to contact us.
                </p>
            </div>

            {/* FAQ Items */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
                <div className="col-span-1">  
                    <Lottie className="h-[350px] md:h-[400px] lg:h-[600px]" animationData={LottieFAQ} />
                </div>
                <div className="col-span-2 space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border overflow-hidden transition-shadow duration-300 ${activeIndex === index ? "shadow-lg bg-gradient-to-r from-indigo-500 to-teal-500 p-[1px]" : "border-gray-300"
                                }`}
                        >
                            <div
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center bg-gray-100 p-5 cursor-pointer"
                            >
                                <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                                <span
                                    className={`text-2xl font-bold text-indigo-500 transform transition-transform ${activeIndex === index ? "rotate-180" : "rotate-0"
                                        }`}
                                >
                                    {activeIndex === index ? "−" : "+"}
                                </span>
                            </div>
                            {activeIndex === index && (
                                <div className="bg-white px-5 py-4 text-gray-700">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
