import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
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
            Terms of <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">Service</span>
          </h1>
          
          <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
            <p className="text-sm font-semibold text-gray-400">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website and using our services at Plastic Renders, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service. These Terms of Service apply to all visitors, users, and others who access or use the Service.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise stated, Plastic Renders and/or its licensors own the intellectual property rights for all material on Plastic Renders. All intellectual property rights are reserved. You may access this from Plastic Renders for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Republish material (including 3D models, video content, images) from Plastic Renders without consent.</li>
              <li>Sell, rent or sub-license material from Plastic Renders.</li>
              <li>Reproduce, duplicate or copy material from Plastic Renders.</li>
              <li>Redistribute content from Plastic Renders.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Client Projects & Deliverables</h2>
            <p>
              When engaging us for services (such as 3D modelling, formatting, or video editing), the specific terms regarding deliverables, timelines, revisions, and ownership of the final products will be detailed in a separate Statement of Work (SOW) or project contract. These Terms of Service govern the general use of our platform.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Limitation of Liability</h2>
            <p>
              In no event shall Plastic Renders, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Revisions and Errata</h2>
            <p>
              The materials appearing on Plastic Renders's website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us using our contact form or our linked social channels.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
