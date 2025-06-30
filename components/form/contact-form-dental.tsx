"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from 'lucide-react';
import { IContactFormData, ICountry } from "@/types/contact-form-d-t";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getForm } from "@/redux/actions/formActions";
import { FormData } from "@/redux/actions/formActions";

type ContactFormDentalProps = {
  className?: string; 
  style?: React.CSSProperties;
  formData?: IContactFormData;
};

const ContactFormDental = ({ 
  className = "",
  style = {},
  formData: staticFormData
}: ContactFormDentalProps) => {
  // Redux
  const dispatch = useAppDispatch();
  const { form, loading } = useAppSelector((state) => state.form);
  
  // Use Redux data if available, otherwise fallback to static data or default
  const formData = form || staticFormData || {
    title: "Get Free Consultation",
    subtitle: "Expert available",
    responseTime: "Response within 24 hours",
    showWhatsApp: true,
    placeholders: {
      name: "Your Name",
      phone: "Phone Number",
      countrySearch: "Search country..."
    },
    countries: [
      { code: "US", name: "United States", phone: "+1", flag: "🇺🇸" },
      { code: "TR", name: "Turkey", phone: "+90", flag: "🇹🇷" },
      { code: "GB", name: "United Kingdom", phone: "+44", flag: "🇬🇧" },
      { code: "DE", name: "Germany", phone: "+49", flag: "🇩🇪" },
      { code: "FR", name: "France", phone: "+33", flag: "🇫🇷" }
    ],
    defaultCountry: "US",
    submitButtonText: "Get Free Consultation",
    whatsAppText: "Chat on WhatsApp",
    whatsAppLink: "https://wa.me/1234567890"
  };
  
  const defaultCountry = formData.countries.find(country => country.code === formData.defaultCountry) || formData.countries[0];
  const [selectedCountry, setSelectedCountry] = useState<ICountry>(defaultCountry);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch form data from API
    dispatch(getForm());
  }, [dispatch]);

  // Update selected country when form data changes
  useEffect(() => {
    if (formData) {
      const newDefaultCountry = formData.countries.find(country => country.code === formData.defaultCountry) || formData.countries[0];
      setSelectedCountry(newDefaultCountry);
    }
  }, [formData]);

  const filteredCountries = formData.countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.phone.includes(searchTerm)
  );

  const handleCountrySelect = (country: ICountry) => {
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
        }}>{formData.title}</h3>
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
          }}>{formData.subtitle}</span>
        </div>
        <p className="tp-dental-form-response" style={{
          fontSize: '12px',
          color: '#666',
          margin: '0',
          textAlign: 'center'
        }}>{formData.responseTime}</p>
      </div>
      
      <form className="tp-dental-form">
        <div className="tp-dental-form-input" style={{ marginBottom: '15px' }}>
          <input 
            type="text" 
            placeholder={formData.placeholders.name} 
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
                  placeholder={formData.placeholders.countrySearch}
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
            placeholder={formData.placeholders.phone} 
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
          marginBottom: formData.showWhatsApp ? '15px' : '0',
          transition: 'background-color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#333'}
        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#000'}
        >
          {formData.submitButtonText} <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </button>
      
        {formData.showWhatsApp && (
          <Link href={formData.whatsAppLink} className="tp-dental-whatsapp-btn" style={{
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
            {formData.whatsAppText}
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