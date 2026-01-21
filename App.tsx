import React, { useState, useEffect, useCallback } from 'react';
import { 
  ArrowRight, 
  MoveRight, 
  Check, 
  ArrowLeft, 
  Shield, 
  Users, 
  X, 
  ChevronRight,
  Loader2
} from 'lucide-react';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import Section from './components/Section';
import { SERVICES, STATS } from './constants';

type ViewState = 'home' | 'expertise';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    institution: string;
    contact_email: string;
    message: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  status: 'IDLE' | 'SENDING' | 'SENT' | 'ERROR';
}

const PartnershipModal = React.memo(({ isOpen, onClose, formData, onChange, onSubmit, status }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-3xl bg-white text-bayl-black p-10 md:p-14 animate-in zoom-in-95 duration-300 shadow-2xl max-h-[90vh] overflow-y-auto rounded-sm">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 transition-colors rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="mb-12">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-4 block">Strategic Partnership</span>
          <h3 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Join the Future <br/> of <span className="italic text-gray-400">Education</span>.</h3>
          <p className="text-slate-500 max-w-md text-sm leading-relaxed">Our consultants will reach out to discuss how Bayl can integrate with your institutional vision.</p>
        </div>

        <form className="space-y-10" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
            <div className="flex flex-col group">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-black transition-colors">Full Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                value={formData.name} 
                onChange={onChange} 
                className="w-full bg-transparent border-b border-slate-200 py-2 text-lg focus:outline-none focus:border-black transition-colors" 
              />
            </div>
            <div className="flex flex-col group">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-black transition-colors">Institution / Company</label>
              <input 
                type="text" 
                name="institution" 
                required 
                value={formData.institution} 
                onChange={onChange} 
                className="w-full bg-transparent border-b border-slate-200 py-2 text-lg focus:outline-none focus:border-black transition-colors" 
              />
            </div>
          </div>
          <div className="flex flex-col group">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-black transition-colors">Work Email</label>
            <input 
              type="email" 
              name="contact_email" 
              required 
              value={formData.contact_email} 
              onChange={onChange} 
              className="w-full bg-transparent border-b border-slate-200 py-2 text-lg focus:outline-none focus:border-black transition-colors" 
            />
          </div>
          <div className="flex flex-col group">
            <div className="flex justify-between items-end mb-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-black transition-colors">Partnership Objectives</label>
              <span className="text-[9px] text-slate-300 font-mono tracking-wider italic">UP TO 2000 WORDS</span>
            </div>
            <textarea 
              name="message" 
              required 
              rows={8} 
              value={formData.message} 
              onChange={onChange} 
              placeholder="Describe your institutional goals..."
              className="w-full bg-slate-50 border border-slate-100 p-5 text-base focus:outline-none focus:border-black focus:bg-white transition-all resize-y min-h-[240px] leading-relaxed rounded-sm"
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status === 'SENDING' || status === 'SENT'} 
            className={`w-full py-6 font-bold uppercase tracking-[0.25em] text-[11px] transition-all duration-300 mt-4 flex items-center justify-center gap-3 relative overflow-hidden ${status === 'SENT' ? 'bg-black text-white cursor-default' : status === 'ERROR' ? 'bg-red-500 text-white' : 'bg-black text-white hover:bg-zinc-800 hover:scale-[1.01] shadow-2xl'} ${status === 'SENDING' ? 'cursor-wait' : ''}`}
          >
            <span className="flex items-center gap-2">
              {status === 'IDLE' && <>Initiate Partnership &rarr;</>}
              {status === 'SENDING' && <>Sending...</>}
              {status === 'SENT' && <><Check className="w-4 h-4" /> SENT</>}
              {status === 'ERROR' && <>Error - Try Again</>}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
});

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    contact_email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SENT' | 'ERROR'>('IDLE');

  const FORMSPREE_ID = 'mvzzoqwd';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'SENDING' || status === 'SENT') return;
    setStatus('SENDING');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('SENT');
        setFormData({ name: '', institution: '', contact_email: '', message: '' });
        
        setTimeout(() => {
          setStatus('IDLE');
        }, 4000);
      } else {
        setStatus('ERROR');
        setTimeout(() => setStatus('IDLE'), 4000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 4000);
    }
  };

  if (view === 'expertise') {
    return (
      <div className="min-h-screen bg-bayl-black text-white selection:bg-white selection:text-black relative">
        <header className="fixed top-0 w-full z-50 bg-bayl-black/80 backdrop-blur-md border-b border-gray-800 py-6 px-6 md:px-12 lg:px-24 flex justify-between items-center">
          <button onClick={() => setView('home')} className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-gray-400 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <button onClick={() => setView('home')}><Logo variant="light" /></button>
          <div className="w-24 hidden md:block"></div>
        </header>

        <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-6 block">Our Core Pillars</span>
              <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8">
                Technical <br/> <span className="italic text-gray-500">Mastery</span>.
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl">
                We bridge the gap between educational vision and technical feasibility. Our expertise is rooted in decades of institutional transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 mb-32">
              <div className="space-y-6">
                <div className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-full mb-8">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-serif">Institutional Architecture</h3>
                <p className="text-gray-400 leading-relaxed">
                  We don't just recommend software; we architect ecosystems. Our consultants audit your existing infrastructure to identify bottlenecks and security vulnerabilities.
                </p>
                <ul className="space-y-3 pt-4">
                  {['Cloud Infrastructure Audits', 'Data Governance Frameworks', 'Security Protocol Design'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-xs uppercase tracking-widest text-gray-500">
                      <div className="w-1 h-1 bg-white"></div> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-full mb-8">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-serif">Pedagogical Innovation</h3>
                <p className="text-gray-400 leading-relaxed">
                  Technology serves the learner, not the other way around. We partner with faculty to translate curriculum into high-engagement digital experiences.
                </p>
                <ul className="space-y-3 pt-4">
                  {['Adaptive Learning Paths', 'Faculty Training & Enablement', 'Gamified Course Design'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-xs uppercase tracking-widest text-gray-500">
                      <div className="w-1 h-1 bg-white"></div> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-24 mb-32">
              <h2 className="text-4xl md:text-5xl font-serif mb-16">The Bayl Methodology</h2>
              <div className="space-y-1">
                {[
                  { step: '01', title: 'Audit & Diagnose', desc: 'A deep-dive analysis of your current technical and academic health.' },
                  { step: '02', title: 'Strategic Blueprint', desc: 'Drafting a multi-year roadmap aligned with institutional KPIs.' },
                  { step: '03', title: 'Agile Implementation', desc: 'Phased deployment with constant feedback loops and user training.' },
                  { step: '04', title: 'Continuous Evolution', desc: 'Quarterly reviews to adapt to emerging EdTech trends and AI shifts.' }
                ].map((item, idx) => (
                  <div key={idx} className="group border-b border-gray-800 py-12 flex flex-col md:flex-row gap-8 items-start hover:bg-white/5 px-4 transition-colors">
                    <span className="text-4xl font-serif italic text-gray-700 group-hover:text-white transition-colors">{item.step}</span>
                    <div className="md:w-1/3">
                      <h4 className="text-2xl font-serif">{item.title}</h4>
                    </div>
                    <div className="md:w-1/2">
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        <PartnershipModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          formData={formData} 
          onChange={handleChange} 
          onSubmit={handleSubmit} 
          status={status}
        />
        
        <footer className="py-12 border-t border-gray-800 text-center">
           <p className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">Bayl Consults expertise deep-dive • {new Date().getFullYear()}</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 animate-in fade-in duration-500">
      <Navbar onExpertiseClick={() => setView('expertise')} />

      {/* Hero Section */}
      <div className="relative h-screen min-h-[700px] flex items-center justify-center bg-bayl-black overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-900 to-transparent opacity-40"></div>
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Office meeting" 
            className="w-full h-full object-cover opacity-20 grayscale"
           />
           <div className="absolute inset-0 bg-bayl-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left w-full mt-16">
          <div className="inline-block px-4 py-1 mb-6 border border-gray-600 rounded-full">
            <span className="text-gray-300 text-xs tracking-[0.2em] uppercase">EdTech Consultancy</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-8">
            Shaping the <br/>
            <span className="italic text-gray-400">Future</span> of Learning.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
            We partner with visionary institutions to navigate digital transformation, 
            optimize curriculum delivery, and implement sustainable educational technologies.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => setView('expertise')} 
              className="group px-10 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-gray-100 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              OUR EXPERTISE
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 border border-white text-white font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-black hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
            >
              PARTNER WITH US
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-bayl-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-serif text-white mb-2">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <Section id="services" dark className="bg-bayl-black">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-800 pb-8">
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">CAPABILITIES</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">
              Core <br/> Consulting.
            </h3>
          </div>
          <div className="hidden md:block">
            <p className="text-gray-400 max-sm text-right italic font-serif">
              Elevating educational standards through technical excellence and operational insight.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pb-12">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="group border-t border-gray-800 pt-8 hover:border-white transition-colors duration-300">
              <service.icon className="w-10 h-10 text-white mb-6 stroke-[1.5]" />
              <h4 className="text-xl font-serif text-white mb-3">{service.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div className="pt-4">
             <h3 className="text-5xl md:text-6xl font-serif text-bayl-black mb-8 leading-tight">
               Ready to <br/> <span className="italic text-gray-400">Innovate</span>?
             </h3>
             <p className="text-slate-600 text-lg mb-12 max-w-md">
               Let's discuss how Bayl Consults can help your institution thrive in the digital age. Our experts are ready to listen.
             </p>
             <div className="space-y-10">
               <div className="flex flex-col">
                 <span className="text-[11px] uppercase text-gray-400 tracking-[0.2em] mb-2 font-bold">Email</span>
                 <a href="mailto:inquiries@baylconsults.com" className="text-2xl text-bayl-black hover:text-gray-600 font-serif transition-colors">inquiries@baylconsults.com</a>
               </div>
               <div className="flex flex-col">
                 <span className="text-[11px] uppercase text-gray-400 tracking-[0.2em] mb-2 font-bold">Location</span>
                 <p className="text-xl text-bayl-black font-serif leading-relaxed">
                   338a Regents Park Road,<br/>
                   Acc Office 3-4, Suite 0462, London,<br/>
                   United Kingdom, N3 2LN
                 </p>
               </div>
             </div>
          </div>

          <form className="space-y-10 bg-white" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="flex flex-col group">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-black transition-colors">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  autoComplete="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full bg-transparent border-b border-slate-200 py-2 text-lg focus:outline-none focus:border-black transition-colors" 
                />
              </div>
              <div className="flex flex-col group">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-black transition-colors">Institution</label>
                <input 
                  type="text" 
                  name="institution" 
                  required 
                  value={formData.institution} 
                  onChange={handleChange} 
                  className="w-full bg-transparent border-b border-slate-200 py-2 text-lg focus:outline-none focus:border-black transition-colors" 
                />
              </div>
            </div>
            <div className="flex flex-col group">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-black transition-colors">Email Address</label>
              <input 
                type="email" 
                name="contact_email" 
                required 
                autoComplete="email" 
                value={formData.contact_email} 
                onChange={handleChange} 
                className="w-full bg-transparent border-b border-slate-200 py-2 text-lg focus:outline-none focus:border-black transition-colors" 
              />
            </div>
            <div className="flex flex-col group">
              <div className="flex justify-between items-end mb-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-black transition-colors">Briefly tell us what you need</label>
                <span className="text-[9px] text-slate-300 italic tracking-wider uppercase font-mono">2000 Words Accepted</span>
              </div>
              <textarea 
                name="message" 
                required 
                rows={6} 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Briefly outline your current objectives..."
                className="w-full bg-slate-50 border border-slate-100 p-5 text-base focus:outline-none focus:border-black focus:bg-white transition-all resize-y min-h-[180px] leading-relaxed rounded-sm"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status === 'SENDING' || status === 'SENT'} 
              className={`w-full py-6 font-bold uppercase tracking-[0.25em] text-[11px] transition-all duration-300 mt-4 flex items-center justify-center gap-3 relative overflow-hidden ${status === 'SENT' ? 'bg-black text-white cursor-default' : status === 'ERROR' ? 'bg-red-500 text-white' : 'bg-black text-white hover:bg-zinc-800 hover:scale-[1.01] shadow-2xl'} ${status === 'SENDING' ? 'cursor-wait' : ''}`}
            >
              <span className="flex items-center gap-2">
                {status === 'IDLE' && <>Send Inquiry &rarr;</>}
                {status === 'SENDING' && <>Sending...</>}
                {status === 'SENT' && <><Check className="w-4 h-4" /> SENT</>}
                {status === 'ERROR' && <>Error - Try Again</>}
              </span>
            </button>
          </form>
        </div>
      </Section>

      <PartnershipModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        formData={formData} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        status={status}
      />

      <footer className="bg-bayl-black py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <button onClick={() => window.scrollTo(0,0)}><Logo variant="light" /></button>
          <div className="flex gap-8 text-gray-500 text-xs tracking-widest uppercase font-bold">
            <a 
              href="https://www.linkedin.com/company/bayl-consults/about/?viewAsMember=true" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
          <p className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">© {new Date().getFullYear()} Bayl Consults.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;