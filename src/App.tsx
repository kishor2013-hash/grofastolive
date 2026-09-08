import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Industries } from './components/Industries';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FreeDemoSection } from './components/FreeDemoSection';
import { ContactSection } from './components/ContactSection';
import { ContactPage } from './components/ContactPage';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LegalModal } from './components/LegalModals';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [initialPurpose, setInitialPurpose] = useState<string>('');
  
  // Legal modal state
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms'>('privacy');

  // Detect current route from browser URL
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const purp = params.get('purpose') || '';
      
      setCurrentPath(path + search);
      setInitialPurpose(purp);
    };

    // Initial check
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (to: string) => {
    try {
      window.history.pushState({}, '', to);
    } catch {
      // Fallback for sandboxed frames
    }

    const [pathPart, searchPart] = to.split('?');
    const params = new URLSearchParams(searchPart || '');
    const purp = params.get('purpose') || '';
    
    setCurrentPath(to);
    setInitialPurpose(purp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isContactPage = currentPath.startsWith('/contact') || currentPath.includes('contact.php');
  const isAdminPage = currentPath.startsWith('/admin') || currentPath.includes('admin');

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Top Header (Shown on public pages) */}
      {!isAdminPage && (
        <Header currentPath={currentPath} onNavigate={navigateTo} />
      )}

      {/* Main View Router */}
      <main className="flex-grow">
        {isAdminPage ? (
          <AdminPanel onNavigate={navigateTo} />
        ) : isContactPage ? (
          <ContactPage onNavigate={navigateTo} initialPurpose={initialPurpose} />
        ) : (
          <>
            <Hero onNavigate={navigateTo} />
            <Industries onNavigate={navigateTo} />
            <Services onNavigate={navigateTo} />
            <HowItWorks onNavigate={navigateTo} />
            <WhyChooseUs />
            <FreeDemoSection onNavigate={navigateTo} />
            <ContactSection onNavigate={navigateTo} />
          </>
        )}
      </main>

      {/* Footer (Shown on public pages) */}
      {!isAdminPage && (
        <Footer 
          onNavigate={navigateTo}
          onOpenPrivacy={() => {
            setLegalModalType('privacy');
            setLegalModalOpen(true);
          }}
          onOpenTerms={() => {
            setLegalModalType('terms');
            setLegalModalOpen(true);
          }}
        />
      )}

      {/* Floating WhatsApp on All Pages */}
      <FloatingWhatsApp />

      {/* Mobile Sticky CTA Bar on Public Pages */}
      {!isAdminPage && <MobileStickyBar onNavigate={navigateTo} />}

      {/* Privacy Policy & Terms Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        type={legalModalType}
        onClose={() => setLegalModalOpen(false)}
      />

    </div>
  );
}
