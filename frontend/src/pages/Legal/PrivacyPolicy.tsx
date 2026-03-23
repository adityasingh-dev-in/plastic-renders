import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-24 px-[5vw]">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back
          </button>
          <div className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4">
            Legal Information
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 mb-8 tracking-tight">
            Privacy <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">Policy</span>
          </h1>
          
          <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
            <p className="text-sm font-semibold text-gray-400">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">1. Introduction</h2>
            <p>
              Welcome to Plastic Renders. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. The Data We Collect About You</h2>
            <p>
              Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact Data:</strong> Includes email address, telephone numbers, and communication history if you reach out to us.</li>
              <li><strong>Usage Data:</strong> Includes information about how you use our website and services.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Personal Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., providing a quote for our 3D or video services).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us via the contact form on our website or directly at our provided social media channels.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
