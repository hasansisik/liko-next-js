"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from 'lucide-react';

type Country = {
  name: string;
  code: string;
  flag: string;
  phone: string;
};

const countries: Country[] = [
  { name: "Turkey", code: "TR", flag: "🇹🇷", phone: "+90" },
  { name: "United States", code: "US", flag: "🇺🇸", phone: "+1" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", phone: "+44" },
  { name: "Germany", code: "DE", flag: "🇩🇪", phone: "+49" },
  { name: "France", code: "FR", flag: "🇫🇷", phone: "+33" },
  { name: "Italy", code: "IT", flag: "🇮🇹", phone: "+39" },
  { name: "Spain", code: "ES", flag: "🇪🇸", phone: "+34" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", phone: "+31" },
  { name: "Belgium", code: "BE", flag: "🇧🇪", phone: "+32" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭", phone: "+41" },
  { name: "Austria", code: "AT", flag: "🇦🇹", phone: "+43" },
  { name: "Sweden", code: "SE", flag: "🇸🇪", phone: "+46" },
  { name: "Norway", code: "NO", flag: "🇳🇴", phone: "+47" },
  { name: "Denmark", code: "DK", flag: "🇩🇰", phone: "+45" },
  { name: "Finland", code: "FI", flag: "🇫🇮", phone: "+358" },
  { name: "Poland", code: "PL", flag: "🇵🇱", phone: "+48" },
  { name: "Czech Republic", code: "CZ", flag: "🇨🇿", phone: "+420" },
  { name: "Hungary", code: "HU", flag: "🇭🇺", phone: "+36" },
  { name: "Romania", code: "RO", flag: "🇷🇴", phone: "+40" },
  { name: "Bulgaria", code: "BG", flag: "🇧🇬", phone: "+359" },
  { name: "Greece", code: "GR", flag: "🇬🇷", phone: "+30" },
  { name: "Portugal", code: "PT", flag: "🇵🇹", phone: "+351" },
  { name: "Ireland", code: "IE", flag: "🇮🇪", phone: "+353" },
  { name: "Luxembourg", code: "LU", flag: "🇱🇺", phone: "+352" },
  { name: "Cyprus", code: "CY", flag: "🇨🇾", phone: "+357" },
  { name: "Malta", code: "MT", flag: "🇲🇹", phone: "+356" },
  { name: "Canada", code: "CA", flag: "🇨🇦", phone: "+1" },
  { name: "Australia", code: "AU", flag: "🇦🇺", phone: "+61" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿", phone: "+64" },
  { name: "Japan", code: "JP", flag: "🇯🇵", phone: "+81" },
  { name: "South Korea", code: "KR", flag: "🇰🇷", phone: "+82" },
  { name: "China", code: "CN", flag: "🇨🇳", phone: "+86" },
  { name: "India", code: "IN", flag: "🇮🇳", phone: "+91" },
  { name: "Singapore", code: "SG", flag: "🇸🇬", phone: "+65" },
  { name: "Malaysia", code: "MY", flag: "🇲🇾", phone: "+60" },
  { name: "Thailand", code: "TH", flag: "🇹🇭", phone: "+66" },
  { name: "Philippines", code: "PH", flag: "🇵🇭", phone: "+63" },
  { name: "Indonesia", code: "ID", flag: "🇮🇩", phone: "+62" },
  { name: "Vietnam", code: "VN", flag: "🇻🇳", phone: "+84" },
  { name: "UAE", code: "AE", flag: "🇦🇪", phone: "+971" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", phone: "+966" },
  { name: "Qatar", code: "QA", flag: "🇶🇦", phone: "+974" },
  { name: "Kuwait", code: "KW", flag: "🇰🇼", phone: "+965" },
  { name: "Bahrain", code: "BH", flag: "🇧🇭", phone: "+973" },
  { name: "Oman", code: "OM", flag: "🇴🇲", phone: "+968" },
  { name: "Jordan", code: "JO", flag: "🇯🇴", phone: "+962" },
  { name: "Lebanon", code: "LB", flag: "🇱🇧", phone: "+961" },
  { name: "Israel", code: "IL", flag: "🇮🇱", phone: "+972" },
  { name: "Egypt", code: "EG", flag: "🇪🇬", phone: "+20" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", phone: "+27" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", phone: "+234" },
  { name: "Kenya", code: "KE", flag: "🇰🇪", phone: "+254" },
  { name: "Morocco", code: "MA", flag: "🇲🇦", phone: "+212" },
  { name: "Tunisia", code: "TN", flag: "🇹🇳", phone: "+216" },
  { name: "Algeria", code: "DZ", flag: "🇩🇿", phone: "+213" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", phone: "+55" },
  { name: "Argentina", code: "AR", flag: "🇦🇷", phone: "+54" },
  { name: "Chile", code: "CL", flag: "🇨🇱", phone: "+56" },
  { name: "Colombia", code: "CO", flag: "🇨🇴", phone: "+57" },
  { name: "Peru", code: "PE", flag: "🇵🇪", phone: "+51" },
  { name: "Mexico", code: "MX", flag: "🇲🇽", phone: "+52" },
  { name: "Venezuela", code: "VE", flag: "🇻🇪", phone: "+58" },
  { name: "Ecuador", code: "EC", flag: "🇪🇨", phone: "+593" },
  { name: "Uruguay", code: "UY", flag: "🇺🇾", phone: "+598" },
  { name: "Paraguay", code: "PY", flag: "🇵🇾", phone: "+595" },
  { name: "Bolivia", code: "BO", flag: "🇧🇴", phone: "+591" },
  { name: "Russia", code: "RU", flag: "🇷🇺", phone: "+7" },
  { name: "Ukraine", code: "UA", flag: "🇺🇦", phone: "+380" },
  { name: "Belarus", code: "BY", flag: "🇧🇾", phone: "+375" },
  { name: "Kazakhstan", code: "KZ", flag: "🇰🇿", phone: "+7" },
  { name: "Uzbekistan", code: "UZ", flag: "🇺🇿", phone: "+998" },
  { name: "Azerbaijan", code: "AZ", flag: "🇦🇿", phone: "+994" },
  { name: "Armenia", code: "AM", flag: "🇦🇲", phone: "+374" },
  { name: "Georgia", code: "GE", flag: "🇬🇪", phone: "+995" },
];

type ContactFormDentalProps = {
  className?: string;
  style?: React.CSSProperties;
  showWhatsApp?: boolean;
  title?: string;
  subtitle?: string;
  responseTime?: string;
};

const ContactFormDental = ({ 
  className = "",
  style = {},
  showWhatsApp = true,
  title = "Let's Talk Teeth!",
  subtitle = "Online now",
  responseTime = "avg. response time: 3 minutes"
}: ContactFormDentalProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // Default to Turkey
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.phone.includes(searchTerm)
  );

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  return (
    <div className={`tp-dental-form-box ${className}`} style={{
      background: 'white',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '500px',
      ...style
    }}>
      <div className="tp-dental-form-header" style={{ marginBottom: '20px' }}>
        <h3 className="tp-dental-form-title" style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: '#333',
          textAlign: 'center'
        }}>{title}</h3>
        <div className="tp-dental-form-status" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '5px'
        }}>
          <span className="tp-dental-status-dot" style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
            marginRight: '8px'
          }}></span>
          <span className="tp-dental-status-text" style={{
            color: '#4CAF50',
            fontSize: '14px',
            fontWeight: '500'
          }}>{subtitle}</span>
        </div>
        <p className="tp-dental-form-response" style={{
          fontSize: '12px',
          color: '#666',
          margin: '0',
          textAlign: 'center'
        }}>{responseTime}</p>
      </div>
      
      <form className="tp-dental-form">
        <div className="tp-dental-form-input" style={{ marginBottom: '15px' }}>
          <input 
            type="text" 
            placeholder="Name*" 
            required 
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        
        <div className="tp-dental-form-phone" style={{
          display: 'flex',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <div 
            className="tp-dental-phone-prefix" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              border: '1px solid #ddd',
              borderRight: 'none',
              borderRadius: '5px 0 0 5px',
              backgroundColor: '#f8f9fa',
              minWidth: '100px',
              height: '56px', // Fixed height to match input
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <span className="tp-dental-flag" style={{ marginRight: '5px' }}>{selectedCountry.flag}</span>
            <span style={{ fontSize: '14px', marginRight: '5px' }}>{selectedCountry.phone}</span>
            <ChevronDown size={14} style={{ 
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} />
          </div>
          
          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000,
              maxHeight: '300px',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '10px' }}>
                <input
                  type="text"
                  placeholder="Search country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '3px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ 
                maxHeight: '250px', 
                overflowY: 'auto',
                scrollbarWidth: 'thin'
              }}>
                {filteredCountries.map((country) => (
                  <div
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 15px',
                      cursor: 'pointer',
                      backgroundColor: selectedCountry.code === country.code ? '#f0f0f0' : 'transparent',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLDivElement).style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => (e.target as HTMLDivElement).style.backgroundColor = selectedCountry.code === country.code ? '#f0f0f0' : 'transparent'}
                  >
                    <span style={{ marginRight: '10px' }}>{country.flag}</span>
                    <span style={{ flex: 1, fontSize: '14px' }}>{country.name}</span>
                    <span style={{ fontSize: '14px', color: '#666' }}>{country.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <input 
            type="tel" 
            placeholder="Phone Number*" 
            required 
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '0 5px 5px 0',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        
        <button type="submit" className="tp-dental-form-btn" style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#000',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: showWhatsApp ? '15px' : '0',
          transition: 'background-color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#333'}
        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#000'}
        >
          Send <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </button>
      
        {showWhatsApp && (
          <Link href="#" className="tp-dental-whatsapp-btn" style={{
            display: 'block',
            width: '100%',
            padding: '12px',
            backgroundColor: '#25D366',
            color: 'white',
            textAlign: 'center',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#1da851'}
          onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#25D366'}
          >
            Chat on WhatsApp
          </Link>
        )}
      </form>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default ContactFormDental; 